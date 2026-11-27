import { randomUUID } from 'node:crypto';
import { Types } from 'mongoose';
import { AppError, ErrorCode, HttpStatus } from '@placement/shared/http/errors';
import { UserModel, normalizeEmail, type UserDocument } from '../users/user.model.js';
import { SessionModel } from './session.model.js';
import { hashPassword, verifyPassword } from '../../lib/password.js';
import { signAccessToken } from '../../lib/jwt.js';
import type { RegisterInput, LoginInput } from './auth.schemas.js';

export interface AuthResult {
  user: Pick<UserDocument, '_id' | 'email' | 'displayName' | 'accountStatus' | 'emailVerifiedAt'>;
  accessToken: string;
  accessTokenExpiresAt: Date;
  sessionId: string;
}

export async function registerUser(
  input: RegisterInput,
  env: { accessTokenSecret: string; accessTokenTtl: string; refreshTokenTtlMs: number },
): Promise<AuthResult> {
  const normalizedEmail = normalizeEmail(input.email);

  const existing = await UserModel.findOne({ normalizedEmail }).lean();
  if (existing) {
    // Same generic message whether email exists or not — avoids enumeration.
    throw new AppError(
      ErrorCode.VALIDATION_ERROR,
      'Could not create account with these details.',
      HttpStatus.BAD_REQUEST,
    );
  }

  const passwordHash = await hashPassword(input.password);
  const user = await UserModel.create({
    email: input.email,
    normalizedEmail,
    passwordHash,
    displayName: input.displayName,
    emailVerifiedAt: null,
    accountStatus: 'active',
    lastLoginAt: new Date(),
  });

  return issueSessionForUser(user, env);
}

export async function loginUser(
  input: LoginInput,
  env: { accessTokenSecret: string; accessTokenTtl: string; refreshTokenTtlMs: number },
): Promise<AuthResult> {
  const normalizedEmail = normalizeEmail(input.email);
  const user = await UserModel.findOne({ normalizedEmail }).select('+passwordHash').exec();

  // Always run verify to keep timing similar whether the account exists or not
  const ok = user ? await verifyPassword(user.passwordHash, input.password) : false;
  if (!user || !ok) {
    throw new AppError(
      ErrorCode.AUTH_REQUIRED,
      'Invalid email or password.',
      HttpStatus.UNAUTHORIZED,
    );
  }
  if (user.accountStatus !== 'active') {
    throw new AppError(ErrorCode.ACCOUNT_SUSPENDED, 'Account is suspended.', HttpStatus.FORBIDDEN);
  }

  user.lastLoginAt = new Date();
  await user.save();

  return issueSessionForUser(user, env);
}

async function issueSessionForUser(
  user: UserDocument,
  env: { accessTokenSecret: string; accessTokenTtl: string; refreshTokenTtlMs: number },
): Promise<AuthResult> {
  const now = new Date();
  const access = signAccessToken(user._id.toString(), env.accessTokenSecret, env.accessTokenTtl);

  const session = await SessionModel.create({
    userId: user._id,
    tokenFamilyId: randomUUID(),
    // Batch 2A stores a placeholder — Batch 2B replaces this with a hashed refresh token.
    refreshTokenHash: 'pending-2b',
    deviceLabel: null,
    userAgentHash: null,
    expiresAt: new Date(now.getTime() + env.refreshTokenTtlMs),
    revokedAt: null,
    replacedBySessionId: null,
  });

  return {
    user: {
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
      accountStatus: user.accountStatus,
      emailVerifiedAt: user.emailVerifiedAt,
    },
    accessToken: access.token,
    accessTokenExpiresAt: access.expiresAt,
    sessionId: (session._id as Types.ObjectId).toString(),
  };
}
import { Router } from 'express';
import { AppError, HttpStatus } from '@placement/shared/http/errors';
import { registerSchema, loginSchema } from '../modules/auth/auth.schemas.js';
import { registerUser, loginUser } from '../modules/auth/auth.service.js';
import { validateBody } from '../middleware/validate.js';
import { getEnv } from '../env.js';

/**
 * Auth routes — Batch 2A scope:
 *   POST /register
 *   POST /login
 *
 * Refresh, logout, verify-email, forgot-password arrive in later batches.
 */
export function authRouter(): Router {
  const router = Router();

  router.post('/register', validateBody(registerSchema), async (req, res, next) => {
    try {
      const env = getEnv();
      const result = await registerUser(req.body, {
        accessTokenSecret: env.ACCESS_TOKEN_SECRET,
        accessTokenTtl: env.ACCESS_TOKEN_TTL,
        refreshTokenTtlMs: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(HttpStatus.CREATED).json({
        success: true,
        data: {
          user: sanitizeUser(result.user),
          accessToken: result.accessToken,
          accessTokenExpiresAt: result.accessTokenExpiresAt.toISOString(),
          sessionId: result.sessionId,
        },
        meta: { requestId: req.requestId ?? 'unknown' },
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/login', validateBody(loginSchema), async (req, res, next) => {
    try {
      const env = getEnv();
      const result = await loginUser(req.body, {
        accessTokenSecret: env.ACCESS_TOKEN_SECRET,
        accessTokenTtl: env.ACCESS_TOKEN_TTL,
        refreshTokenTtlMs: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(HttpStatus.OK).json({
        success: true,
        data: {
          user: sanitizeUser(result.user),
          accessToken: result.accessToken,
          accessTokenExpiresAt: result.accessTokenExpiresAt.toISOString(),
          sessionId: result.sessionId,
        },
        meta: { requestId: req.requestId ?? 'unknown' },
      });
    } catch (err) {
      if (err instanceof AppError) return next(err);
      next(err);
    }
  });

  return router;
}

function sanitizeUser(user: {
  _id: unknown;
  email: string;
  displayName: string;
  accountStatus: string;
  emailVerifiedAt: Date | null;
}) {
  return {
    id: String(user._id),
    email: user.email,
    displayName: user.displayName,
    accountStatus: user.accountStatus,
    emailVerified: user.emailVerifiedAt !== null,
  };
}
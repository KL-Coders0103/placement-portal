import type { Request, Response, NextFunction } from 'express';
import { AppError, ErrorCode, HttpStatus } from '@placement/shared/http/errors';
import { verifyAccessToken, type AccessTokenPayload } from '../lib/jwt.js';
import { getEnv } from '../env.js';

declare module 'express-serve-static-core' {
  interface Request {
    auth?: AccessTokenPayload;
  }
}

/**
 * Require a valid access token in the Authorization header.
 * Populates req.auth with the token payload (sub = user id).
 * Never trusts roles or tenant ids from the token.
 */
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.header('authorization');
  if (!header || !header.startsWith('Bearer ')) {
    next(new AppError(ErrorCode.AUTH_REQUIRED, 'Authentication required.', HttpStatus.UNAUTHORIZED));
    return;
  }
  const token = header.slice('Bearer '.length).trim();
  const env = getEnv();
  const payload = verifyAccessToken(token, env.ACCESS_TOKEN_SECRET);
  if (!payload) {
    next(new AppError(ErrorCode.AUTH_REQUIRED, 'Authentication required.', HttpStatus.UNAUTHORIZED));
    return;
  }
  req.auth = payload;
  next();
}
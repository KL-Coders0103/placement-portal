import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

declare module 'express-serve-static-core' {
  interface Request {
    requestId: string;
  }
}

/**
 * Assigns a request ID to every request.
 * Uses the client-provided X-Request-Id if present, otherwise a server-generated UUID.
 * Echoes it back in the response header and exposes it on req.requestId.
 */
export function requestId(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.header('x-request-id');
  const id = typeof incoming === 'string' && incoming.length > 0 && incoming.length <= 128
    ? incoming
    : randomUUID();
  req.requestId = id;
  res.setHeader('X-Request-Id', id);
  next();
}
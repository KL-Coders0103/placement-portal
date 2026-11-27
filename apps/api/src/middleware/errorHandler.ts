import type { Request, Response, NextFunction } from 'express';
import { AppError, ErrorCode, HttpStatus } from '@placement/shared/http/errors';
import type { ErrorEnvelope } from '@placement/shared/http/envelope';
import { pino } from 'pino';

const logger = pino({ name: 'api:errorHandler' });

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const requestId = req.requestId ?? 'unknown';

  if (err instanceof AppError) {
    const body: ErrorEnvelope = {
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
      meta: { requestId },
    };
    logger.warn({ requestId, code: err.code, status: err.status }, err.message);
    res.status(err.status).json(body);
    return;
  }

  logger.error({ requestId, err }, 'unhandled error');
  const body: ErrorEnvelope = {
    success: false,
    error: {
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Something went wrong. Please try again.',
    },
    meta: { requestId },
  };
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
}

export function notFoundHandler(req: Request, res: Response): void {
  const body: ErrorEnvelope = {
    success: false,
    error: {
      code: ErrorCode.RESOURCE_NOT_FOUND,
      message: 'Resource not found or not visible.',
    },
    meta: { requestId: req.requestId ?? 'unknown' },
  };
  res.status(HttpStatus.NOT_FOUND).json(body);
}
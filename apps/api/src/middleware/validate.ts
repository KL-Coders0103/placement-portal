import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { AppError, ErrorCode, HttpStatus } from '@placement/shared/http/errors';

/**
 * Validate and replace req.body with the parsed value.
 * On failure, returns a VALIDATION_ERROR with field-level details
 * (field paths + messages only, never echoing raw input).
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));
      next(
        new AppError(
          ErrorCode.VALIDATION_ERROR,
          'Request could not be processed',
          HttpStatus.BAD_REQUEST,
          details,
        ),
      );
      return;
    }
    req.body = result.data;
    next();
  };
}
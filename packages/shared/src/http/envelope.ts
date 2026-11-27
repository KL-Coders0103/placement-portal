/**
 * HTTP response envelope — every API response uses one of these shapes.
 * See API_SPECIFICATION.md #2.
 */

export interface SuccessMeta {
  requestId: string;
  pagination?: {
    nextCursor: string | null;
    hasMore: boolean;
  };
}

export interface SuccessEnvelope<T> {
  success: true;
  data: T;
  meta: SuccessMeta;
}

export interface ErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta: {
    requestId: string;
  };
}

export type Envelope<T> = SuccessEnvelope<T> | ErrorEnvelope;

export function isSuccess<T>(envelope: Envelope<T>): envelope is SuccessEnvelope<T> {
  return envelope.success === true;
}

export function isError<T>(envelope: Envelope<T>): envelope is ErrorEnvelope {
  return envelope.success === false;
}
import { env } from '../env/env';
import type { Envelope } from '@placement/shared';

export interface RequestOptions {
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export interface AppErrorShape {
  code: string;
  message: string;
  status: number;
  requestId: string;
  details?: unknown;
}

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly requestId: string;
  readonly details?: unknown;

  constructor(shape: AppErrorShape) {
    super(shape.message);
    this.name = 'ApiError';
    this.code = shape.code;
    this.status = shape.status;
    this.requestId = shape.requestId;
    this.details = shape.details;
  }
}

async function request<T>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const url = `${env.VITE_API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'X-Request-Id': crypto.randomUUID(),
    ...options.headers,
  };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const init: RequestInit = {
    method,
    headers,
    credentials: 'include',
    signal: options.signal ?? null,
  };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  const response = await fetch(url, init);

  let envelope: Envelope<T>;
  try {
    envelope = (await response.json()) as Envelope<T>;
  } catch {
    throw new ApiError({
      code: 'INTERNAL_ERROR',
      message: 'Invalid response from server.',
      status: response.status,
      requestId: response.headers.get('X-Request-Id') ?? 'unknown',
    });
  }

  if (envelope.success === false) {
    throw new ApiError({
      code: envelope.error.code,
      message: envelope.error.message,
      status: response.status,
      requestId: envelope.meta.requestId,
      details: envelope.error.details,
    });
  }

  return envelope.data;
}

export const api = {
  get:    <T>(path: string, opts?: RequestOptions) => request<T>('GET', path, undefined, opts),
  post:   <T>(path: string, body: unknown, opts?: RequestOptions) => request<T>('POST', path, body, opts),
  patch:  <T>(path: string, body: unknown, opts?: RequestOptions) => request<T>('PATCH', path, body, opts),
  delete: <T>(path: string, opts?: RequestOptions) => request<T>('DELETE', path, undefined, opts),
};
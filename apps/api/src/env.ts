import { parseApiEnv, type ApiEnv } from '@placement/shared/env/api';

let cached: ApiEnv | null = null;

/**
 * Validated API environment.
 * Fails fast on first access if any required variable is missing/invalid.
 */
export function getEnv(): ApiEnv {
  if (!cached) {
    cached = parseApiEnv(process.env);
  }
  return cached;
}
import { parseWorkerEnv, type WorkerEnv } from '@placement/shared/env/worker';

let cached: WorkerEnv | null = null;

/**
 * Validated worker environment.
 * Fails fast on first access if any required variable is missing/invalid.
 */
export function getEnv(): WorkerEnv {
  if (!cached) {
    cached = parseWorkerEnv(process.env);
  }
  return cached;
}
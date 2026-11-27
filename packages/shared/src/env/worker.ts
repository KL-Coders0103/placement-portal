import { z } from 'zod';

/**
 * Worker environment schema.
 * Validated once at worker startup. Process exits if any required value is missing or invalid.
 */
export const workerEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']),

  MONGODB_URI: z.string().url(),
  REDIS_URL: z.string().url(),

  OBJECT_STORAGE_ENDPOINT: z.string().url(),
  OBJECT_STORAGE_BUCKET: z.string().min(1),
  OBJECT_STORAGE_ACCESS_KEY: z.string().min(1),
  OBJECT_STORAGE_SECRET_KEY: z.string().min(1),
  OBJECT_STORAGE_REGION: z.string().min(1),
  OBJECT_STORAGE_FORCE_PATH_STYLE: z
    .string()
    .optional()
    .default('false')
    .transform((v) => v === 'true'),

  EMAIL_PROVIDER: z.string().min(1),
  EMAIL_FROM: z.string().email(),

  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),

  WORKER_CONCURRENCY: z.coerce.number().int().positive().default(5),
});

export type WorkerEnv = z.infer<typeof workerEnvSchema>;

export function parseWorkerEnv(env: NodeJS.ProcessEnv): WorkerEnv {
  const result = workerEnvSchema.safeParse(env);
  if (!result.success) {
    const fieldErrors = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid worker environment:\n${fieldErrors}`);
  }
  return result.data;
}
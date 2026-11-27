import { z } from 'zod';

/**
 * API environment schema.
 * Validated once at API startup. Process exits if any required value is missing or invalid.
 * Never log the raw env object — it contains secrets.
 */
export const apiEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']),
  PORT: z.coerce.number().int().positive(),
  API_PREFIX: z.string().startsWith('/'),
  WEB_ORIGIN: z.string().url(),

  MONGODB_URI: z.string().url(),
  REDIS_URL: z.string().url(),

  ACCESS_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_TTL: z.string().min(1),
  REFRESH_TOKEN_TTL: z.string().min(1),

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
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

export function parseApiEnv(env: NodeJS.ProcessEnv): ApiEnv {
  const result = apiEnvSchema.safeParse(env);
  if (!result.success) {
    const fieldErrors = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    // Never print the values — only the field names and messages.
    throw new Error(`Invalid API environment:\n${fieldErrors}`);
  }
  return result.data;
}
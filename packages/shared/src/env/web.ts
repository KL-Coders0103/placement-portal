import { z } from 'zod';

/**
 * Web (browser) environment schema.
 * Only VITE_* variables are available in the browser bundle.
 * Never put secrets here — anything in VITE_* is public.
 */
export const webEnvSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']),
});

export type WebEnv = z.infer<typeof webEnvSchema>;

export function parseWebEnv(env: Record<string, string | boolean | undefined>): WebEnv {
  const result = webEnvSchema.safeParse(env);
  if (!result.success) {
    const fieldErrors = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid web environment:\n${fieldErrors}`);
  }
  return result.data;
}
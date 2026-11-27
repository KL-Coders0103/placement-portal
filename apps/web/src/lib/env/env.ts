import { parseWebEnv, type WebEnv } from '@placement/shared/env/web';

/**
 * Validated web environment.
 * Only VITE_* variables are available in the browser.
 * Never put secrets here.
 */
export const env: WebEnv = parseWebEnv(import.meta.env);
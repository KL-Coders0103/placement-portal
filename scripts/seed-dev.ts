/**
 * Synthetic dev seed script.
 *
 * Phase 01 scope: prints confirmation only — no database writes yet.
 * Phase 02+ extends this to create test institutions, students, companies
 * and recruiters, clearly labelled as synthetic.
 *
 * Rules (see PROJECT_REQUIREMENTS.md §12, DEVELOPMENT_GUIDE.md §6.1):
 *   - NEVER runs against production.
 *   - NEVER uses real student data.
 *   - Never imported by application code.
 */

const env = process.env.NODE_ENV ?? 'development';

if (env === 'production') {
  // Hard stop — refuse to seed production.
  console.error('[seed:dev] Refusing to run in production. Aborting.');
  process.exit(1);
}

console.log('[seed:dev] Environment:', env);
console.log('[seed:dev] Synthetic seed data will be added in Phase 02.');
console.log('[seed:dev] Nothing to do in Phase 01.');
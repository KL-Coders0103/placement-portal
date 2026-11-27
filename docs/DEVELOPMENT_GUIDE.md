# Placement Portal — Development Guide

**Repository:** `KL-Coders0103/placement-portal`  
**Primary environment:** Windows 11 / PowerShell (also support macOS/Linux)  
**Stack baseline:** React + TypeScript + Vite + Tailwind; Express 5 + TypeScript; MongoDB/Mongoose; Redis/BullMQ  
**Package manager:** npm (workspaces)

## 1. Source-of-truth documents

Read in this order before implementation:
1. PROJECT_REQUIREMENTS.md — scope and constraints.
2. PRODUCT_REQUIREMENTS.md — actors and outcomes.
3. MASTER_FEATURE_IMPLEMENTATION.md — phase-by-phase behavior.
4. ARCHITECTURE.md — system boundaries.
5. DATABASE_SCHEMA.md — collections, indexes and invariants.
6. API_SPECIFICATION.md — HTTP contract.
7. SECURITY_GUIDELINES.md — security/privacy requirements.
8. DESIGN_SYSTEM.md and UI_UX_GUIDELINES.md — visual and interaction rules.
9. FRONTEND_ARCHITECTURE.md — web application implementation pattern.
10. TESTING_STRATEGY.md — test requirements.
11. IMPLEMENTATION_TRACKER.md — current progress.
12. DECISIONS.md — approved/open choices.
13. DEPLOYMENT_GUIDE.md — release and operations.

If documents conflict, do not silently pick one. Identify the conflict, add a proposed decision to DECISIONS.md and update dependent documents after approval.

## 2. Repository structure

```text
placement-portal/
  apps/
    web/                 # React SPA
    api/                 # Express API
    worker/              # BullMQ worker process
  packages/
    shared/              # DTOs, enums, Zod contracts and env schemas
    ui/                  # shared UI primitives when justified
    config/              # shared TS/lint configuration
  docs/                  # this documentation set
  scripts/               # seed, migration and maintenance scripts
  infra/                 # docker-compose for Mongo (replica set), Redis, MinIO
  .github/workflows/
  package.json
  package-lock.json      # single lockfile at root
  tsconfig.base.json
  .env.example
  .nvmrc
  README.md
```

This is the target structure. Inspect the existing repository before creating or moving source files. Do not claim this structure is already implemented unless verified.

## 3. Prerequisites and versions

- **Node.js LTS** — pinned in `.nvmrc` and `engines` field of every `package.json`.
- **npm** — the single package manager for the whole repo. Single `package-lock.json` at the root, committed.
- **Docker Desktop** — for local MongoDB (single-node replica set), Redis and MinIO.
- Git and a modern browser.

Pin all runtime dependency versions exactly (`--save-exact`). Dev dependencies may use `~` within the same minor. Do not upgrade major versions mid-phase without recording the reason in DECISIONS.md and running the full test suite.

## 4. Environment setup

### 4.1 Rules

- **No secrets in source code, tests, fixtures, git history or documentation.**
- **No hardcoded credentials or connection strings** anywhere in code. If a value is missing, the process must fail fast at startup.
- **Env validation is done once** per app, using Zod schemas in `packages/shared/src/env/`.
  - `apps/api` and `apps/worker` read unprefixed variables (`MONGODB_URI`, `REDIS_URL`, etc.).
  - `apps/web` reads only variables prefixed with `VITE_*`.
- **VITE_ variables are public.** Anything prefixed `VITE_` is visible in the browser bundle. Never put secrets there. CI scans the built web bundle and fails on forbidden names (`SECRET`, `KEY`, `TOKEN`, `PASSWORD`, `MONGODB_URI`, `REDIS_URL`).
- **Three env files:**
  - `.env.example` — committed, placeholders only, documents every variable.
  - `.env` — local only, gitignored, never shared or committed.
  - Staging/production — injected by the platform secret manager at runtime. Never stored in files.
- **Separate credentials per environment** (dev / test / staging / production). Never reuse.
- **Synthetic data only** in local and test environments. Never use real student data.

### 4.2 Startup validation

- `apps/api` and `apps/worker` parse `process.env` with a Zod schema before binding to any port. Invalid or missing values → exit non-zero with a clear message (without secrets in the error text).
- `apps/web` parses `import.meta.env` with a Zod schema before mounting React. Invalid values → render a static error screen (no stack traces, no env dump).

## 5. Local development workflow

1. Clone repository and checkout the agreed branch.
2. Run `npm ci` (installs exactly what `package-lock.json` specifies).
3. Start local infrastructure: `npm run infra:up` (starts MongoDB replica set, Redis and MinIO via `infra/docker-compose.yml`).
4. Copy `.env.example` to `.env` and fill local-only values.
5. Run `npm run db:migrate` then `npm run seed:dev`.
6. Start everything: `npm run dev` (runs web, api and worker concurrently).
7. Verify health endpoints (`/health/live`, `/health/ready`) and sign in with seeded dev accounts.
8. Run `npm run lint && npm run typecheck && npm test && npm run build` before committing.

Exact scripts and ports must match `package.json` and the env schema. Do not invent a command as runnable if it is not defined.

## 6. Coding conventions

- TypeScript strict mode; avoid `any` and unsafe casts.
- camelCase variables/functions; PascalCase components/types; UPPER_SNAKE_CASE true constants.
- Use feature/domain folders and explicit module boundaries.
- Validate all external input at API boundaries.
- Controllers handle HTTP mapping; services own use cases; policies authorize; repositories encapsulate complex persistence.
- Never return raw Mongoose documents; map to safe DTOs.
- Use the centralized API client in the web app. **Feature components must not import `fetch` or `axios` directly.**
- Keep server state in TanStack Query, local UI state in component/Zustand state, and forms in React Hook Form + Zod.
- Use semantic HTML and design tokens. **No hardcoded hex colors in feature code.**

### 6.1 Anti-hardcoding rules

- **No hardcoded business values.** Roles, statuses, types and policies come from `@placement/shared` enums or institution policy objects.
- **No hardcoded role checks** in components. Use `useAbility()` or `PermissionGate`.
- **No hardcoded API URLs** in features. Use `endpoints.ts` inside `lib/api`.
- **No hardcoded dates/formats** in UI. Use `<DateTimeWithTz>`, `<NumberFormat>`, `<CurrencyFormat>`.
- **No hardcoded colors.** Use design tokens only.
- **No fake data in shipped code.** Mock/synthetic data lives only in `scripts/seed:dev` and test files. ESLint and CI enforce where possible.

### 6.2 Dependency rules

- **One library per concern.** No duplicate libraries (e.g. not both `dayjs` and `date-fns`; not both `axios` and `ky`).
- **Every dependency is logged** in `docs/DEPENDENCY_LOG.md` with: package, version, purpose, alternatives considered, license, added-by, date.
- **Runtime dependencies pinned exactly** with `npm install --save-exact <pkg>`.
- **No new dependency over 50 KB gzipped** on the web side without explicit approval.
- **Full test suite must pass** after adding or upgrading a dependency.
- **Lockfile drift fails CI** (`npm ci` must succeed on a clean clone).

## 7. Database workflow

- Update schema and index definitions deliberately.
- Add versioned, idempotent migration/backfill scripts for data-shape changes.
- Test scripts against representative synthetic data.
- Check query plans for high-volume tenant-scoped queries.
- Never run destructive scripts against production without backup, approval and rollback plan.
- Transactions require replica-set support. Local MongoDB must run as a single-node replica set (configured in `infra/docker-compose.yml`).

## 8. Feature implementation workflow

For each feature:
1. Identify actors, user story and acceptance criteria.
2. Identify data classification and permission boundary.
3. Define API contract and state transitions.
4. Add schema/index and migration/backfill if needed.
5. Implement backend use case, validation, authorization and audit/outbox.
6. Implement responsive UI and all UI states (loading / empty / error / forbidden / success).
7. Add unit, integration, API/security and E2E tests.
8. Update OpenAPI and documentation.
9. Run typecheck, lint, tests and builds.
10. Update IMPLEMENTATION_TRACKER.md with evidence and known limitations.

## 9. Git workflow

Use focused branches: `feat/<domain>`, `fix/<issue>`, `docs/<topic>`. Commit prefixes: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`. Keep PRs focused. Include screenshots for UI changes, schema/API impacts, permission test evidence and migration/rollback notes.

## 10. Safe debugging

Never paste tokens, cookies, passwords, private resume links, student exports or production PII into logs or chat. Use request IDs and synthetic records. Redact logs. Do not disable authorization or validation to make a test pass.

## 11. Definition of ready

Scope, actor, acceptance criteria, dependencies, open decisions, data model, API shape, permission policy and test plan are understood.

## 12. Definition of done

Acceptance criteria pass; database and API are integrated; authorization and negative tests pass; audit/notification behavior is correct; UI is accessible and responsive; quality checks actually ran; docs/tracker are updated; no secrets or unrelated edits remain; no hardcoded data, colors, URLs or credentials were introduced; any new dependency is logged in `DEPENDENCY_LOG.md`.
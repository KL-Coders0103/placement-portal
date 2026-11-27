# Placement Portal

Institution-governed placement and recruitment management platform.

> Not an unrestricted public job board. Does not guarantee placement.

## Stack

- **Web:** React 18 + TypeScript + Vite + Tailwind (light theme only)
- **API:** Node.js LTS + TypeScript + Express 5 — `/api/v1`
- **Worker:** BullMQ consumer for email, scans, exports and reminders
- **Data:** MongoDB (Mongoose) + Redis + private S3-compatible storage
- **Validation:** Zod at every trust boundary
- **Tests:** Vitest + Supertest + Playwright

## Repo layout

```
apps/
  web/      React SPA
  api/      Express API
  worker/   Background worker
packages/
  shared/   DTOs, enums, Zod env schemas, error codes, HTTP envelope
  config/   Shared TS/ESLint/Prettier config
docs/       Authoritative specification set (15 docs + UI spec + dep log)
infra/      Docker Compose for local Mongo (replica set), Redis, MinIO
scripts/    Seed, migration, maintenance
```

## Prerequisites

- Node.js **LTS** (see `.nvmrc`)
- npm **10+**
- Docker Desktop (for MongoDB replica set, Redis, MinIO locally)
- Git

## First-time setup

```bash
# 1. Install dependencies (uses package-lock.json)
npm ci

# 2. Start local infrastructure
npm run infra:up

# 3. Copy env and fill local values
cp .env.example .env

# 4. Seed synthetic dev data
npm run seed:dev

# 5. Run everything (web + api + worker)
npm run dev
```

- Web:  http://localhost:5173
- API:  http://localhost:3000/api/v1
- Health: http://localhost:3000/api/v1/health/live
- API docs: http://localhost:3000/api/docs (added in Phase 02)

## Quality gates (run before committing)

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Documentation

Read in this order (see `docs/`):

1. `PROJECT_REQUIREMENTS.md`
2. `PRODUCT_REQUIREMENTS.md`
3. `MASTER_FEATURE_IMPLEMENTATION.md`
4. `ARCHITECTURE.md`
5. `DATABASE_SCHEMA.md`
6. `API_SPECIFICATION.md`
7. `SECURITY_GUIDELINES.md`
8. `DESIGN_SYSTEM.md` + `UI_UX_GUIDELINES.md` + `UI_RESPONSIVE_SPEC.md`
9. `FRONTEND_ARCHITECTURE.md`
10. `TESTING_STRATEGY.md`
11. `IMPLEMENTATION_TRACKER.md`
12. `DECISIONS.md`
13. `DEPLOYMENT_GUIDE.md`

## Rules (non-negotiable)

- **No secrets in code, tests, fixtures or git history.**
- **No hardcoded data presented as live.** All user-visible values come from the API.
- **One API client** on the frontend (`apps/web/src/lib/api/client.ts`). No `fetch`/`axios` in features.
- **Design tokens only** — no one-off hex colors.
- **Every page implements** loading / empty / error / forbidden / success states.
- **Server is the authorization authority.** Frontend guards are UX only.
- **Implemented ≠ Complete.** A feature is complete only after acceptance + authz + tests + a11y + tracker evidence.

## Synthetic dev data

`scripts/seed-dev.ts` creates clearly-labelled test institutions, students, companies
and recruiters. It never runs against a real database. It is not imported by production code.

## License

Internal — not for redistribution.
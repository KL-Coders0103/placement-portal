# Placement Portal — Development Guide

**Repository:** `KL-Coders0103/placement-portal`  
**Primary environment:** Windows 11 / PowerShell (also support macOS/Linux)  
**Stack baseline:** React + TypeScript + Vite + Tailwind; Express 5 + TypeScript; MongoDB/Mongoose; Redis/BullMQ

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
    shared/              # DTOs, enums and Zod contracts
    ui/                  # shared UI primitives when justified
    config/              # shared TS/lint configuration
  docs/                  # this documentation set
  scripts/               # seed, migration and maintenance scripts
  .github/workflows/
  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
  .env.example
  README.md
```

This is the target structure. Inspect the existing repository before creating or moving source files. Do not claim this structure is already implemented unless verified.

## 3. Prerequisites and versions

Use a supported Node.js LTS release compatible with pinned dependencies, pnpm as the single package manager, Git and a modern browser. MongoDB must run in a replica-set-capable mode for transaction integration tests. Redis is required for queue integration. Use Docker Compose for reproducible local dependencies if approved.

Pin dependency versions and commit the lockfile. Do not upgrade major versions mid-phase without recording the reason and running the full test suite.

## 4. Environment setup

- Copy .env.example to local .env and fill local-only values.
- Never commit .env, credentials, private keys, student data or uploaded resumes.
- Validate environment variables at startup using a schema.
- Web variables prefixed VITE_ are public and must contain no secrets.
- Keep separate development, test, staging and production credentials.
- Use synthetic fixtures only.

## 5. Local development workflow

1. Clone repository and checkout the agreed branch.
2. Install dependencies using the lockfile.
3. Start MongoDB and Redis.
4. Configure local environment values.
5. Run database/index setup and synthetic seed scripts.
6. Start API, worker and web app using root scripts.
7. Verify health endpoints and sign in with seeded non-production accounts.
8. Run tests before committing.

Exact scripts and ports must match package.json and env schema. Do not invent a command as runnable if it is not defined.

## 6. Coding conventions

- TypeScript strict mode; avoid any and unsafe casts.
- camelCase variables/functions; PascalCase components/types; UPPER_SNAKE_CASE true constants.
- Use feature/domain folders and explicit module boundaries.
- Validate all external input at API boundaries.
- Controllers handle HTTP mapping; services own use cases; policies authorize; repositories encapsulate complex persistence.
- Never return raw Mongoose documents; map to safe DTOs.
- Use centralized API client in the web app.
- Keep server state in TanStack Query, local UI state in component/Zustand state, and forms in React Hook Form + Zod.
- Use semantic HTML and design tokens.

## 7. Database workflow

- Update schema and index definitions deliberately.
- Add versioned, idempotent migration/backfill scripts for data-shape changes.
- Test scripts against representative synthetic data.
- Check query plans for high-volume tenant-scoped queries.
- Never run destructive scripts against production without backup, approval and rollback plan.
- Transactions require replica-set support.

## 8. Feature implementation workflow

For each feature:
1. Identify actors, user story and acceptance criteria.
2. Identify data classification and permission boundary.
3. Define API contract and state transitions.
4. Add schema/index and migration/backfill if needed.
5. Implement backend use case, validation, authorization and audit/outbox.
6. Implement responsive UI and all UI states.
7. Add unit, integration, API/security and E2E tests.
8. Update OpenAPI and documentation.
9. Run typecheck, lint, tests and builds.
10. Update IMPLEMENTATION_TRACKER.md with evidence and known limitations.

## 9. Git workflow

Use focused branches: feat/<domain>, fix/<issue>, docs/<topic>. Commit prefixes: feat, fix, docs, test, refactor, chore. Keep PRs focused. Include screenshots for UI changes, schema/API impacts, permission test evidence and migration/rollback notes.

## 10. Safe debugging

Never paste tokens, cookies, passwords, private resume links, student exports or production PII into logs or chat. Use request IDs and synthetic records. Redact logs. Do not disable authorization or validation to make a test pass.

## 11. Definition of ready

Scope, actor, acceptance criteria, dependencies, open decisions, data model, API shape, permission policy and test plan are understood.

## 12. Definition of done

Acceptance criteria pass; database and API are integrated; authorization and negative tests pass; audit/notification behavior is correct; UI is accessible and responsive; quality checks actually ran; docs/tracker are updated; no secrets or unrelated edits remain.

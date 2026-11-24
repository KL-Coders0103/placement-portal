# 07 — Technology Stack and Import Aliases

## Approved target stack
Web: React, TypeScript strict, Vite, Tailwind CSS, React Router, TanStack Query, React Hook Form, Zod.
API: Node.js LTS, TypeScript, Express 5, Zod, Mongoose.
Data: MongoDB Atlas/replica set.
Cache/queue: Redis and BullMQ.
Files: S3-compatible private object storage.
Realtime: Socket.IO for selected live events.
Testing: Vitest, Supertest, Playwright.
Observability: Pino and OpenTelemetry-compatible tracing.
CI: GitHub Actions.

Pin exact versions in lockfiles and upgrade deliberately. Use currently supported LTS at implementation time; never deploy floating latest dependencies.

## Workspace
Use pnpm workspaces. Packages: apps/web, apps/api, apps/worker, packages/shared, packages/ui and packages/config. Shared package contains public contracts/types only, never Mongoose models, secrets or server authorization logic.

## TypeScript
Strict mode, noUncheckedIndexedAccess where practical, no implicit any, consistent ESM, isolated build output. Validate all external data at runtime; static types do not validate HTTP input.

## Import aliases
Web: @/* → apps/web/src/*; @components/* → apps/web/src/components/*; @features/* → apps/web/src/features/*; @lib/* → apps/web/src/lib/*; @assets/* → apps/web/src/assets/*.
API: @api/* → apps/api/src/*; @modules/* → apps/api/src/modules/*; @shared/* → packages/shared/src/*.
Shared imports use package exports, not cross-package deep relative paths. Mirror aliases in tsconfig, Vite, Vitest and runtime/build tooling. Add CI alias-resolution tests.

## Frontend rules
API calls live in feature services/hooks. TanStack Query owns server state; form library owns form state. Keep transient UI state small. Centralize auth, active workspace and error handling. Never put secrets or privileged policy in the client. Lazy-load workspaces.

## Backend rules
Thin Express routers/controllers; services own business rules; policies own authorization; Zod validates params/query/body; DTOs whitelist responses; Mongoose schemas define persistence/indexes. Pino redacts secrets and sensitive values. Queue processors are idempotent.

## Environment variable names
NODE_ENV, PORT, WEB_ORIGIN, MONGODB_URI, REDIS_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, COOKIE_DOMAIN, STORAGE_ENDPOINT, STORAGE_BUCKET_PRIVATE, STORAGE_ACCESS_KEY, STORAGE_SECRET_KEY, EMAIL_PROVIDER_API_KEY, LOG_LEVEL. Validate at startup. Keep real values in secret manager; .env.example has placeholders only.

## Avoid premature complexity
No microservices, Kubernetes, GraphQL, event-streaming platform or heavy client state library without measured need and an architecture decision record. Never store resume binaries in MongoDB or production local disk.
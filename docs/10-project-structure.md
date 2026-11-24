# 10 — Project Structure and Aliases

## Target monorepo
placement-portal/
- apps/web/src: app, assets, components, features, hooks, lib, routes, styles, main.tsx.
- apps/web/src/features: auth, student, opportunities, applications, employer, placement-admin, leadership, interviews, notifications, reports.
- apps/api/src: config, middleware, modules, infrastructure, shared, app.ts, server.ts.
- apps/api/src/modules: identity, institutions, memberships, students, companies, opportunities, eligibility, applications, drives, interviews, offers, notifications, reports, audit, files, health.
- apps/worker/src: processors, queues, adapters, worker.ts.
- packages/shared: public DTOs, enums and Zod contracts.
- packages/ui: reusable accessible design system.
- packages/config: shared tsconfig/lint configuration.
- docs; scripts; .github/workflows; .env.example; pnpm-workspace.yaml; package.json; tsconfig.base.json.

This is the target structure, not a claim that source code exists yet. Create folders when their first implementation is added; avoid empty scaffolding.

## Module pattern
A domain module may contain routes, controller, service, repository, schema, policy, DTO, events and __tests__. Small modules may omit unnecessary layers. Routes declare transport; controllers map HTTP; services own use cases; policies authorize; repositories encapsulate complex persistence.

## Naming
camelCase variables/functions; PascalCase components/types; UPPER_SNAKE_CASE true constants; plural collection names; lowercase plural REST resources; permission names resource.action; domain events in past tense, e.g. application.status_changed.

## Aliases
Web: @/* → apps/web/src/*; @components/* → apps/web/src/components/*; @features/* → apps/web/src/features/*; @lib/* → apps/web/src/lib/*; @assets/* → apps/web/src/assets/*.
API: @api/* → apps/api/src/*; @modules/* → apps/api/src/modules/*; @shared/* → packages/shared/src/*.
Shared packages use package exports, not deep relative paths. Mirror aliases in tsconfig, Vite, Vitest and runtime/build tooling. Test alias resolution in CI.

## Dependency direction
Web may depend on shared contracts and UI. API and worker may depend on shared contracts and infrastructure. Shared cannot import apps, Mongoose, secrets or server policies. Domain modules do not import controllers from other modules; communicate through service interfaces/events.

## Scripts to implement
Root: dev, build, typecheck, lint, format:check, test, test:coverage, test:e2e, clean.
API: dev, build, start, test, test:integration, openapi:generate.
Web: dev, build, preview, test, test:e2e.
Worker: dev, build, start, test.
Do not document scripts as runnable until package.json defines them.

## Configuration
Validate environment at startup. Keep VITE_ variables public-only. Never import server secrets into browser/shared bundles. Ignore .env files except .env.example, uploads, logs, coverage, build output, node_modules and generated secrets.
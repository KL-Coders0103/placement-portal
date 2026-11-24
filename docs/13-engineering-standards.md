# 13 — Engineering Standards and AI Agent Instructions

## Principles
Small, readable, reversible changes. Inspect actual code before implementation. Distinguish implemented, partial and planned. Never report unrun checks as passing.

## TypeScript and naming
Strict TypeScript; avoid any; camelCase variables/functions; PascalCase components/types; UPPER_SNAKE_CASE true constants. Prefer named exports and explicit public service contracts. Handle rejected promises. No empty catch blocks. Format and lint consistently.

## Backend
Routes declare transport and middleware. Controllers map HTTP. Services enforce business rules and transactions. Policies authorize. Repositories encapsulate complex persistence. Schemas validate and define indexes. DTOs whitelist output; never serialize raw database documents. Use conditional writes for state changes. Never trust client-supplied actor, owner, tenant or role identifiers.

## Frontend
Feature-based organization. Central API client for credentials, request IDs and errors. TanStack Query owns server state; forms own form state. Centralize active workspace. Route guards are UX only. Every screen handles loading, empty, error, success and forbidden states. Use accessible semantic HTML. Do not put secrets in browser bundles or store tokens in localStorage by default.

## Database and API
Schema changes include index impact, backfill and rollback. Use safe repeatable migrations/scripts. Validate params/query/body/files. Whitelist updates, filters and sorting. Paginate unbounded lists. Use stable errors and idempotency for retried side effects. Keep OpenAPI and tests synchronized.

## Git
Branches: feat/domain-change, fix/domain-issue, docs/topic. Commit prefixes: feat, fix, docs, test, refactor, chore. PRs focused, with screenshots for UI and schema/API impact notes. Never commit .env, secrets, uploads, private records, node_modules or build output. Do not rewrite shared history without explicit approval.

## AI coding-agent workflow
1. Read README and relevant docs.
2. Inspect branch, tree, scripts, source and tests.
3. Classify behavior as implemented, partial or planned.
4. Define acceptance criteria and affected actors/resources.
5. Identify authorization, privacy, schema, API, UI and migration impacts.
6. Implement the smallest complete vertical slice.
7. Add positive, negative, cross-role, cross-tenant, boundary and failure tests.
8. Update contracts and docs.
9. Run actual typecheck, lint, tests and builds available.
10. Review diff for secrets, unrelated edits, generated noise and TODOs.
11. Report exact files, commands, observed outcomes and remaining risks.

## Prohibited shortcuts
Never self-assign privileged roles; bypass RBAC; expose resumes publicly; use real student data in fixtures; allow AI to select/reject candidates; change application status without validated transition/audit; invent APIs or claim unimplemented features; claim tests passed without running them.

## Definition of done
Acceptance criteria pass; permissions and ownership tested; schema/index impact addressed; audit and notification correct; UI accessible/responsive; tests pass; docs updated; no secrets; rollout and rollback understood.
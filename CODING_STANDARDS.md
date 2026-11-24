# Coding Standards and Engineering Conventions

## 1. Engineering principles

Readable, secure, testable code is preferred over clever abstractions. Keep changes focused. Validate at trust boundaries. Separate transport, domain logic, persistence, and integrations. Avoid silent failures and hidden side effects.

## 2. Current backend conventions

- JavaScript with CommonJS (`require`, `module.exports`).
- Express 5.
- Mongoose models.
- Existing filenames use camelCase for controllers/routes and PascalCase for model files; preserve existing convention unless migrating consistently.
- Use `const` by default, `let` only for reassignment.
- Use async/await and centralized error handling.
- Avoid unhandled promises and empty catch blocks.
- Keep secrets/config out of source.

## 3. Naming

| Element | Convention | Example |
|---|---|---|
| Variables/functions | camelCase | `getStudentProfile` |
| Classes/model constructors | PascalCase | `StudentProfile` |
| Constants | UPPER_SNAKE_CASE for true constants | `MAX_RESUME_SIZE` |
| Routes | resource-oriented, plural where practical | `/api/jobs` |
| Mongo fields | camelCase | `graduationYear` |
| Environment variables | UPPER_SNAKE_CASE | `JWT_SECRET` |
| React components | PascalCase | `JobCard` |
| Hooks | `use` + camelCase | `useApplications` |

## 4. Backend layering

- **Routes:** declare method/path and middleware only.
- **Middleware:** auth, authorization, validation, upload, request context.
- **Controllers:** parse validated request, call service, map response/status.
- **Services:** business rules, orchestration, transactions/consistency, integrations.
- **Models:** schema, validation, indexes, persistence hooks.
- **Config:** validated environment and infrastructure setup.
- **Utils:** small pure helpers; avoid dumping business logic here.

Introduce services when logic is reused or spans multiple models. Do not add layers mechanically.

## 5. API standards

- Use consistent resource naming and HTTP semantics.
- Validate all request data on the server.
- Whitelist fields for create/update.
- Return stable error codes and safe messages.
- Use correct status codes.
- Paginate lists and cap page size.
- Do not expose password hashes, tokens, internal paths, or stack traces.
- Document response contracts and status transitions.
- Keep OpenAPI/docs/tests synchronized.

## 6. MongoDB/Mongoose standards

- Declare required fields, enums, defaults, references, and indexes explicitly.
- Normalize email and searchable fields.
- Enforce uniqueness in the database where business-critical.
- Use projections to exclude secrets.
- Avoid unbounded arrays and excessive populate.
- Handle duplicate key and cast errors deliberately.
- Use atomic conditional updates for state transitions.
- Plan backfills/index creation for schema changes.

## 7. Frontend standards (when added)

- Organize by product feature.
- Shared UI components are domain-neutral.
- Keep API logic in a centralized client/hooks/services layer.
- Keep secrets out of browser bundles.
- Use accessible native semantics and form labels.
- Separate server state, form state, and ephemeral UI state.
- Implement loading/error/empty/success states.
- Use design tokens; avoid scattered magic colors/spacing.
- Avoid giant components; extract by responsibility.

## 8. Error handling and observability

- Use typed/domain error categories.
- Log server diagnostics with request ID.
- Do not log credentials, tokens, resume content, or unnecessary PII.
- Distinguish validation, auth, authorization, not found, conflict, business rule, dependency, and internal errors.
- Never return success before durable persistence completes.

## 9. Git workflow

- Use focused branches and small commits.
- Commit messages: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`.
- Do not commit .env, secrets, uploads, private data, node_modules, or build artifacts.
- Include tests and docs with feature changes.
- Review full diff and generated files before push.
- Do not rewrite shared history without explicit approval.

## 10. Definition of done

Acceptance criteria pass; authorization/validation are enforced; positive, negative, boundary and failure tests pass; migrations/index changes are reviewed; responsive/accessibility checks pass; docs and examples are updated; logs are safe; diff contains no secrets or unrelated changes.

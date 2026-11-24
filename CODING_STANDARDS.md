# Coding Standards

## 1. General principles

- Prefer readable, explicit code over clever abstractions.
- Keep controllers focused on HTTP concerns.
- Keep route declarations thin.
- Move reusable domain logic into services as complexity grows.
- Validate data at trust boundaries.
- Avoid hidden side effects and implicit global state.
- Keep functions small and name them by intent.

## 2. Backend JavaScript

The current server uses JavaScript with CommonJS.

- Use `const` by default and `let` only when reassignment is necessary.
- Use descriptive camelCase for variables/functions.
- Use PascalCase for model constructors/classes.
- Use consistent file names matching the existing convention unless a deliberate repo-wide migration is made.
- Use `require` / `module.exports` consistently while the project remains CommonJS.
- Use async/await and centralize async error handling.
- Return or await every promise; avoid unhandled rejections.
- Never swallow exceptions silently.
- Do not expose stack traces or internal database errors in production responses.

## 3. Layer responsibilities

- **Routes:** HTTP method/path, middleware, controller selection.
- **Middleware:** authentication, authorization, validation, upload policy.
- **Controllers:** request/response mapping and service invocation.
- **Services (recommended as logic grows):** business rules and integrations.
- **Models:** schema, indexes, persistence-level constraints.
- **Config:** environment and infrastructure setup.

Do not put large business workflows directly in route files.

## 4. API conventions

- Use nouns for resource paths and consistent HTTP methods.
- Use plural resource names where established.
- Use correct status codes.
- Return a consistent success/error envelope once adopted.
- Validate pagination limits and sort fields.
- Avoid leaking sensitive model fields.
- Keep API behavior synchronized with API_SPECIFICATION.md.

## 5. Database conventions

- Define required fields, enums, defaults, references, and indexes deliberately.
- Normalize email and other searchable identifiers.
- Enforce important uniqueness at the database level.
- Avoid unbounded embedded arrays.
- Use projections to avoid fetching unnecessary sensitive fields.
- Handle missing references and duplicate key errors explicitly.

## 6. Frontend conventions (when introduced)

- Use reusable, accessible components.
- Organize by feature/domain.
- Keep API calls out of presentational components.
- Separate API state, local UI state, and form state.
- Use consistent loading/error/empty states.
- Centralize API base URL and request configuration.
- Never store privileged secrets in browser code.
- Ensure responsive behavior and keyboard support.

## 7. Error handling

- Use stable machine-readable error codes.
- Log diagnostic details server-side with request correlation ID.
- Return safe human-readable messages to clients.
- Distinguish validation, authentication, authorization, missing-resource, conflict, upload, and server errors.
- Do not report success before a database operation completes.

## 8. Git and review

- Use focused commits with imperative messages, e.g. `feat: add student profile update`.
- Keep changes scoped to one feature or fix.
- Do not commit environment files, credentials, uploaded resumes, build artifacts, or local databases.
- Include tests and docs in feature changes.
- Review the diff for accidental secrets and unrelated changes before pushing.

## 9. Definition of done

A change is complete when it meets acceptance criteria, passes relevant tests and lint/type checks (where configured), has appropriate authorization and validation, handles failure states, includes documentation updates, and has been reviewed for privacy/accessibility implications.

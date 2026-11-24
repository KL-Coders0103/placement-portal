# AI Agent Instructions

This file defines how AI coding agents should work in the Placement Portal repository. Treat repository source, package manifests, tests, and this document as project context—not as permission to invent features or silently change architecture.

## 1. Product context

The product is an AI-assisted college placement portal for students and placement administrators. Core domains are authentication, student profiles, resumes, jobs, applications, and later eligibility/matching. Company self-service and AI matching are planned capabilities unless code proves otherwise.

## 2. Verified technical baseline

- Backend is under `server/`.
- Runtime: Node.js.
- Module format: CommonJS.
- Framework: Express 5.
- Database access: Mongoose with MongoDB.
- Auth dependencies: bcryptjs and jsonwebtoken.
- Upload handling: Multer.
- Environment loading: dotenv.
- Existing source is organized into config, controllers, middleware, models, and routes.
- React + Tailwind frontend and Python AI service are planning-note items, not confirmed current implementations.
- `server/package.json` currently has a placeholder test script; do not claim tests pass without adding and running a real suite.

Always inspect the current branch before making assumptions. Package lockfile and source code override stale notes.

## 3. Required workflow

1. Read `README.md`, the relevant planning documents, and affected source files.
2. Inspect package scripts, installed dependencies, and current route/model conventions.
3. Identify whether the requested behavior is implemented, partially implemented, or only planned.
4. State a concise implementation plan and list affected files.
5. Implement the smallest coherent change; preserve existing working behavior.
6. Add/update validation, authorization, tests, and docs in the same change.
7. Run relevant tests, lint/build/type checks that actually exist.
8. Review the diff for security issues, secrets, unrelated modifications, and incomplete code.
9. Report exact files changed, commands run, results, and remaining risks.

## 4. Non-negotiable rules

- Never invent API endpoints, model fields, dependencies, environment variable names, or deployment URLs.
- Never present a planned feature as implemented.
- Never weaken authentication, authorization, validation, or file privacy to make a demo work.
- Never allow a student to access another student's data.
- Never accept a client-supplied role as authorization evidence.
- Never expose password hashes, JWT secrets, tokens, or private resume paths/content in responses/logs.
- Never make resumes publicly accessible by default.
- Never commit `.env`, credentials, production data, or uploaded student files.
- Never silently change database schema or status enums without migration/backfill and compatibility considerations.
- Keep AI recommendations explainable and advisory; do not automate final selection.
- Do not introduce a new framework, service, or major dependency without documenting the reason and impact.
- Do not rewrite unrelated modules or perform broad formatting churn.

## 5. Implementation expectations

### Backend
- Follow existing CommonJS conventions unless a deliberate migration is approved.
- Keep routes thin and separate middleware/controllers/models.
- Use async/await with safe error handling.
- Validate body, params, query, and file inputs at the server boundary.
- Enforce role and resource ownership at every protected endpoint.
- Use database constraints/indexes for critical uniqueness.
- Return consistent HTTP status codes and safe error messages.

### Frontend (when added)
- Use the approved React/Tailwind setup and design tokens.
- Build accessible reusable components and feature-oriented modules.
- Keep API configuration centralized.
- Implement loading, empty, success, validation, and failure states.
- Test responsive layouts and keyboard accessibility.
- Do not put secret keys or privileged logic in browser code.

### AI/resume processing (when added)
- Minimize data sent to the model/service.
- Use authenticated service-to-service communication.
- Record model/algorithm version and inputs needed for reproducibility.
- Explain matched/missing skills and uncertainty.
- Provide human correction/review.
- Never change application status automatically based solely on a score.

## 6. Completion report format

At the end of every implementation task, report:

- **Implemented:** behavior now available.
- **Files changed:** exact repository paths.
- **Security:** authorization, validation, and privacy controls added/verified.
- **Tests run:** exact commands and actual outcomes.
- **Not tested:** anything not executed.
- **Remaining work:** known gaps, migration/deployment steps, or follow-up tasks.

Do not say "production ready", "fully tested", or "all done" unless supported by concrete verification.

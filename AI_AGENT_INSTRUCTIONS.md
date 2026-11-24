# AI Coding Agent Instructions

> Read this file before changing code. These rules apply to coding agents, IDE copilots, autonomous agents, and human contributors using AI assistance.

## 1. Project identity

Build a secure, responsive, role-aware college placement portal. Core actors are students and placement administrators. Core domains are authentication, student profiles, resumes, jobs, eligibility, applications, reporting, and notifications. Resume parsing and explainable AI matching are later enhancements. Final placement decisions remain human-controlled.

## 2. Repository facts

- Backend is in `server/`.
- Runtime: Node.js; module system: CommonJS.
- HTTP framework: Express 5.
- Persistence: MongoDB via Mongoose.
- Authentication dependencies: bcryptjs and jsonwebtoken.
- Upload dependency: Multer.
- Existing route groups: auth, student, jobs, applications.
- Existing Mongoose models: User, StudentProfile, Job, Application.
- React + Tailwind frontend is planned; do not assume it exists.
- Python AI service is planned; framework is not yet selected.
- Current npm test script is a placeholder and fails intentionally until replaced.
- Current Express app exposes `/uploads` as static. Treat this as a security gap; do not add real confidential resumes to public storage.

Source code and lockfiles override stale planning documents. If branch contents differ, inspect the current branch first.

## 3. Mandatory workflow

1. Read this file and relevant planning docs.
2. Inspect current branch, git status, tree, package scripts, affected source, and tests.
3. Identify what is implemented, partial, planned, and missing.
4. Restate requested behavior and acceptance criteria.
5. Plan the smallest safe set of file changes.
6. Check API, schema, role, privacy, and migration impacts.
7. Implement server-side validation and authorization first.
8. Add tests for happy path, invalid input, unauthorized access, boundary cases, and failure behavior.
9. Update docs and examples in the same change.
10. Run only commands that exist; add test/lint scripts deliberately when required.
11. Review diff for secrets, generated noise, regressions, and incomplete TODOs.
12. Report exact files, commands, outcomes, and unresolved work.

## 4. Non-negotiable restrictions

- Never invent endpoints, schemas, fields, dependency versions, environment variable names, deployment URLs, or test results.
- Never label planned features as implemented.
- Never allow public registration to assign admin/company role.
- Never trust client-supplied role, owner ID, student ID, or creator ID.
- Never weaken auth, validation, file privacy, or rate limits to make a demo work.
- Never expose password hashes, tokens, private resume URLs/keys, resume text, or stack traces.
- Never serve confidential resumes from a public static directory.
- Never commit .env, API keys, credentials, student records, real resumes, database dumps, or generated build output.
- Never make AI scores automatically select/reject students.
- Never change schema/status enums without compatibility, index/backfill, and rollback planning.
- Never silently rewrite unrelated modules or replace architecture wholesale.
- Never claim tests/build/security scans passed unless executed and results observed.

## 5. Implementation rules

### Backend
- Preserve CommonJS unless migration is explicitly approved.
- Keep routes thin and separate controllers, models, and domain services.
- Validate every input boundary and whitelist update fields.
- Enforce role and ownership for every protected resource.
- Handle duplicate key, cast, and database errors safely.
- Use atomic updates for application transitions.
- Use private storage and authorized resume access.
- Keep API response shape stable and documented.

### Frontend (when introduced)
- Follow approved Figma tokens and UI_UX_GUIDELINES.md.
- Organize by feature; build reusable accessible components.
- Centralize API client, auth handling, and errors.
- Never put privileged secrets in client bundle.
- Implement loading, empty, validation, error, and success states.
- Test mobile/tablet/desktop and keyboard interaction.

### AI and resume processing (when introduced)
- Minimize personal data sent to processing service.
- Authenticate service-to-service calls.
- Validate input/output schemas and file resource limits.
- Record parser/model/algorithm version and timestamps.
- Return evidence, matched/missing skills, uncertainty, and limitations.
- Allow user correction and human review.
- Evaluate accuracy and bias before release.
- Do not train on student data without approved policy and consent/legal basis.

## 6. Definition of done

A change is complete only when:
- acceptance criteria are met,
- server-side validation and authorization are present,
- tests cover positive and negative cases,
- schema/index/migration impact is addressed,
- privacy/security review is complete,
- UI is responsive/accessibility-aware where applicable,
- docs and API contracts are updated,
- actual commands/results are reported,
- no secrets or unrelated changes are present.

## 7. Required completion report

Use this structure in every implementation handoff:

### Implemented
What behavior is now available and what remains planned.

### Files changed
Exact paths and concise purpose.

### API/database impact
Endpoints, payloads, fields, indexes, migration/backfill, compatibility.

### Security and privacy
Authentication, authorization, ownership, validation, sensitive data handling.

### Tests and verification
Exact commands and observed pass/fail output. Explicitly state what was not run.

### Remaining work / risks
Known limitations, deployment steps, manual actions, and follow-up milestones.

## 8. Clarification rule

Ask one focused question only when a missing product/policy decision blocks safe implementation. Otherwise choose the smallest reversible default, document the assumption, and proceed without inventing business policy.

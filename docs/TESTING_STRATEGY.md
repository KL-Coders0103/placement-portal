# Placement Portal — Testing Strategy

**Status:** Project-wide test baseline  
**Scope:** Web, API, worker, MongoDB, Redis, private storage and integrations

## 1. Purpose and principles

Testing verifies business correctness, tenant isolation, privacy, reliability and usability. A page rendering or endpoint returning 200 does not make a feature complete.

- Test success and failure paths.
- Treat backend validation and authorization as authoritative.
- Use isolated synthetic data.
- Test concurrency, idempotency and boundary times.
- Never use production credentials or real student records in automated tests.
- Keep evidence, known limitations and regression cases in the tracker.

## 2. Test levels

### Static and quality checks
TypeScript typecheck, ESLint, formatting, dependency/lockfile validation, secret scan, schema/index validation, OpenAPI drift check and production builds.

### Unit tests
Eligibility policy and reason codes; profile completeness; application deadline; state transition map; permission policies; DTO redaction; invitation expiry; token rotation; timezone conversion; report calculations; notification deduplication.

### Integration tests
MongoDB repository queries and indexes; replica-set transaction behavior; auth/session persistence; membership resolution; application uniqueness; transition history; outbox creation; resume metadata and signed access; BullMQ retries; export generation and audit.

### API tests
Every endpoint's method, authentication, active membership, permission, tenant/company/owner/assignment scope, validation, safe DTO, error code, pagination and side effects. Unauthorized requests must not mutate data.

### Frontend component tests
Forms, validation, loading/empty/error/forbidden states, responsive navigation, permission-aware menus, tables, status timeline, upload progress, confirmation dialogs, keyboard and screen-reader behavior.

### End-to-end tests
- Student activation → profile → verification → resume → opportunity → eligibility → application → timeline.
- Employer application → admin approval → recruiter invitation → opportunity draft → admin review/publish → applicant review.
- Placement admin creates drive → stages → interview → offer → candidate response.
- Reviewer sees assigned records only.
- Leadership sees aggregate reports but not private student documents.
- Export request → permission check → generated file → expiry/access control.

## 3. Test data strategy

Seed Institution A and Institution B; multiple cohorts/programs; students in same and different institutions; two companies and recruiters; placement admin, reviewer, director and platform operator. Include active, pending, suspended and revoked memberships. Use fake names, emails, academic data and document files.

Tests must prove cross-boundary denial, not merely successful same-tenant access. Reset isolated data between suites. Never connect tests to developer or production databases.

## 4. Critical invariants

1. Normalized email is unique.
2. Membership context must belong to authenticated user.
3. Student can access only own profile/resumes/applications.
4. Recruiter can access only own company and authorized opportunity applicants.
5. Placement reviewer can access only assigned records unless broader permission exists.
6. Only approved opportunities can be published.
7. One application exists per student/opportunity.
8. Applications cannot be submitted after close/deadline.
9. Client cannot assign role, tenant, owner, actor or status.
10. Every consequential status transition appends immutable history.
11. Eligibility uses recorded policy/profile versions.
12. Notification retries do not create duplicate user events.
13. File download is blocked until scan-clean and authorized.
14. AI cannot mutate application decisions or status.

## 5. Concurrency and idempotency tests

- Two simultaneous applications for the same student/opportunity.
- Two reviewers transition one application from the same expected status.
- Opportunity closes while application submit is in progress.
- Company membership is revoked during recruiter action.
- Duplicate queue delivery for one outbox event.
- Repeated invitation acceptance and password reset token use.
- Export retry and cancellation.
- Simultaneous interview reschedule requests.

Assert database invariants, not just HTTP responses.

## 6. Security test matrix

For every protected route test: unauthenticated, expired session, wrong role, wrong institution, wrong company, wrong owner, unassigned reviewer, suspended user, missing permission, injected protected field, invalid ObjectId, oversized payload and valid permitted access.

## 7. Performance and reliability

Measure common dashboard, opportunity search and application list queries with representative data. Check index use and pagination. Load-test login, opportunity browsing, application submission and report generation. Exercise Mongo/Redis outage, worker restart, email provider timeout, storage failure and retry exhaustion. Establish numeric targets only after expected institution/user volume and SLO are approved.

## 8. CI pipeline

On pull request: install locked dependencies; format/lint; typecheck; unit tests; integration tests with isolated Mongo replica set and Redis; API contract checks; web/API/worker builds; dependency and secret scans. Protected branch deploys to staging, runs smoke/E2E and requires production approval.

## 9. Defect severity

- Critical: cross-tenant exposure, privilege escalation, private file exposure, data corruption or false placement outcome.
- High: blocked core workflow, incorrect eligibility, duplicate application or incorrect recruitment state.
- Medium: degraded feature with workaround.
- Low: cosmetic/non-blocking issue.

Critical/high defects block release.

## 10. Release gates

Acceptance criteria pass; negative authorization tests pass; schema/index impact reviewed; migration/backfill and rollback tested; audit and notification behavior verified; accessibility/responsive QA complete; security scans reviewed; monitoring and recovery tested; known issues documented.

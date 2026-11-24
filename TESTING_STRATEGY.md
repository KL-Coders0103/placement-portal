# Testing Strategy and Quality Plan

## 1. Current state

The current `server/package.json` test command is a placeholder: it prints “Error: no test specified” and exits with code 1. No real test framework is configured in the current manifest. Select and configure a test runner before reporting automated test coverage.

## 2. Quality objectives

- Prove correct business behavior and data integrity.
- Prove unauthorized users cannot access other users' records.
- Verify API contracts and consistent errors.
- Prevent duplicate applications and invalid status transitions.
- Protect resume upload/download paths.
- Validate responsive and accessible user journeys when frontend exists.
- Verify AI output quality and fairness before enabling recommendations.

## 3. Test levels

### Unit tests
- Password validation/hash verification wrappers.
- Email normalization and field validators.
- Eligibility rules and boundary conditions.
- Application state machine and transition policy.
- Resume file allowlist/size/content validation.
- Skill normalization and matching score calculations.
- Pagination/filter parsing.

### Integration tests
- Express routes + middleware + controllers + isolated MongoDB.
- Registration/login and JWT authorization.
- Student profile CRUD and ownership.
- Job create/list/detail/close.
- Apply, duplicate index, list own applications, admin status update.
- Resume upload, private retrieval, deletion and cleanup.
- Audit history consistency.

### API contract tests
- Method/path, auth requirements, request schema, response envelope, status code, error code, pagination, and multipart contract.
- Compare implementation against API_SPECIFICATION.md.

### Frontend tests (future)
- Component behavior and form validation.
- Keyboard and screen-reader semantics.
- Loading, empty, success, and failure states.
- API error mapping and retry behavior.
- Responsive breakpoints and no horizontal overflow.

### End-to-end tests (future)
1. Student registers/logs in.
2. Completes profile and uploads resume.
3. Admin creates/publishes a job.
4. Student checks eligibility and applies.
5. Admin reviews and changes status.
6. Student sees status/history.

### Security tests
JWT tampering/expiry, role escalation, IDOR, NoSQL injection, mass assignment, duplicate races, malicious/oversized uploads, path traversal, CORS, rate limits, secret leaks, and AI prompt/data isolation.

### Performance/reliability tests
Load tests for login, job search, application submission; concurrent duplicate application attempts; database outage; AI timeout; queue retries; file parser resource exhaustion.

## 4. Critical test matrix

| ID | Scenario | Expected |
|---|---|---|
| AUTH-01 | Valid registration | Account created, hash stored |
| AUTH-02 | Duplicate email concurrently | One account only |
| AUTH-03 | Wrong password | Generic auth failure |
| AUTH-04 | Missing/expired/tampered JWT | 401 |
| AUTH-05 | Student calls admin route | 403 |
| STU-01 | Student reads own profile | Permitted fields only |
| STU-02 | Student reads another profile | Denied/non-disclosing |
| RES-01 | Valid allowed resume | Stored privately |
| RES-02 | Oversized/malicious file | Rejected and temp file cleaned |
| RES-03 | Unauthorized resume download | Denied |
| JOB-01 | Admin creates job | Created with trusted creator |
| JOB-02 | Student creates job | Denied |
| APP-01 | Eligible student applies | One application created |
| APP-02 | Duplicate application | Unique conflict; no duplicate |
| APP-03 | Apply after deadline/closed | Rejected |
| APP-04 | Student lists own applications | Own records only |
| APP-05 | Student updates status | Denied |
| APP-06 | Invalid status transition | Conflict/business-rule error |
| AI-01 | Parser returns invalid schema | Rejected safely |
| AI-02 | Match result | Explanation/version; no auto-decision |

## 5. Test data and isolation

Use synthetic users, jobs, and dummy resumes. Never place real student records or resumes in fixtures. Use a dedicated test database and deterministic setup/teardown. Tests must not depend on live AI, email, or storage providers; mock those integrations and separately run contract tests.

## 6. CI quality gates

Pull requests should run install from lockfile, lint/format checks, unit tests, integration tests, security/dependency scan, and build checks when configured. Protect main with required reviews/checks after baseline is stable.

## 7. Test reporting

Record exact command, runtime, commit SHA, environment, test count, pass/fail/skip, flaky tests, and known limitations. Never claim “all tests passed” if a command was not run or if the configured test script is a placeholder.

## 8. Release acceptance

Critical auth/authorization, profile, job, application, and file-security tests pass; no known critical/high security issue remains; backups/restore are verified; E2E core journeys pass; test report and rollback plan are attached.

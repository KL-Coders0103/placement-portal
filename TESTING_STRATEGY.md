# Testing Strategy

## 1. Current status

The current `server/package.json` test script is a placeholder that prints an error and exits non-zero. A real automated test framework and test suite must be selected and configured. Do not report tests as passing until they have actually run.

## 2. Test levels

### Unit tests
Test isolated business rules and helpers:
- Password validation/hash comparison wrappers.
- Eligibility evaluation (when implemented).
- Application status transition rules.
- Resume file validation.
- Match score normalization/explanation (planned).

### Integration tests
Test Express routes, middleware, controllers, and MongoDB behavior:
- Registration/login/current user.
- JWT middleware and role authorization.
- Student profile ownership.
- Job lifecycle.
- Application creation, duplicate prevention, and status changes.
- Resume upload and protected retrieval.

Use an isolated test database and clean fixtures between tests.

### API contract tests
Verify HTTP method/path, request schema, response shape, status codes, authentication requirements, and error codes against API_SPECIFICATION.md.

### Frontend tests (when frontend exists)
- Component rendering and form validation.
- Accessible labels and keyboard interaction.
- Loading, success, empty, and error states.
- Responsive layouts at supported breakpoints.
- API integration using mocked network responses for deterministic tests.

### End-to-end tests
Exercise complete user journeys:
1. Student registration/login.
2. Student profile completion.
3. Admin creates and opens a job.
4. Student discovers and applies to the job.
5. Admin reviews and updates the application.
6. Student sees updated status.

### Security tests
- Missing/expired/tampered JWT.
- Role escalation and unauthorized admin access.
- Horizontal access across student IDs.
- NoSQL injection and mass assignment.
- Duplicate account/application.
- Upload size/type/content/path checks.
- CORS, rate limit, and safe error output.

## 3. Test data

Use synthetic test identities and resumes only. Never copy production student records or resumes into local/CI fixtures. Keep secrets and database credentials in CI secret storage.

## 4. Critical test cases

| ID | Scenario | Expected result |
|---|---|---|
| AUTH-01 | Register valid user | Account created; password is hashed |
| AUTH-02 | Register duplicate email | Conflict/validation response; no duplicate |
| AUTH-03 | Login wrong password | Generic 401; no token issued |
| AUTH-04 | Access protected route without token | 401 |
| AUTH-05 | Student calls admin route | 403 |
| STU-01 | Student reads own profile | 200 with permitted fields |
| STU-02 | Student reads another profile | 403 or non-disclosing 404 |
| FILE-01 | Upload allowed resume within limit | Accepted and stored privately |
| FILE-02 | Upload oversized/disallowed file | Rejected; no accessible orphan |
| JOB-01 | Student lists open jobs | Only published/open opportunities according to policy |
| APP-01 | Eligible student applies | Application created |
| APP-02 | Same student applies twice | Duplicate prevented |
| APP-03 | Apply to closed job | Rejected |
| APP-04 | Student lists applications | Only own records returned |
| APP-05 | Unauthorized status update | Rejected |
| AI-01 | Match result generated (future) | Explanation and version included; no auto-decision |

## 5. Test environment and commands

- Configure a separate test MongoDB database.
- Add test scripts to `server/package.json` only after choosing the framework.
- Provide deterministic setup/teardown.
- Run tests in CI on pull requests.
- Keep a small end-to-end smoke test for deployed staging.

## 6. Acceptance criteria

- Critical authentication/authorization and application flows have repeatable automated coverage.
- Negative tests prove that unauthorized access is blocked.
- Tests do not rely on real student data or external AI availability.
- Flaky tests are fixed or explicitly quarantined with ownership.
- A release report records command, environment, pass/fail counts, and known limitations.

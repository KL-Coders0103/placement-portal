# User Stories

## Actors

- **Student:** authenticated learner applying for placement opportunities.
- **Placement admin:** staff member managing placement operations.
- **System:** API and background processing components.
- **Company representative:** future actor, not part of the initial confirmed implementation.

## Student stories

### STU-01 — Create an account
As a student, I want to register so that I can access placement services.

**Acceptance criteria**
- Required fields are validated on the server.
- Email uniqueness is enforced.
- Password is securely hashed.
- The response does not expose password/hash data.

### STU-02 — Sign in
As a student, I want to log in so that I can use protected portal features.

**Acceptance criteria**
- Valid credentials return the configured authentication response.
- Invalid credentials return a generic authentication failure.
- Tokens are validated on protected routes.

### STU-03 — View and update my profile
As a student, I want to manage my academic and contact details so that placement records remain accurate.

**Acceptance criteria**
- A student can read/update their own profile.
- Another student's identifier cannot be used to bypass ownership.
- Inputs are validated and normalized.

### STU-04 — Upload a resume
As a student, I want to upload my resume so that placement staff can review my qualifications.

**Acceptance criteria**
- Allowed file types and size are enforced.
- Upload errors are clear and do not leave orphaned data.
- Resume access is restricted to its owner and authorized staff.

### STU-05 — Discover jobs
As a student, I want to browse open opportunities so that I can find suitable roles.

**Acceptance criteria**
- Closed jobs are clearly distinguished or excluded from open listings.
- Job detail contains role and eligibility information.
- List endpoints support pagination/filtering as data grows.

### STU-06 — Apply to a job
As an eligible student, I want to submit an application so that I can be considered.

**Acceptance criteria**
- The job exists and is open.
- Eligibility is evaluated where configured.
- Duplicate applications are prevented.
- Successful submission returns a stable application identifier/status.

### STU-07 — Track my applications
As a student, I want to view my application statuses so that I know the progress of each application.

**Acceptance criteria**
- Only the authenticated student's applications are returned.
- Status and last-updated time are visible.
- Empty state is provided for students with no applications.

### STU-08 — Understand my match
As a student, I want to see why a job matches my profile so that I can improve my skills.

**Acceptance criteria**
- Planned match output includes matched and missing skills.
- Score is labelled as advisory.
- Student can correct extracted profile details.

## Placement administrator stories

### ADM-01 — Manage student records
As an administrator, I want to view student placement records so that I can support recruitment workflows.

**Acceptance criteria**
- Only authorized staff can access administrative lists.
- Sensitive fields are minimized in list responses.
- Administrative access is logged where appropriate.

### ADM-02 — Publish a job
As an administrator, I want to create and publish a job so that eligible students can discover it.

**Acceptance criteria**
- Required job fields are validated.
- Eligibility criteria are stored in a structured format.
- Only authorized staff can open or close a job.

### ADM-03 — Review applicants
As an administrator, I want to see applicants for a job so that I can evaluate candidates.

**Acceptance criteria**
- Applicant list is scoped to the requested job.
- Access to resume data is checked separately.
- Lists are paginated and filterable.

### ADM-04 — Change application status
As an administrator, I want to record an application outcome so that students and staff see consistent progress.

**Acceptance criteria**
- Only permitted roles can change status.
- Only valid status transitions are accepted.
- Actor and timestamp are recorded.

### ADM-05 — Review AI recommendations
As an administrator, I want understandable match evidence so that I can prioritize review without delegating final decisions to a model.

**Acceptance criteria**
- Recommendation factors and model version are available.
- No AI recommendation changes status automatically.
- Human decision is recorded independently.

## System/operator stories

### OPS-01 — Configure secrets safely
As an operator, I want secrets to be supplied through environment configuration so that credentials are not committed.

### OPS-02 — Recover from failure
As an operator, I want database errors and service failures to be observable so that I can diagnose and recover safely.

### OPS-03 — Verify releases
As a maintainer, I want automated tests for critical user journeys so that regressions are detected before deployment.

## Cross-cutting definition of done

A story is done only when implementation, server-side authorization, validation, meaningful error states, tests, documentation, and responsive/accessibility behavior (where UI exists) are complete.

# Project Requirements

## 1. Purpose

Build a reliable college placement portal that reduces manual coordination between students and the placement cell. The platform should organize student information, job opportunities, eligibility review, applications, and selection status. Resume intelligence and AI-based matching are planned enhancements.

## 2. Stakeholders and actors

| Actor | Goal |
|---|---|
| Student | Maintain a profile, upload a resume, discover opportunities, apply, and follow application progress |
| Placement administrator | Maintain student/job data, review applicants, manage placement workflows, and publish outcomes |
| Company representative | Potential future actor for submitting vacancies and reviewing approved candidate lists |
| System operator | Configure the service, protect data, monitor availability, and maintain backups |

Company access is a future scope item unless explicitly implemented later.

## 3. Functional requirements

### Identity and access

- FR-AUTH-01: Users can register with required identity and account fields.
- FR-AUTH-02: Users can log in using valid credentials.
- FR-AUTH-03: Passwords must be stored as salted hashes, never plaintext.
- FR-AUTH-04: Authenticated requests can identify the current user.
- FR-AUTH-05: Protected operations enforce role/ownership authorization on the server.
- FR-AUTH-06: Invalid credentials, invalid tokens, and unauthorized roles return consistent errors.

### Student profile and resume

- FR-STU-01: A student can view and update their own profile.
- FR-STU-02: A student can maintain academic details relevant to eligibility.
- FR-STU-03: A student can upload a supported resume file subject to size/type limits.
- FR-STU-04: A student can view resume metadata and extracted skills when extraction is implemented.
- FR-STU-05: Students cannot read or modify another student's private profile or resume without explicit administrative authorization.

### Jobs and eligibility

- FR-JOB-01: Authorized placement staff can create and maintain job postings.
- FR-JOB-02: Students can browse open jobs and view job details.
- FR-JOB-03: A job can describe role, organization, location, description, skills, deadline, and eligibility criteria.
- FR-JOB-04: The system should determine eligibility from documented criteria when that feature is implemented.
- FR-JOB-05: Closed or expired opportunities cannot accept new applications.

### Applications

- FR-APP-01: An eligible student can apply to an open job.
- FR-APP-02: The system prevents duplicate applications for the same student/job pair.
- FR-APP-03: Students can see their own application history and status.
- FR-APP-04: Authorized staff can review applicants and change status.
- FR-APP-05: Status transitions are validated and auditable.

### Placement administration

- FR-ADM-01: Authorized administrators can view and manage student records according to least privilege.
- FR-ADM-02: Authorized administrators can create, update, open, and close jobs.
- FR-ADM-03: Authorized administrators can review applications for a job.
- FR-ADM-04: Selection decisions and status changes are attributable to an authenticated administrator.

### AI-assisted matching (planned)

- FR-AI-01: Extract skills and relevant resume data from supported documents.
- FR-AI-02: Compare a student's skills/profile with a job's requirements.
- FR-AI-03: Present match scores with matched and missing skill explanations.
- FR-AI-04: Preserve human review; AI output must not silently make final hiring decisions.
- FR-AI-05: Display confidence/limitations and allow corrections to extracted profile data.

## 4. Non-functional requirements

- NFR-SEC-01: Enforce authentication, authorization, input validation, and safe error responses.
- NFR-SEC-02: Use HTTPS in deployed environments and protect secrets through environment configuration.
- NFR-SEC-03: Restrict resume file type, size, storage access, and download authorization.
- NFR-PRIV-01: Collect only data needed for placement workflows and restrict access by role.
- NFR-REL-01: Handle database/server failures without returning misleading success responses.
- NFR-PERF-01: Paginate potentially large student, job, and application lists.
- NFR-UX-01: Provide clear loading, empty, success, and error states.
- NFR-A11Y-01: Support keyboard navigation, sufficient contrast, semantic labels, and accessible forms.
- NFR-MAINT-01: Keep routes, controllers, models, and middleware separated; document API changes.
- NFR-OBS-01: Log operational events without logging passwords, tokens, or sensitive resume content.
- NFR-TEST-01: Cover critical authentication, authorization, upload, eligibility, and application flows.

## 5. Data quality and business rules

- Email addresses must be normalized and unique for accounts.
- Student profile ownership is tied to the authenticated account.
- Job/application references must point to existing records.
- Application creation requires an open job and eligibility confirmation once eligibility rules are active.
- A student should not apply to the same job more than once.
- Status values must come from a documented enum and legal transition rules.
- Match scores are advisory and must be traceable to the source profile, job, and model/version.

## 6. Expected outcomes

- One trusted place for student placement information.
- Fewer spreadsheet/manual coordination tasks.
- Clear visibility into jobs, applications, and selection progress.
- Safer handling of student identity and resume data.
- A foundation for transparent, human-reviewed AI recommendations.

## 7. Acceptance baseline

A release is acceptable only when all implemented user flows have role checks, validation, documented API behavior, tests, and updated docs. Features marked planned are not considered delivered until working code and tests exist.

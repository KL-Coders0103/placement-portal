# Project Requirements Specification

**Product:** AI-Powered College Placement Portal  
**Document purpose:** Define the complete functional, quality, data, security, and operational requirements.  
**Status convention:** Existing = found in current source; Planned = intended requirement not yet implemented; Proposed = recommended control requiring product approval.

## 1. Problem, goals, and outcomes

College placement workflows commonly rely on disconnected forms, spreadsheets, emails, and manual resume review. This causes duplicate data, inconsistent eligibility checks, slow shortlisting, limited student visibility, and weak auditability.

**Goals**
1. Centralize student placement profiles and resumes.
2. Maintain a trusted catalogue of placement opportunities.
3. Apply eligibility rules consistently and explain outcomes.
4. Support application submission and lifecycle tracking.
5. Give placement staff controlled applicant-review and reporting tools.
6. Introduce resume parsing and AI-assisted matching with explainability and human oversight.

**Non-goals for initial release:** automated hiring/rejection, public resume directories, payroll, attendance/HR management, payments, unrelated LMS functionality, and company self-service until separately approved.

## 2. Actors and permissions

| Capability | Student | Placement admin | Company (future) | Operator |
|---|---:|---:|---:|---:|
| Register/login | Yes | Provisioned/approved | Future | No ordinary account |
| Manage own profile | Yes | Controlled support | No | No |
| Upload/view own resume | Yes | Authorized review | No | Operational access only when required |
| Browse published jobs | Yes | Yes | Future | No |
| Create/manage jobs | No | Yes | Future scoped | No |
| Apply to jobs | Yes | No | No | No |
| Review applicants | Own status only | Yes | Future approved subset | No |
| Change application status | No | Yes | Future proposal only | No |
| Configure infrastructure | No | No | No | Yes |

Role assignment must be controlled by trusted administrative provisioning. Public registration must never allow a client to self-assign admin/company roles.

## 3. Functional requirements

### 3.1 Identity and access
- FR-IAM-01: Register accounts with validated name, normalized email, and password. (Existing route/model foundation)
- FR-IAM-02: Reject duplicate email addresses reliably, including concurrent registration attempts.
- FR-IAM-03: Hash passwords with a password-hashing algorithm; never store plaintext.
- FR-IAM-04: Authenticate credentials and issue a signed, expiring token.
- FR-IAM-05: Validate token signature, expiry, issuer/audience where configured, and active account state.
- FR-IAM-06: Enforce role authorization and resource ownership on every protected operation.
- FR-IAM-07: Provide logout/revocation strategy before production.
- FR-IAM-08: Provide safe account recovery and password change flows in a later approved phase.
- FR-IAM-09: Never return password hashes or authentication secrets.

### 3.2 Student profile
- FR-STU-01: Read and update the authenticated student's own profile.
- FR-STU-02: Maintain college, degree, branch, graduation year, CGPA, skills, experience, projects, and resume reference.
- FR-STU-03: Validate academic values, supported year ranges, string lengths, and allowed fields.
- FR-STU-04: Prevent a student from reading/updating another student's profile.
- FR-STU-05: Show profile completeness and missing placement information (frontend planned).

### 3.3 Resume lifecycle
- FR-RES-01: Accept resume uploads only for authenticated students.
- FR-RES-02: Enforce file size, extension, MIME and file-signature checks.
- FR-RES-03: Generate opaque storage names; do not trust user filenames or paths.
- FR-RES-04: Store files privately and authorize every download/delete.
- FR-RES-05: Track metadata, checksum, upload time, owner, parse status, and parser version.
- FR-RES-06: Support replace/delete and retention policy.
- FR-RES-07: Extract text/skills only after privacy, format, and parser requirements are approved.
- FR-RES-08: Let students review/correct extracted fields before using them for matching.

### 3.4 Job management
- FR-JOB-01: Admin creates, edits, publishes, closes, and archives jobs.
- FR-JOB-02: Store title, employer/company name, description, location/work mode, employment type, compensation range if supplied, required skills, experience, eligibility, deadlines, and contact/application instructions.
- FR-JOB-03: Students view only published jobs within their visibility window.
- FR-JOB-04: Job status and application deadline are enforced server-side.
- FR-JOB-05: Job changes that affect eligibility are versioned/audited.
- FR-JOB-06: Lists support pagination, search, sorting, and filters.

### 3.5 Eligibility
- FR-ELG-01: Evaluate CGPA, branch, graduation year, backlogs/arrears if policy requires, experience, and other approved criteria.
- FR-ELG-02: Represent criteria as structured validated rules, not only free text.
- FR-ELG-03: Return eligible/ineligible/needs-review plus explicit reasons.
- FR-ELG-04: Define missing-data behavior (never silently assume eligible).
- FR-ELG-05: Version rules and retain the rule version used for an application.
- FR-ELG-06: Permit authorized admin override with reason and audit event.

### 3.6 Applications
- FR-APP-01: Eligible students apply to open jobs before deadline.
- FR-APP-02: Enforce one application per student/job using a database unique constraint.
- FR-APP-03: Validate required profile/resume fields before submission.
- FR-APP-04: Let students view only their applications and status history.
- FR-APP-05: Admins view applicants for jobs they are authorized to manage.
- FR-APP-06: Validate status transitions and record actor, time, reason, and prior/new state.
- FR-APP-07: Prevent application mutation after terminal states except authorized audited correction.
- FR-APP-08: Notify students of important status changes (notification system planned).

### 3.7 Placement administration and reporting
- FR-ADM-01: Admin dashboard summarizes active jobs, applicants, status distribution, and placement outcomes.
- FR-ADM-02: Search/filter students and applications with pagination.
- FR-ADM-03: Export only authorized, minimized reports with access logging.
- FR-ADM-04: Record admin actions and provide audit trail.
- FR-ADM-05: Support academic-year/cohort boundaries and configurable placement policies.

### 3.8 AI resume intelligence and matching (planned)
- FR-AI-01: Parse supported PDF/DOCX formats with documented limitations.
- FR-AI-02: Extract skills, education, experience, projects, and certifications with source evidence.
- FR-AI-03: Normalize skill synonyms while preserving original extracted text.
- FR-AI-04: Compare profile and job requirements using a documented scoring method.
- FR-AI-05: Return score, matched skills, missing skills, evidence, model/parser version, and generated time.
- FR-AI-06: Mark stale results when profile, resume, job, or criteria changes.
- FR-AI-07: Allow manual correction and reprocessing.
- FR-AI-08: AI output is advisory; it must not autonomously reject, select, or rank students without human review and approved policy.
- FR-AI-09: Evaluate quality, bias, false positives/negatives, and cohort performance before release.

## 4. Non-functional requirements

- **Security:** HTTPS, least privilege, strong password hashing, token lifecycle, rate limiting, secure headers, private files, secret management, dependency scanning.
- **Privacy:** data minimization, purpose limitation, retention/deletion rules, access logging, consent/policy review for AI processing.
- **Reliability:** graceful database/service failure, backups, restore tests, idempotent operations where appropriate.
- **Performance:** pagination; indexed queries; bounded uploads; timeouts; async processing for expensive parsing/matching.
- **Scalability:** stateless API where practical; external/private object storage; background jobs; cache only with safe invalidation.
- **Usability:** clear validation, loading, empty, error, success, and status states.
- **Accessibility:** keyboard navigation, semantic HTML, labels, contrast, focus, screen-reader announcements.
- **Compatibility:** current supported desktop/mobile browsers; responsive layouts.
- **Maintainability:** modular routes/controllers/models/services, code review, documented contracts, reproducible setup.
- **Observability:** structured logs, correlation IDs, metrics, health/readiness checks, alerting without sensitive payloads.
- **Testability:** deterministic unit/integration/API/E2E/security tests.

## 5. Data and business rules

- Email is normalized and unique.
- User role is server-controlled.
- A student profile belongs to one user unless an approved multi-profile model is introduced.
- CGPA range and academic values must follow institution policy and be configurable.
- Job deadline, open status, and eligibility are evaluated at application time.
- Duplicate application is prevented at database level.
- Application status enum and transitions are centrally defined.
- Resume references are private and owner-bound.
- Match score stores algorithm version and input snapshot/version to support reproducibility.
- Timestamps use UTC storage and ISO-8601 API representation.

## 6. Acceptance and release criteria

A requirement is accepted only when:
1. The user journey is implemented end-to-end.
2. Server-side validation and authorization exist.
3. Positive, negative, boundary, and failure cases are tested.
4. Sensitive data is not leaked.
5. UI has responsive/accessibility states where applicable.
6. API/schema/docs are updated.
7. Logs and operational behavior are adequate.
8. Product owner approves any policy-dependent rule.

## 7. Open decisions

Confirm institutional grading scale, allowed branches, backlog policy, placement eligibility policies, company onboarding model, notification channels, resume retention duration, hosting region, file formats/limits, and AI evaluation threshold before production.

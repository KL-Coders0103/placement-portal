# Placement Portal — Security and Privacy Guidelines

**Status:** Mandatory project-wide security baseline  
**Applies to:** Web, API, worker, MongoDB, Redis, object storage and integrations

## 1. Security objectives

Protect:
- Student identity, contact details, academic records, resumes and application history.
- Employer accounts, company data and recruitment pipelines.
- Institution policies, reviewer notes, interviews and offers.
- Privileged accounts, membership/role assignments and audit history.
- Session credentials, email tokens, storage credentials and infrastructure secrets.
- Platform availability and integrity of placement outcomes.

## 2. Principles

- Enforce authorization at the API and data-access layers.
- Deny by default; least privilege for users, services and environments.
- Validate every untrusted value on the server.
- Use tenant-aware queries, field allowlists and object ownership checks.
- Keep secrets and sensitive content out of source control, browser bundles and logs.
- Audit privileged operations and consequential state transitions.
- Do not claim a control is implemented until it is tested.

## 3. Trust boundaries and threats

| Asset / threat | Required control |
|---|---|
| Student IDOR | Ownership check and scoped query |
| Cross-institution data leak | institutionId scope and isolation tests |
| Recruiter sees another company's applicants | company membership + opportunity scope |
| Privilege escalation | controlled role provisioning; server-derived permissions |
| Resume exposure | private storage, short-lived authorized download |
| Malicious upload | size/type/signature validation, quarantine and scanning |
| Credential stuffing | rate limits, generic responses, monitoring |
| Session theft/replay | short access lifetime, refresh rotation, revocation |
| NoSQL injection | schema validation and allowlisted query construction |
| Bulk data exfiltration | export permission, field allowlist, row caps, audit |
| Insider misuse | least privilege, immutable audit and time-bound access |
| AI bias/error | advisory only, evidence, versioning and human review |

Treat browser requests, cookies, headers, URL identifiers, uploaded files, email links, external provider responses and webhook-like callbacks as untrusted until validated.

## 4. Authentication

- Hash passwords with Argon2id or an approved modern password hash.
- Normalize email and enforce a unique database index.
- Use generic login/recovery responses where account enumeration is possible.
- Rate-limit login, verification, invitation acceptance and password recovery.
- Verification/reset tokens must be random, expiring, single-use and stored hashed.
- Never log passwords, OTPs, tokens or reset URLs.
- Revoke sessions after password reset, account suspension or membership removal.
- Define refresh token rotation, reuse detection, expiry and revocation policy.
- Require MFA or step-up authentication for privileged actions according to approved policy.

## 5. Authorization and tenant isolation

Every protected request must:
1. Authenticate user.
2. Resolve active membership from server-side state.
3. Confirm user and membership are active.
4. Check permission.
5. Load resource using institution/company scope.
6. Check owner, assignment, field visibility and resource state.
7. Validate allowlisted mutation fields.
8. Persist mutation and append audit/history as required.

Never trust client-supplied role, institutionId, companyId, studentId, ownerId, createdBy, verified, approved or status fields. Frontend guards are not security controls.

## 6. Resume and document security

- Private bucket/container only; public ACL disabled.
- Allowlist PDF initially unless another type is approved.
- Validate extension, MIME and file signature; enforce size/page limits.
- Generate object keys server-side; sanitize original filename for display only.
- Upload into quarantine; scan before download/preview.
- Downloads require authorization and short-lived signed URLs or API streaming.
- Do not store public URL as authority.
- Record checksum, scan status, uploader and version.
- Define retention, deletion, backup and orphan cleanup.
- Never attach resumes or academic details to email notifications.

## 7. API and browser security

Use HTTPS, restrictive CORS, secure headers, CSRF protection when cookie auth is used, request size limits, timeouts, rate limits, schema validation, safe output rendering and dependency scanning. Prevent mass assignment and unsafe Mongo operators. Avoid verbose production errors. Use secure cookie attributes where cookies are selected.

## 8. Data privacy and visibility

- Collect only data needed for placement operations.
- Explain why each sensitive field is collected and who can see it.
- Students can preview recruiter-visible profile information.
- Recruiter DTOs expose only institution-approved fields.
- Reviewer notes have explicit internal/candidate-visible classification.
- Leadership reports use aggregate data; suppress small groups where identification is possible.
- AI processing requires institution approval, minimization and appropriate notice/consent/legal basis.
- Establish retention/deletion rules for profiles, applications, resumes, offers, audit, logs and backups.

## 9. Audit and logging

Audit record fields: actor, membership, institution/company context, action, resource type/id, outcome, timestamp, requestId and allowlisted metadata/reason. Audit is append-only. Do not include passwords, tokens, full resume content or unnecessary PII. Restrict audit read access and log audit exports.

## 10. Security testing

Test unauthenticated access, wrong role, wrong institution, wrong company, wrong owner, unassigned reviewer, suspended membership, field injection, NoSQL injection, replayed token, upload spoofing, file access after revocation, duplicate application, concurrent transitions, export limits and audit creation.

## 11. Incident response

Runbooks must cover privileged account compromise, leaked resume, unauthorized export, malicious file, database exposure, token leak, provider outage and insider misuse. Include containment, session/key revocation, evidence preservation, scope assessment, notification/legal review, recovery and post-incident actions.

## 12. Release checklist

No production release until auth/session policy, endpoint permission matrix, cross-tenant tests, file access tests, secret/dependency scans, privacy/retention review, encrypted backup and restore test, audit verification, incident ownership and security review are complete.


## 13. Role and permission baseline

Roles are membership-scoped. A user can have different roles in different institutions or companies. The API must resolve the active membership and calculate permissions from current server-side membership and policy records.

| Capability | Student | Reviewer | Placement admin | Director | Company owner | Recruiter | Platform operator |
|---|---|---|---|---|---|---|---|
| Read own profile and applications | Yes | No, unless assigned | Institution scope by permission | No default | No | No | No |
| Edit own self-reported profile | Yes | No | Authorized correction only | No | No | No | No |
| Verify academic records | No | Assigned scope if granted | Institution scope | Explicit grant | No | No | No |
| Read student directory | No | Assigned scope | Institution scope | Aggregate by default | No | No | No |
| Manage institution/cohorts/policies | No | No | Explicit permission | Explicit approval scope | No | No | Tenant configuration only |
| Apply to opportunities | Own account | No | No | No | No | No | No |
| Draft company opportunity | No | No | Institution admin if granted | No | Own company | Own company if granted | No |
| Approve/publish opportunity | No | No | Institution scope | Explicit delegated approval | No | No | No |
| Read applicant pipeline | Own applications | Assigned scope | Institution scope | Aggregate by default | Own company/authorized opportunity | Own company/authorized opportunity | No |
| Transition application stage | No | Assigned permission | Institution scope | Explicit grant | No | Own opportunity and allowed stages | No |
| Schedule interviews | Own response | Assigned scope if granted | Institution scope | No default | Own company if granted | Own company/opportunity | No |
| Issue/revoke offers | No | No | Explicit institution permission | Explicit approval scope | Company scope if policy permits | Company scope if policy permits | No |
| Read placement reports | Own summary | Assigned scope | Institution scope | Institution aggregate | Own company aggregate if enabled | Own opportunity summary | Platform health only |
| Export records | No | No default | Explicit permission + audit | Aggregate-only by default | No default | No default | No student-data export by default |
| Read audit events | Own security/session view only | No default | Explicit institution permission | Explicit permission | Own company audit subset | No default | Platform security metadata |
| Manage platform tenants | No | No | No | No | No | No | Explicit platform permission |

This matrix is a baseline, not an automatic grant. Every cell marked Yes or scope-based remains subject to explicit permission assignment, active membership and resource checks. Directors and platform operators must not receive broad student-document access merely because of their title.

### 13.1 Permission naming

Use stable resource.action identifiers, for example:
- `students.read`, `students.invite`, `students.verify`, `students.update_verified`
- `companies.read`, `companies.review`, `companies.approve`, `companies.suspend`
- `opportunities.create`, `opportunities.submit`, `opportunities.approve`, `opportunities.publish`, `opportunities.close`
- `applications.read`, `applications.assign`, `applications.transition`, `applications.add_internal_note`
- `interviews.manage`, `offers.issue`, `offers.revoke`
- `reports.read`, `exports.create`, `audit.read`, `institution.settings.manage`, `platform.tenants.manage`

### 13.2 Resource and field scope

- Institution resources must be queried with the active institutionId.
- Student-owned resources must match authenticated userId.
- Company-owned resources must match an active companyMembership.
- Recruiter applicant access additionally requires an opportunity owned by that company and an allowed applicant visibility policy.
- Reviewer access requires an active assignment unless the reviewer has an explicitly broader permission.
- Response DTOs must omit fields outside the actor's visibility policy, even when the actor may read the parent resource.
- Leadership dashboards use aggregate pipelines and small-group suppression; do not fetch all student records and hide them in the browser.

### 13.3 Sensitive actions

Require explicit permission, reason where appropriate, confirmation in UI, audit event and concurrency/state validation for:
- Role/membership changes and account suspension.
- Academic verification override.
- Company approval or suspension.
- Opportunity approval, publication, closure or reopening.
- Eligibility override.
- Application stage changes and reviewer reassignment.
- Offer issue, revoke and compensation disclosure.
- Bulk import commit and data export.
- Emergency support access and retention/deletion operations.


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

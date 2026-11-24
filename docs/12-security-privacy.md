# 12 — Security, Privacy and Threat Model

## Authentication
Use Argon2id or approved modern password hashing. Short-lived access credentials; rotating, revocable refresh sessions. Browser refresh cookies are HttpOnly, Secure and SameSite as appropriate, with CSRF protection. Verify email. Reset tokens are single-use, expiring and stored hashed. Rate-limit login, registration, reset and sensitive operations. Revoke sessions on password reset, suspension or membership removal. Use MFA/step-up authentication for privileged actions where feasible.

## Authorization
Deny by default. RBAC plus institution/company/ownership/assignment checks on every API. Query resources within authorized scope. Check current membership, account state and resource status. Use field-level DTO allowlists. Prevent IDOR, mass assignment and privilege escalation. Frontend guards are not security controls.

## Resume security
Private object bucket; no public ACL or static uploads route. Allowlist PDF initially; verify extension, MIME and file signature; limit size; generate storage keys; scan/quarantine before availability. Store metadata/hash, not public URL authority. Downloads require authorization and short-lived signed URL or streaming proxy. Sanitize filenames and headers. Define retention/deletion and backup lifecycle.

## API/web protections
HTTPS, secure headers, restrictive CORS, CSRF defense, strict Zod validation, NoSQL query allowlists, safe output rendering, request/file size limits, timeouts, rate limits, safe error responses, dependency scanning and secret manager. Redact authorization, cookies, tokens, passwords, resume text and sensitive PII from logs.

## Privacy
Collect only data needed for placement. Explain purpose and visibility. Students can preview recruiter-visible profile. Recruiters see only authorized applicants and permitted fields. Leadership defaults to aggregates; suppress small groups. External AI processing requires institution approval, data minimization and appropriate notice/consent/legal basis. Retention is defined separately for accounts, profiles, applications, resumes, offers, audit, logs and backups.

## Threat controls
Cross-student read → ownership policy and IDOR tests.
Cross-company applicant access → company/opportunity scope and redacted DTO.
Public admin creation → controlled provisioning.
Malicious resume → signature validation, quarantine and malware scan.
Token replay → rotation, expiry, revocation and MFA.
NoSQL injection → schema and query allowlists.
Bulk exfiltration → export permissions, row caps, audit and rate limits.
Insider misuse → least privilege, audit and time-bound support access.
AI bias/error → advisory output, evidence, versioning and human review.
Duplicate queue execution → idempotency and dedupe.

## Audit and incidents
Record actor, membership, action, resource, outcome, timestamp, request ID and reason. Audit is append-only; never store secrets or full resume content. Runbooks cover credential compromise, exposed resume, unauthorized export, malware upload, database leak and provider outage. Include containment, revocation, evidence, notification/legal review and recovery.

## Security release gates
Endpoint authorization matrix; cross-tenant/company/student tests; secret/dependency scans; upload access tests; brute-force/rate-limit tests; encrypted backup and restore test; manual security review before production.
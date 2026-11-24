# Security, Privacy, and Data Protection Guidelines

## 1. Security objectives and threat model

Protect credentials, student identity, academic records, resumes, applications, selection decisions, and administrative actions. Assume attackers may manipulate IDs, roles, query operators, file metadata, request sizes, tokens, and AI inputs.

Primary threats: account takeover, privilege escalation, IDOR/BOLA, NoSQL injection, mass assignment, malicious uploads, public resume exposure, data scraping, token leakage, dependency compromise, insider misuse, and AI prompt/data leakage.

## 2. Identity and authentication

- Use bcryptjs with an appropriate work factor (current model uses salt rounds 10; review against deployment performance/security requirements).
- Enforce password length/strength and breached-password policy where feasible.
- Normalize email before uniqueness checks.
- Use high-entropy JWT secret from secret manager/environment.
- Set explicit token expiry, issuer, audience, and algorithm allowlist.
- Never accept `alg=none` or untrusted algorithms.
- Define refresh/revocation strategy before production.
- Rate-limit login/register and add progressive abuse controls.
- Use generic authentication failure messages.
- Do not log passwords, hashes, tokens, reset links, or secrets.

## 3. Authorization and ownership

- Authentication is not authorization.
- Role assignment is server-controlled; public registration defaults to student.
- Enforce role + resource ownership on every read, write, export, and file download.
- Never trust body/query values for `role`, `studentId`, `createdBy`, or owner.
- Students access only their own profile, resume, and applications.
- Admin routes require explicit admin authorization.
- Company role remains disabled/unimplemented until approved.
- Test horizontal and vertical privilege escalation by changing IDs and roles.

## 4. Input and database safety

- Validate body, params, query, headers, and files with allowlisted schemas.
- Reject unknown privileged fields or strip them intentionally.
- Never pass raw user objects into Mongoose update/query operators.
- Disable unsafe mass assignment; use explicit field mapping.
- Validate ObjectIds, enums, dates, numeric ranges, and string sizes.
- Escape/search user input safely; constrain regex complexity.
- Use database unique indexes for email and student/job application.
- Use atomic state transitions and handle duplicate key errors.
- Return generic production errors; log sanitized diagnostic context.

## 5. Resume and upload controls

Current Express app mounts `/uploads` statically. This is unsafe for confidential resumes and must be removed before real student data is uploaded.

Required controls:
- Allowlist supported formats; define maximum size.
- Validate extension, MIME, and file signature/content; do not trust client headers.
- Generate random storage keys; sanitize original filename for display only.
- Store in private storage outside public web root.
- Scan/quarantine suspicious files before parsing.
- Authorize downloads per owner/admin policy; use short-lived signed URLs if appropriate.
- Prevent path traversal, archive bombs, malformed documents, and parser resource exhaustion.
- Delete temp files and define replacement/deletion/retention behavior.
- Keep file bytes and extracted personal text out of logs and analytics.

## 6. API and infrastructure

- HTTPS only in production.
- Explicit CORS origin allowlist; do not use wildcard with credentials.
- Secure headers (e.g., Helmet after dependency/config review).
- Request body and upload limits, timeouts, rate limits, and concurrency limits.
- Restrict MongoDB network access; use least-privilege DB user and TLS.
- Separate environments and credentials.
- Scan dependencies and secrets in CI.
- Restrict internal AI service access and authenticate service-to-service calls.
- Use backups, encryption at rest/in transit, and restore drills.

## 7. Privacy and AI governance

- Collect only data required for placement.
- Define purpose, lawful basis/consent, retention, deletion, access, and correction policies.
- Do not use student resumes for unrelated model training without explicit approved policy.
- Minimize or de-identify data sent to AI services.
- Do not send secrets or unrelated records in prompts.
- Treat model output as untrusted; validate schemas and bound values.
- Explain factors/limitations and allow correction.
- No automatic selection/rejection from AI scores.
- Evaluate bias and performance across relevant cohorts before release.

## 8. Logging and audit

Record authentication events, role changes, job publication, application status changes, resume access, exports, eligibility overrides, and AI processing metadata. Use request/correlation IDs and UTC timestamps. Redact PII where not needed. Audit logs should be append-only to ordinary application roles.

## 9. Security verification checklist

- Missing, malformed, expired, revoked, and tampered JWT.
- Student-to-student IDOR for profiles/applications/files.
- Student role escalation to admin/company.
- Unauthorized job creation/status changes.
- Duplicate email/application races.
- NoSQL injection and mass assignment.
- MIME/extension/signature mismatch and oversized upload.
- Path traversal and unauthorized file access.
- CORS, CSRF (if cookie auth), XSS, secure headers, rate limits.
- Secret scanning, dependency audit, backup restore.
- AI data isolation, prompt injection, invalid model response.

## 10. Incident response

Maintain named owners and runbooks for credential compromise, resume exposure, database breach, malicious file, AI leakage, and service outage. Steps: contain, revoke/rotate, preserve sanitized evidence, assess impact, notify responsible stakeholders per policy/law, restore safely, remediate, and document lessons learned.

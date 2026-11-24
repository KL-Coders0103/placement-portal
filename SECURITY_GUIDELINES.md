# Security Guidelines

## 1. Security objectives

Protect student identity, academic records, authentication credentials, job/application information, and uploaded resumes. Apply least privilege and treat all client and AI-service inputs as untrusted.

## 2. Authentication

- Hash passwords with a suitable password hashing algorithm (bcryptjs is present in the current backend).
- Never store or log plaintext passwords.
- Use high-entropy JWT secrets supplied through secure environment configuration.
- Set appropriate token expiry; validate signature and expiry on every protected request.
- Do not place secrets in source code, frontend bundles, URLs, or logs.
- Plan token revocation/rotation and account recovery before production.
- Return generic login errors that do not reveal whether an account exists.

## 3. Authorization

- Enforce authorization on the server for every protected resource.
- Distinguish authentication from authorization.
- Do not accept a client-provided `role`, `studentId`, or `createdBy` as proof of permission.
- Students may access only their own profile, resumes, and applications.
- Admin permissions must be explicit and narrowly scoped.
- Company permissions, if added, must be scoped to that company's postings and approved candidate data.
- Test IDOR/BOLA cases by changing identifiers in URLs and request bodies.

## 4. Input validation

- Validate and normalize all request bodies, params, and query values.
- Whitelist allowed fields; do not spread arbitrary request objects into Mongoose updates.
- Validate ObjectIds, enum values, dates, numeric ranges, URLs, and string lengths.
- Use safe query construction; do not pass raw user-controlled MongoDB operators into queries.
- Set request body size limits and reject malformed payloads.

## 5. Resume/file upload security

- Define a strict allowlist of document formats and maximum size.
- Do not trust the filename extension or client-supplied MIME type alone.
- Generate server-side random storage names.
- Keep files in private storage; avoid public static hosting of confidential resumes.
- Verify file content where possible and scan files before processing.
- Prevent path traversal and executable content.
- Authorize every download and delete operation.
- Remove abandoned temporary files and enforce retention/deletion policies.
- Avoid putting raw resume text or file bytes into ordinary logs or analytics.

The current app mounts an `/uploads` directory as static content. Review and replace this behavior before storing real student resumes; private access control is required.

## 6. API and infrastructure

- Use HTTPS in all deployed environments.
- Configure CORS with an explicit trusted-origin allowlist; avoid unrestricted production CORS.
- Add rate limits to login, registration, upload, and expensive matching operations.
- Configure secure headers, timeouts, and request-size limits.
- Keep dependencies updated and review vulnerability advisories.
- Restrict MongoDB network access and use a least-privilege database account.
- Enable database backups and test restoration.
- Separate development, staging, and production secrets/data.

## 7. Privacy and AI

- Collect only placement-relevant data.
- Document lawful purpose, retention, deletion, and access rules for student records.
- Send the AI service only the minimum data needed.
- Do not use student resumes for unrelated model training without an approved, transparent consent/policy basis.
- Explain match factors and known limitations.
- Retain human decision-making for selection/rejection.
- Prevent cross-student data leakage in prompts, logs, caches, and model context.

## 8. Logging and audit

- Log authentication failures, administrative changes, status transitions, and sensitive file access as appropriate.
- Never log passwords, bearer tokens, signing keys, or full resume contents.
- Include correlation/request IDs and timestamps.
- Protect audit logs from ordinary user modification.

## 9. Security testing checklist

- Missing, malformed, expired, and tampered JWT.
- Student access to another student's profile/application/resume.
- Student attempting admin endpoint or role escalation during registration.
- Duplicate account/application submissions.
- Malicious/oversized upload and MIME/extension mismatch.
- Path traversal and unauthorized file retrieval.
- NoSQL injection and mass-assignment attempts.
- Login/upload rate limiting.
- CORS and error response behavior.
- Secret scanning and dependency vulnerability checks.

## 10. Incident response

Maintain a process to revoke compromised credentials/tokens, disable affected accounts, rotate secrets, preserve relevant logs, notify responsible stakeholders, assess exposed student data, and restore from known-good backups.

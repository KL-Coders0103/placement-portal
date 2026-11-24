# 09 — API Specification

## Contract
Base path /api/v1; HTTPS in deployed environments; JSON except multipart/upload handshakes. IDs are ObjectId strings; timestamps ISO-8601 UTC. Validate params, query, body and files. Return safe DTOs, never raw database documents.

Success: { success: true, data: {}, meta: {} }.
Error: { success: false, error: { code, message, details: [] }, requestId }.
Use cursor pagination and allowlisted filters/sorts. Never accept client authority fields such as role, institutionId, companyId, studentId, createdBy or status.

## Authentication
POST /auth/register/student — invite/policy controlled.
POST /auth/register/employer — pending company application.
POST /auth/verify-email — one-time token.
POST /auth/login — public, rate limited.
POST /auth/refresh — rotating refresh session.
POST /auth/logout and /auth/logout-all — revoke sessions.
POST /auth/forgot-password and /auth/reset-password — one-time expiring flow.
GET /auth/me — safe identity and memberships.

## Student
GET/PATCH /student/profile — own profile only.
GET /student/profile/preview — own recruiter-visible preview.
GET /student/resumes; POST /student/resumes/upload-url; POST /student/resumes/complete; DELETE /student/resumes/:resumeId.
GET /student/opportunities and GET /student/opportunities/:id.
GET /student/opportunities/:id/eligibility.
POST /student/opportunities/:id/applications.
GET /student/applications and GET /student/applications/:id.
POST /student/applications/:id/withdraw.

## Placement admin
GET/POST /admin/students; GET/PATCH /admin/students/:id; POST /admin/students/:id/verify.
GET/POST /admin/companies; POST /admin/companies/:id/decision.
GET/POST /admin/opportunities; GET/PATCH /admin/opportunities/:id; POST /admin/opportunities/:id/decision; POST /admin/opportunities/:id/publish; POST /admin/opportunities/:id/close.
GET/POST /admin/drives; PATCH /admin/drives/:id.
GET /admin/applications; GET /admin/applications/:id; POST /admin/applications/:id/transitions; POST /admin/applications/:id/assign-reviewer.
GET/POST /admin/announcements; GET /admin/reports/placements; POST /admin/exports; GET /admin/audit-events.

## Employer
GET/PATCH /employer/company.
GET/POST /employer/team/invitations; POST /employer/team/invitations/:id/accept.
GET/POST /employer/opportunities; GET/PATCH /employer/opportunities/:id; POST /employer/opportunities/:id/submit.
GET /employer/opportunities/:id/applicants; GET /employer/applications/:id; POST /employer/applications/:id/transitions.
GET/POST /employer/interviews.

## Shared
GET /notifications; PATCH /notifications/:id/read; POST /notifications/read-all.
GET /dashboard/summary.
GET /health/live; GET /health/ready.

## Example application submission
Request body may include resumeDocumentId and optional coverLetter. Server derives studentId, institutionId, companyId, opportunity and eligibility. Client cannot choose application status. Validate open window, membership, cohort, eligibility, profile requirements and unique application constraint.

## Example status transition
{ toStatus: "SHORTLISTED", reason: "Assessment criteria met", expectedCurrentStatus: "UNDER_REVIEW" }
Server validates current state, actor scope and allowed transition, appends immutable event, updates projection and emits outbox event.

## Errors
200/201/202/204 success; 400 validation; 401 unauthenticated; 403 forbidden; 404 not found/not visible; 409 conflict; 413 too large; 415 unsupported media; 422 business rule; 429 rate limited; 500 internal; 503 dependency unavailable. Stable codes include AUTH_REQUIRED, ACCOUNT_SUSPENDED, MEMBERSHIP_REQUIRED, FORBIDDEN, RESOURCE_NOT_FOUND, DUPLICATE_APPLICATION, APPLICATION_CLOSED, INELIGIBLE, INVALID_TRANSITION and VERSION_CONFLICT.

OpenAPI and contract tests must be generated/updated with implementation. Proposed endpoints are not implemented until code and tests exist.
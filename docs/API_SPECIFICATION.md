# Placement Portal — API Specification

**Status:** Proposed API contract baseline  
**Framework:** Express 5 + TypeScript  
**Base path:** `/api/v1`  
**Content:** JSON except approved multipart/upload operations  
**Authentication:** Bearer access credential; refresh transport is an open decision

> This document defines intended API behavior. It is not evidence that routes are implemented. Keep OpenAPI and tests synchronized with delivered endpoints.

## 1. API principles

1. All frontend clients communicate through the API; never connect directly to MongoDB.
2. Validate params, query, body and files on the server.
3. Enforce authentication, membership, permissions, tenant/resource scope and business rules in services/policies.
4. Return safe DTOs, never raw Mongoose documents.
5. Use pagination and allowlisted filters/sorts for collections.
6. Use request IDs for support and tracing.
7. Use idempotency or conditional updates for retry-sensitive commands.
8. Keep sensitive data out of URLs, errors and logs.
9. All state-changing routes must validate current state and actor permission.
10. Document implemented endpoints with OpenAPI.

## 2. Common conventions

Headers:
- `Authorization: Bearer <access-token>`
- `Content-Type: application/json`
- `Accept: application/json`
- `X-Request-Id: <optional-client-id>`
- `Idempotency-Key: <key>` for selected retry-sensitive commands
- `X-Active-Membership: <membership-id>` may select context only; server validates it.

Success:
```json
{ "success": true, "data": {}, "meta": { "requestId": "..." } }
```

Paginated:
```json
{ "success": true, "data": [], "meta": { "requestId": "...", "pagination": { "nextCursor": null, "hasMore": false } } }
```

Error:
```json
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Request could not be processed", "details": [] }, "meta": { "requestId": "..." } }
```

Use stable error codes and avoid disclosing whether a private resource exists where that would enable enumeration.

## 3. Authentication and identity

| Method | Route | Purpose |
|---|---|---|
| POST | /auth/register/student | Invitation/policy-controlled student activation |
| POST | /auth/register/employer | Submit company/employer application |
| POST | /auth/verify-email | Consume one-time verification token |
| POST | /auth/login | Authenticate; rate limited |
| POST | /auth/refresh | Rotate session credentials |
| POST | /auth/logout | Revoke current session |
| POST | /auth/logout-all | Revoke all user sessions |
| POST | /auth/forgot-password | Start generic recovery response |
| POST | /auth/reset-password | Consume one-time reset token |
| GET | /auth/me | Safe user and membership summary |
| GET | /auth/sessions | List current user's sessions |
| DELETE | /auth/sessions/:sessionId | Revoke owned session |

Public input must never set role, institutionId, companyId, verification state or permission values.

## 4. Student routes

- GET/PATCH `/student/profile` — own profile only.
- GET `/student/profile/preview` — recruiter-visible preview of own profile.
- POST `/student/profile/review-requests` — request correction of verified facts.
- GET `/student/resumes` — own resume metadata.
- POST `/student/resumes/upload-intents` — authorize private upload.
- POST `/student/resumes/:resumeId/complete` — complete and queue scanning.
- GET `/student/resumes/:resumeId/download` — authorized download.
- DELETE `/student/resumes/:resumeId` — request permitted deletion.
- GET `/student/opportunities` and GET `/student/opportunities/:id` — visible published opportunities.
- GET `/student/opportunities/:id/eligibility` — evaluate with reason codes.
- POST `/student/opportunities/:id/applications` — submit application.
- GET `/student/applications` and GET `/student/applications/:id` — own applications.
- POST `/student/applications/:id/withdraw` — policy-controlled withdrawal.
- GET `/student/interviews`, GET `/student/offers` — own recruitment events.

## 5. Placement administration routes

- GET/POST `/admin/students`; GET/PATCH `/admin/students/:id`; POST `/admin/students/:id/verify`.
- POST `/admin/students/imports`; GET `/admin/imports/:id`; POST `/admin/imports/:id/commit`.
- GET/POST `/admin/companies`; POST `/admin/companies/:id/decision`.
- GET/POST `/admin/opportunities`; GET/PATCH `/admin/opportunities/:id`; POST `/admin/opportunities/:id/decision`; POST `/admin/opportunities/:id/publish`; POST `/admin/opportunities/:id/close`.
- GET/POST `/admin/drives`; PATCH `/admin/drives/:id`; manage drive stages.
- GET `/admin/applications`; GET `/admin/applications/:id`; POST `/admin/applications/:id/transitions`; POST `/admin/applications/:id/assign-reviewer`.
- GET/POST `/admin/interviews`; GET/POST `/admin/announcements`.
- GET `/admin/reports/placements`; POST `/admin/exports`; GET `/admin/audit-events`.
- GET/PATCH `/admin/settings/policies` — versioned policy management, permission restricted.

## 6. Employer routes

- GET/PATCH `/employer/company`.
- GET/POST `/employer/team/invitations`; POST `/employer/team/invitations/:id/accept`.
- GET/POST `/employer/opportunities`; GET/PATCH `/employer/opportunities/:id`; POST `/employer/opportunities/:id/submit`.
- GET `/employer/opportunities/:id/applicants`; GET `/employer/applications/:id`; POST `/employer/applications/:id/transitions`.
- GET/POST `/employer/interviews`; POST `/employer/interviews/:id/respond`.

All employer queries must be scoped to authenticated company membership and authorized opportunity. DTOs must apply recruiter-visible field policy.

## 7. Shared routes

- GET `/notifications`; PATCH `/notifications/:id/read`; POST `/notifications/read-all`.
- GET `/dashboard/summary` — role-aware summary.
- GET `/health/live`; GET `/health/ready`.

## 8. Example application submission

Request:
```json
{ "resumeDocumentId": "object-id", "coverLetter": "Optional text" }
```

Server derives student, institution, opportunity and company from trusted records. It validates membership, published/open state, cohort visibility, deadline, policy version, eligibility, profile requirements, resume ownership/scan status and duplicate constraint. It creates application + snapshots + initial status event + outbox notification in a transaction where supported.

## 9. Example transition

```json
{ "toStatus": "SHORTLISTED", "expectedCurrentStatus": "UNDER_REVIEW", "reason": "Review completed" }
```

Server validates role, scope, current status, allowed transition, required reason and version. It appends immutable history and audit/outbox events. The client cannot set actor, institution, company or current status.

## 10. Status codes and error codes

HTTP: 200/201/202/204 success; 400 malformed/validation; 401 unauthenticated; 403 forbidden; 404 missing/not visible; 409 conflict; 413 too large; 415 unsupported media; 422 business rule; 429 throttled; 500 internal; 503 dependency unavailable.

Stable codes include AUTH_REQUIRED, ACCOUNT_SUSPENDED, MEMBERSHIP_REQUIRED, FORBIDDEN, RESOURCE_NOT_FOUND, DUPLICATE_APPLICATION, APPLICATION_CLOSED, INELIGIBLE, FILE_SCAN_PENDING, FILE_REJECTED, INVALID_TRANSITION, VERSION_CONFLICT and RATE_LIMITED.

## 11. Pagination, filtering and sorting

Use cursor pagination for large collections. Allowlist filters and sort fields per endpoint. Enforce maximum page size and date range. Never pass client-supplied Mongo operators directly into queries.

## 12. API completion rule

An endpoint is implemented only when route, validation, authentication, authorization, scoped query, safe DTO, error behavior, audit/side effects and contract tests exist. Update OpenAPI and this specification with every approved contract change.

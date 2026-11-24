# API Specification

## 1. API contract conventions

- Local base URL: determined by `PORT` in server configuration; current server setup defaults to 5000 in project notes.
- Prefix: `/api`.
- Transport: HTTPS in deployed environments.
- JSON for ordinary requests; multipart/form-data for resume upload.
- Auth: `Authorization: Bearer <JWT>` on protected routes.
- IDs: MongoDB ObjectId strings.
- All request bodies are untrusted and must be validated server-side.

**Status labels:** Implemented = route exists in current route file; Planned = appears in product/master notes but route is not currently mounted/implemented. Inspect code before relying on planned paths.

## 2. Current route inventory

### Authentication — `/api/auth`
| Method | Path | Access | Status |
|---|---|---|---|
| POST | `/register` | Public | Implemented |
| POST | `/login` | Public | Implemented |
| GET | `/me` | Authenticated | Planned |

### Student — `/api/student`
| Method | Path | Access | Status |
|---|---|---|---|
| GET | `/profile` | Student | Implemented |
| PUT | `/profile` | Student | Implemented |
| POST | `/resume` | Student; multipart field `resume` | Implemented |

### Jobs — `/api/jobs`
| Method | Path | Access | Status |
|---|---|---|---|
| POST | `/` | Admin | Implemented |
| GET | `/` | Authenticated | Implemented |
| GET | `/:jobId` | Authenticated | Implemented |
| PUT | `/:jobId/status` | Admin | Planned |

### Applications — `/api/applications`
| Method | Path | Access | Status |
|---|---|---|---|
| POST | `/apply` | Student | Implemented |
| GET | `/my` | Student | Implemented |
| GET | `/job/:jobId` | Admin | Implemented |
| PUT | `/:applicationId/status` | Admin | Implemented |

### Test routes
- `GET /api/test/protected` — authenticated test route.
- `GET /api/test/admin` — admin-only test route.
- `GET /` — API running message.

## 3. Planned endpoint backlog

These paths are design proposals, not active endpoints unless implemented later.

| Method | Proposed path | Purpose |
|---|---|---|
| GET | `/api/student/dashboard` | Student summary |
| GET | `/api/jobs/:jobId/eligibility` | Explain eligibility |
| GET | `/api/admin/students` | Admin student search |
| GET | `/api/admin/students/:studentId` | Admin student detail |
| GET | `/api/admin/jobs` | Admin job list |
| GET | `/api/admin/jobs/:jobId/applications` | Applicant review |
| POST | `/api/ai/resumes/:resumeId/parse` | Queue resume parsing |
| GET | `/api/ai/matches/jobs/:jobId` | Job candidate matches |
| GET | `/api/ai/matches/students/:studentId` | Student match results |
| GET | `/api/notifications` | User notifications |
| GET | `/api/admin/reports/placements` | Placement report |

The original master notes use alternate AI/admin path spellings; choose and version a canonical contract before implementation.

## 4. Authentication and authorization

- Verify JWT signature, expiry, and account state.
- Derive user ID/role from verified server-side identity, never request body.
- Student may access own profile/resume/applications only.
- Admin may manage jobs/applications only within granted scope.
- Company role has no self-service routes in current scope.
- Use non-disclosing 404 where revealing resource existence would create a privacy risk.

## 5. Request/response examples (target contract)

Registration request:
```json
{ "name": "Example Student", "email": "student@example.edu", "password": "Use-a-strong-secret" }
```

Recommended success envelope:
```json
{ "success": true, "message": "Request completed", "data": {} }
```

Recommended error envelope:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [{ "field": "email", "issue": "Invalid email format" }]
  },
  "requestId": "correlation-id"
}
```

These envelopes are target standards; current controller response shapes must be normalized before claiming conformance.

## 6. HTTP status and error taxonomy

| Status | Code | Meaning |
|---:|---|---|
| 200 | OK | Successful read/update |
| 201 | CREATED | Resource created |
| 202 | ACCEPTED | Async task queued |
| 400 | VALIDATION_ERROR | Invalid payload/parameter |
| 401 | UNAUTHENTICATED | Missing/invalid/expired token |
| 403 | FORBIDDEN | Authenticated but not permitted |
| 404 | NOT_FOUND | Resource absent/not visible |
| 409 | CONFLICT | Duplicate or invalid state transition |
| 413 | FILE_TOO_LARGE | Upload exceeds limit |
| 415 | UNSUPPORTED_MEDIA_TYPE | Unsupported format |
| 422 | BUSINESS_RULE_FAILED | Eligibility/deadline/business rule failure |
| 429 | RATE_LIMITED | Request throttled |
| 500 | INTERNAL_ERROR | Unexpected failure |
| 503 | DEPENDENCY_UNAVAILABLE | Database/worker temporarily unavailable |

## 7. Contract requirements

- Validate body, query, params, headers, and file.
- Whitelist update fields; prevent mass assignment.
- Paginate collection endpoints and cap page size.
- Define sort/filter allowlists.
- Use idempotency where retries could duplicate side effects.
- Never expose hashes, secrets, private storage keys, or stack traces.
- Document multipart field names, size/type limits, and download policy.
- Add OpenAPI/Swagger once the endpoint contract stabilizes.
- Keep this file synchronized with route tests and implementation.

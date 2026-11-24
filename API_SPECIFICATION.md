# API Specification

## 1. Conventions

- Base URL (local default): `http://localhost:5000`
- API prefix: `/api`
- Content type: `application/json` unless an endpoint accepts multipart form data.
- Authentication: JWT bearer token for protected endpoints.
- IDs: MongoDB ObjectId strings.
- Error shape should be standardized as the API matures; current controllers may differ.

The Express app currently mounts `/api/auth`, `/api/student`, `/api/jobs`, and `/api/applications`. Endpoint details below distinguish confirmed route groups from endpoints listed in planning notes.

## 2. Implemented route mounts

| Route group | Purpose | Source |
|---|---|---|
| `/api/auth` | Registration/login/current identity | authRoutes |
| `/api/student` | Student profile and resume-related operations | studentRoutes |
| `/api/jobs` | Job operations | jobRoutes |
| `/api/applications` | Application operations | applicationRoutes |

The app also exposes:
- `GET /` — API-running message.
- `GET /api/test/protected` — protected middleware test route.
- `GET /api/test/admin` — protected admin-role test route.

## 3. Planned/documented endpoint inventory

The following endpoint inventory comes from `docs/master-notes.md`. Verify current route files/controllers before treating any path as active.

### Authentication

| Method | Path | Intended behavior | Status |
|---|---|---|---|
| POST | `/api/auth/register` | Register a user | Planned/documented |
| POST | `/api/auth/login` | Authenticate user | Planned/documented |
| GET | `/api/auth/me` | Get current authenticated user | Planned/documented |

### Student

| Method | Path | Intended behavior | Status |
|---|---|---|---|
| GET | `/api/student/profile` | Read own profile | Planned/documented |
| PUT | `/api/student/profile` | Update own profile | Planned/documented |
| POST | `/api/student/resume` | Upload resume | Planned/documented |
| GET | `/api/student/dashboard` | Student dashboard data | Planned/documented |

### Jobs

| Method | Path | Intended behavior | Status |
|---|---|---|---|
| POST | `/api/jobs` | Create job | Planned/documented |
| GET | `/api/jobs` | List jobs | Planned/documented |
| GET | `/api/jobs/:jobId` | Job details | Planned/documented |
| PUT | `/api/jobs/:jobId/status` | Open/close job | Planned/documented |

### Applications

| Method | Path | Intended behavior | Status |
|---|---|---|---|
| POST | `/api/applications/apply` | Apply to a job | Planned/documented |
| GET | `/api/applications/student` | List own applications | Planned/documented |
| GET | `/api/applications/job/:jobId` | List applicants for a job | Planned/documented |
| PUT | `/api/applications/:applicationId/status` | Update application status | Planned/documented |

### AI matching (planned only)

| Method | Path | Intended behavior |
|---|---|---|
| POST | `/api/ai/match/job/:jobId` | Trigger matching for a job |
| GET | `/api/ai/match/job/:jobId` | Retrieve job match results |
| GET | `/api/ai/match/student/:studentId` | Retrieve student match results |

The AI routes are not mounted by the current Express app.

## 4. Authentication and authorization

Protected requests should use:

```http
Authorization: Bearer <access-token>
```

The server must verify token signature/expiry and load or validate the principal. Authorization rules:
- Student: own profile, own applications, and permitted job discovery/application operations.
- Admin: placement management operations.
- Company: future role only, with explicitly scoped permissions.

Do not trust user role or student identity supplied in the request body for privileged decisions.

## 5. Request and response contract (recommended standard)

Success:
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed"
}
```

Error:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": []
  }
}
```

These are recommended conventions; align controllers before claiming they are current behavior.

## 6. HTTP status and error codes

| HTTP | Code | Meaning |
|---|---|---|
| 200 | OK | Successful read/update |
| 201 | CREATED | Resource created |
| 400 | VALIDATION_ERROR | Invalid request data |
| 401 | UNAUTHENTICATED | Missing/invalid/expired token |
| 403 | FORBIDDEN | Authenticated but not authorized |
| 404 | NOT_FOUND | Resource does not exist or is not visible |
| 409 | CONFLICT | Duplicate application/email or state conflict |
| 413 | FILE_TOO_LARGE | Upload exceeds configured limit |
| 415 | UNSUPPORTED_MEDIA_TYPE | Unsupported file/content type |
| 429 | RATE_LIMITED | Too many requests |
| 500 | INTERNAL_ERROR | Unexpected server failure |

## 7. Contract requirements

- Validate path params, query params, body, and uploaded files.
- Paginate collection endpoints.
- Do not return password hashes, tokens, or private storage paths.
- Return consistent errors without stack traces in production.
- Document allowed status transitions and multipart field names.
- Add request/response examples based on actual controller behavior as endpoints stabilize.

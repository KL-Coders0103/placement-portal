# Project Structure and File Ownership

## 1. Current repository tree

The current baseline is a backend-first repository. This is the verified structure from the source tree; future frontend/AI directories below are proposals and must not be represented as existing files until created.

```text
placement-portal/
├── .gitignore
├── README.md
├── PROJECT_REQUIREMENTS.md
├── PRD.md
├── SCOPE_AND_MILESTONES.md
├── USER_STORIES.md
├── SYSTEM_ARCHITECTURE.md
├── TECH_STACK.md
├── DATABASE_SCHEMA.md
├── API_SPECIFICATION.md
├── PROJECT_STRUCTURE.md
├── UI_UX_GUIDELINES.md
├── SECURITY_GUIDELINES.md
├── CODING_STANDARDS.md
├── TESTING_STRATEGY.md
├── AI_AGENT_INSTRUCTIONS.md
├── docs/
│   └── master-notes.md
└── server/
    ├── package.json
    ├── package-lock.json
    ├── server.js
    └── src/
        ├── app.js
        ├── config/
        │   └── db.js
        ├── controllers/
        │   ├── applicationController.js
        │   ├── authController.js
        │   ├── jobController.js
        │   └── studentController.js
        ├── middlewares/
        │   ├── authMiddleware.js
        │   └── uploadMiddleware.js
        ├── models/
        │   ├── Applications.js
        │   ├── Job.js
        │   ├── StudentProfile.js
        │   └── User.js
        └── routes/
            ├── applicationRoutes.js
            ├── authRoutes.js
            ├── jobRoutes.js
            └── studentRoutes.js
```

## 2. Current file responsibilities

| Path | Responsibility |
|---|---|
| `server/server.js` | Load environment, connect MongoDB, start HTTP server |
| `server/src/app.js` | Express setup, middleware, route mounts, health/test routes |
| `server/src/config/db.js` | MongoDB connection |
| `server/src/routes/` | HTTP paths and middleware/controller wiring |
| `server/src/controllers/` | Request handling and domain orchestration |
| `server/src/middlewares/authMiddleware.js` | JWT protection and role authorization |
| `server/src/middlewares/uploadMiddleware.js` | Multer upload configuration |
| `server/src/models/` | Mongoose schemas, enums, indexes, hooks |
| `docs/master-notes.md` | Original product notes and early planned API/data design |

## 3. Recommended backend expansion

Create only when needed:

```text
server/src/
├── validators/       # Request schemas and shared validation
├── services/         # Business rules and integrations
├── repositories/     # Optional persistence abstraction for complex domains
├── policies/         # Ownership and authorization rules
├── errors/           # Typed application errors
├── utils/            # Small shared helpers
├── jobs/             # Background job definitions
├── integrations/     # Email, storage, AI clients
└── observability/    # Logger, metrics, tracing
```

## 4. Recommended future frontend

```text
client/
├── public/
└── src/
    ├── app/           # Bootstrap, router, providers
    ├── assets/
    ├── components/    # Shared primitives and composites
    ├── features/
    │   ├── auth/
    │   ├── student-profile/
    │   ├── resumes/
    │   ├── jobs/
    │   ├── eligibility/
    │   ├── applications/
    │   ├── admin/
    │   └── notifications/
    ├── hooks/
    ├── lib/            # API client, config, utilities
    ├── styles/         # Tokens and global styles
    └── types/
```

## 5. Future AI service (separate deployment)

```text
ai-service/
├── app/
│   ├── api/
│   ├── schemas/
│   ├── services/
│   ├── parsers/
│   ├── matching/
│   └── core/
├── tests/
├── pyproject.toml
└── README.md
```

## 6. Placement rules

- Routes declare paths; controllers translate HTTP; services own reusable business rules.
- Models own persistence schema and indexes, not HTTP response formatting.
- Validators are shared by route/controller boundaries.
- Frontend features own their API hooks, forms, and feature-specific components.
- Shared UI must not import backend internals.
- Keep configuration centralized and typed/validated.
- Never commit `.env`, uploads, private resumes, database dumps, build output, or real student data.
- Update the current tree in this document when files are added/moved/removed.

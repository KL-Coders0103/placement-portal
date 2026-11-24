# Project Structure

## Current repository tree

The current default branch contains a small backend scaffold and project notes. The following tree summarizes observed directories; omitted nested files can be inspected directly in the repository.

```text
placement-portal/
├── .gitignore
├── README.md
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

## Directory responsibilities

| Path | Responsibility |
|---|---|
| `docs/` | Project planning and implementation notes |
| `server/server.js` | Loads environment, connects database, starts HTTP listener |
| `server/src/app.js` | Express app configuration and route mounting |
| `server/src/config/` | Database and other infrastructure configuration |
| `server/src/controllers/` | Request handlers and application orchestration |
| `server/src/middlewares/` | Authentication, authorization, upload and cross-cutting request logic |
| `server/src/models/` | Mongoose schemas and persistence models |
| `server/src/routes/` | HTTP route declarations and middleware composition |

## Recommended future expansion

Only create these directories when the corresponding feature is implemented:

```text
client/
├── src/
│   ├── app/              # Application bootstrap and routing
│   ├── components/       # Shared UI
│   ├── features/         # Auth, profile, jobs, applications, admin
│   ├── hooks/
│   ├── lib/              # API client and utilities
│   ├── styles/
│   └── types/
└── ...

server/src/
├── validators/           # Request validation schemas
├── services/             # Domain and integration services
├── utils/                # Shared server utilities
└── ...

ai-service/               # Separate service only after its contract is approved
tests/
└── ...
```

## File placement rules

- Keep route definitions thin; place request logic in controllers and reusable business logic in services when complexity warrants it.
- Keep database definitions inside models.
- Keep authentication/authorization centralized in middleware and policy helpers.
- Keep frontend feature code grouped by domain rather than creating one giant components directory.
- Avoid duplicating configuration and API types.
- Never commit `.env`, credentials, uploads, generated build output, or private datasets.
- Update this document whenever the actual tree changes. Do not copy the recommended future tree into the "current" tree until those files exist.

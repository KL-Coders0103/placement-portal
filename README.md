# AI-Powered College Placement Portal

A college placement management platform intended to centralize student profiles, placement opportunities, applications, and placement-cell workflows. The long-term product direction includes resume parsing, skill extraction, eligibility checks, and explainable AI-assisted student–job matching.

> **Project status:** The repository currently contains an Express 5 / Mongoose backend foundation. The React frontend and AI matching service are planned; do not assume they are implemented.

## Current capabilities and direction

- **Backend foundation:** Node.js, Express 5 (CommonJS), MongoDB through Mongoose.
- **Authentication foundation:** registration/login controllers, bcryptjs password hashing, JWT middleware, and role checks.
- **Placement domain:** student profile, job, and application models/routes/controllers are present in the server source.
- **Resume upload foundation:** Multer middleware and a static `/uploads` mount are present.
- **Planned product capabilities:** student and placement-admin dashboards, job eligibility, application tracking, resume skill extraction, and AI-assisted matching.
- **Future role:** company access is a future-phase concept, not a confirmed current capability.

## Repository layout

```text
.
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
        ├── controllers/
        ├── middlewares/
        ├── models/
        └── routes/
```

## Technology stack

| Area | Current / planned choice |
|---|---|
| Backend runtime | Node.js (CommonJS) |
| HTTP framework | Express 5 |
| Database / ODM | MongoDB / Mongoose 9 |
| Authentication | JWT (`jsonwebtoken`) |
| Password hashing | `bcryptjs` |
| Upload middleware | Multer 2 |
| Environment configuration | `dotenv` |
| CORS | `cors` |
| Development runner | `nodemon` |
| Frontend | React + Tailwind CSS (planned in master notes) |
| AI service | Python FastAPI/Flask (planned; framework not selected) |
| Database hosting | MongoDB Atlas (documented target) |

Use the lockfile as the source of truth for installed dependency versions.

## Prerequisites

- Node.js and npm compatible with the installed dependencies.
- Access to a MongoDB instance (Atlas or local).
- Git.

## Local backend setup

From the repository root:

```bash
cd server
npm install
```

Create `server/.env` using the variable names expected by `src/config/db.js`, authentication controllers, and middleware. Typical configuration concepts include a MongoDB connection URI, server port, and JWT secret. **Check the source files before choosing exact variable names; never commit real secrets.**

Start the API:

```bash
npm run dev
# or
npm start
```

The server uses port `5000` when `PORT` is not configured. The root route currently responds with an API-running message.

## Current API route groups

The Express app mounts these route groups:

- `/api/auth`
- `/api/student`
- `/api/jobs`
- `/api/applications`

Protected test routes currently exist at `/api/test/protected` and `/api/test/admin`. For endpoint details and implementation status, see [API_SPECIFICATION.md](./API_SPECIFICATION.md).

## Documentation

- [Project requirements](./PROJECT_REQUIREMENTS.md)
- [Product requirements](./PRD.md)
- [Scope and milestones](./SCOPE_AND_MILESTONES.md)
- [User stories](./USER_STORIES.md)
- [System architecture](./SYSTEM_ARCHITECTURE.md)
- [Technology stack](./TECH_STACK.md)
- [Database schema](./DATABASE_SCHEMA.md)
- [API specification](./API_SPECIFICATION.md)
- [Project structure](./PROJECT_STRUCTURE.md)
- [UI/UX guidelines](./UI_UX_GUIDELINES.md)
- [Security guidelines](./SECURITY_GUIDELINES.md)
- [Coding standards](./CODING_STANDARDS.md)
- [Testing strategy](./TESTING_STRATEGY.md)
- [AI agent instructions](./AI_AGENT_INSTRUCTIONS.md)
- [Original master notes](./docs/master-notes.md)

## Important implementation notes

1. Treat source code and the package lockfile as authoritative for implemented behavior.
2. The master notes describe proposed AI matching endpoints and data concepts; they are not evidence that those endpoints/models currently exist.
3. Do not expose uploaded resumes or student records publicly. Review upload access before production.
4. The current npm test script is a placeholder that exits with an error; a real test suite still needs to be configured.
5. Keep this README and the architecture/API documents updated whenever implementation changes.

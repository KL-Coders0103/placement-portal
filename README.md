# AI-Powered College Placement Portal

> A centralized campus recruitment platform for student profiles, job opportunities, eligibility, applications, and placement-cell operations, with explainable AI-assisted resume analysis and job matching planned as an enhancement.

## 1. Product at a glance

The portal aims to replace fragmented spreadsheets, email threads, and manual resume screening with a secure, role-aware workflow. Students maintain their placement profile and apply to relevant opportunities. Placement administrators manage student records, publish jobs, review applicants, and record outcomes. A future AI service will extract resume skills and provide transparent match evidence; it will support, not replace, human decisions.

### Primary actors
- **Student:** account, academic profile, skills, resume, job discovery, eligibility, applications, status tracking.
- **Placement administrator:** student oversight, job lifecycle, applicant review, placement reporting, final status management.
- **Company representative:** future phase only; external company access is not part of the current API.
- **Operator:** deployment, secrets, backups, monitoring, incident response.

## 2. Current repository baseline

The repository currently contains a Node.js API under `server/`, using Express 5, Mongoose, and MongoDB. Existing source includes registration/login, JWT middleware, student profile and resume routes, job routes, and application routes. The React/Tailwind frontend and Python AI microservice are product plans, not current folders in this repository.

**Important current implementation gaps:** the npm test script is a placeholder; `GET /api/auth/me`, dashboard routes, AI routes, admin reporting routes, and job status update routes are listed in planning notes but are not present in the current route files. The Express app currently exposes `/uploads` as a static directory; this must be changed to private, authorized resume access before real student data is stored.

## 3. Repository layout

```text
placement-portal/
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
├── .gitignore
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

## 4. Technology summary

| Area | Current / planned |
|---|---|
| Backend | Node.js, Express 5, CommonJS |
| Database | MongoDB with Mongoose |
| Authentication | JWT, bcryptjs, role middleware |
| File upload | Multer (current implementation; storage/access hardening required) |
| Frontend | React + Tailwind CSS (planned) |
| AI | Python FastAPI or Flask (not selected/implemented) |
| Design | Figma |
| Hosting | MongoDB Atlas described in master notes; application hosting TBD |

Use `server/package-lock.json` as the exact dependency-version source.

## 5. Local backend setup

Prerequisites: Git, Node.js compatible with the lockfile, npm, and a MongoDB database.

```bash
git clone https://github.com/KL-Coders0103/placement-portal.git
cd placement-portal/server
npm install
```

Create `server/.env` with the exact variable names read by `server/src/config/db.js`, `server/server.js`, and authentication code. Do not guess names, commit secrets, or copy production credentials. A verified `.env.example` should be maintained as part of environment setup.

```bash
npm run dev
# production-style start
npm start
```

The API port and database URI must be taken from the current source/configuration. The root health response is `GET /`.

## 6. Current API route groups

| Prefix | Current purpose |
|---|---|
| `/api/auth` | `POST /register`, `POST /login` |
| `/api/student` | `GET /profile`, `PUT /profile`, `POST /resume` |
| `/api/jobs` | `POST /`, `GET /`, `GET /:jobId` |
| `/api/applications` | `POST /apply`, `GET /my`, `GET /job/:jobId`, `PUT /:applicationId/status` |

All route details, role gates, payloads, and planned endpoints are documented in [API_SPECIFICATION.md](./API_SPECIFICATION.md). Always inspect source before assuming an endpoint exists.

## 7. Documentation index

1. [Project requirements](./PROJECT_REQUIREMENTS.md)
2. [Product requirements document](./PRD.md)
3. [Scope and milestones](./SCOPE_AND_MILESTONES.md)
4. [User stories](./USER_STORIES.md)
5. [System architecture](./SYSTEM_ARCHITECTURE.md)
6. [Technology stack](./TECH_STACK.md)
7. [Database schema](./DATABASE_SCHEMA.md)
8. [API specification](./API_SPECIFICATION.md)
9. [Project structure](./PROJECT_STRUCTURE.md)
10. [UI/UX guidelines](./UI_UX_GUIDELINES.md)
11. [Security guidelines](./SECURITY_GUIDELINES.md)
12. [Coding standards](./CODING_STANDARDS.md)
13. [Testing strategy](./TESTING_STRATEGY.md)
14. [AI agent instructions](./AI_AGENT_INSTRUCTIONS.md)
15. [Original project master notes](./docs/master-notes.md)

## 8. Project principles

- Source code and lockfiles are authoritative; planning documents are not proof of implementation.
- Secure student data and resumes by default.
- Enforce authorization and ownership on the server.
- Explain eligibility and AI recommendations.
- Keep humans responsible for selection decisions.
- Ship tested, observable, accessible, responsive features.
- Update documentation with every material architecture/API/schema change.

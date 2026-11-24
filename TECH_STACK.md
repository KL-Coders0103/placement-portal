# Technology Stack

## Current repository stack

| Layer | Technology | Status / rationale |
|---|---|---|
| Runtime | Node.js | Current backend runtime |
| API framework | Express 5.2.x | Current HTTP application |
| Language/module system | JavaScript, CommonJS | Matches current source |
| Database | MongoDB | Document database described in master notes |
| ODM | Mongoose 9.x | Current model/data layer |
| Authentication | jsonwebtoken 9.x | JWT dependency present |
| Password hashing | bcryptjs 3.x | Hashing dependency present |
| Upload handling | Multer 2.x | Upload middleware dependency present |
| Environment | dotenv 17.x | Loads environment variables |
| Cross-origin requests | cors 2.x | Express middleware |
| Development | nodemon 3.x | Auto-restart script |
| Package manager | npm | package-lock.json is committed |

Exact resolved versions should be taken from `server/package-lock.json`. Version ranges in `package.json` are not exact runtime versions.

## Planned product stack

| Layer | Proposed technology | Status / notes |
|---|---|---|
| Frontend | React | Listed in master notes; implementation not present in current repository tree |
| Styling | Tailwind CSS | Listed in master notes; version/configuration TBD |
| UI design | Figma | Design tool, not runtime dependency |
| Database hosting | MongoDB Atlas | Target documented in master notes; environment-specific setup |
| AI service | Python with FastAPI or Flask | Planned; choose one before implementation |
| Resume parsing | Evaluated Python document/PDF extraction libraries | Select only after file format and privacy review |

## Selection principles

- Prefer stable, maintained releases compatible with the committed lockfile.
- Avoid adopting a dependency solely because an AI agent suggests it.
- Keep frontend and backend dependencies separated.
- Commit lockfile changes with dependency updates.
- Review package licenses, security advisories, maintenance activity, and Node compatibility.
- Pin production runtime and CI versions explicitly.

## Environment variables

The exact names must match the source code. Expected configuration categories include:

| Variable category | Purpose | Handling |
|---|---|---|
| MongoDB URI | Database connection | Secret; never commit |
| Port | HTTP listener | Non-secret deployment config |
| JWT signing secret | Token verification/signing | High-sensitivity secret; rotate safely |
| CORS origins | Allowed browser origins | Explicit allowlist in production |
| Upload limits/path | Resume file policy | Validate and restrict |

Create `server/.env.example` only after verifying exact names from source and ensure real `.env` files are ignored by Git.

## Technology decision record

Before introducing a major tool, document:
- problem it solves,
- alternatives considered,
- version and compatibility,
- operational cost,
- security/privacy impact,
- migration and rollback plan.

Do not describe a planned dependency as installed until it appears in the relevant package manifest and lockfile.

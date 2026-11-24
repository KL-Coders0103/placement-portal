# Technology Stack and Dependency Policy

## 1. Verified current backend

The current `server/package.json` specifies the following dependency ranges. The committed `server/package-lock.json` is authoritative for resolved versions.

| Technology | Current range | Purpose |
|---|---:|---|
| Node.js | Runtime not pinned in repo | JavaScript server runtime |
| Express | ^5.2.1 | HTTP framework |
| Mongoose | ^9.0.2 | MongoDB ODM |
| bcryptjs | ^3.0.3 | Password hashing |
| jsonwebtoken | ^9.0.3 | JWT signing/verification |
| Multer | ^2.0.2 | Multipart upload middleware |
| cors | ^2.8.5 | Cross-origin middleware |
| dotenv | ^17.2.3 | Environment loading |
| nodemon | ^3.1.11 | Development reload |
| npm | lockfile present | Package management |

Current module format is CommonJS. Existing source uses JavaScript.

## 2. Planned stack (not yet installed/verified)

| Layer | Intended choice | Decision still required |
|---|---|---|
| Web frontend | React | Build tool, router, state/data strategy |
| Styling | Tailwind CSS | Version, tokens, component approach |
| Forms/validation | TBD | Choose client schema aligned with server validation |
| API client | TBD | Centralized auth, timeout, error handling |
| Design | Figma | Approved design system and component library |
| AI service | Python FastAPI or Flask | Choose one after service contract and deployment review |
| Resume parsing | Python document/PDF libraries | Validate licenses, formats, extraction quality |
| File storage | Private object storage | Provider, encryption, lifecycle, signed URL policy |
| Background jobs | Queue/worker | Provider and retry/dead-letter strategy |
| Email notifications | Provider TBD | Delivery, templates, bounce handling |

Do not install both FastAPI and Flask without a reason. Do not add a frontend stack to backend dependencies.

## 3. Environment requirements

- Pin supported Node.js version in `.nvmrc` or `engines` after verifying compatibility.
- Use the committed lockfile and `npm ci` in CI.
- Maintain separate development, test, staging, and production config.
- Add `.env.example` with verified variable names and safe placeholders.
- Fail fast when required config is missing.
- Never expose server secrets to frontend builds.

## 4. Dependency selection rules

Before adding/upgrading a package, check:
- maintenance and release history,
- security advisories and transitive dependencies,
- Node/runtime compatibility,
- license and commercial-use restrictions,
- bundle/runtime size,
- TypeScript support if relevant,
- migration and rollback path.

Upgrade intentionally, commit package and lockfile together, and run tests plus vulnerability checks. Avoid wildcard versions and unreviewed AI-generated dependencies.

## 5. Proposed scripts and tooling

As the project grows, add explicit scripts for test, lint, format, security audit, and CI. Do not document a script until it exists. The current test script is a placeholder and fails by design; replace it with a selected test framework and real tests before claiming automated coverage.

## 6. Technology decision record template

- Decision ID/title:
- Date/owner:
- Problem:
- Requirements:
- Options considered:
- Selected option and exact version:
- Rationale:
- Security/privacy impact:
- Operational cost:
- Migration/rollback:
- Review date:

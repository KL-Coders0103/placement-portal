# Placement Portal

A secure, institution-governed placement management platform for students, placement-cell teams, approved employers and institutional leadership.

## Product promise

One trusted workspace for student career profiles, employer onboarding, approved jobs and internships, eligibility, applications, recruitment rounds, interviews, offers, notifications and placement reporting. Placement Portal is not an unrestricted public job board and does not promise placement or selection.

## Core workspaces

- **Student:** verified profile, private resume vault, opportunities, eligibility explanations, applications, interviews, offers and notifications.
- **Placement team:** institution structure, student verification, company approvals, opportunity review, drives, application pipeline, reviewer assignments, announcements and reports.
- **Employer:** company verification, recruiter team, opportunity drafts, applicant pipeline and interviews within approved company scope.
- **Leadership:** aggregate placement outcomes, cohort/program trends and company participation.
- **Platform operations:** tenant configuration and platform health; no default access to student content.

## Design direction

**Light theme only.** White and pale neutral surfaces, navy/royal-blue primary identity, restrained teal accent and semantic status colors. The palette and tokens are defined in `docs/DESIGN_SYSTEM.md`; dark mode is not part of the required implementation.

## Technology baseline

React + TypeScript + Vite + Tailwind; Node.js LTS + TypeScript + Express 5; MongoDB + Mongoose; Redis + BullMQ; private S3-compatible object storage; Zod contracts; Vitest/Supertest/Playwright. Confirm dependency versions and existing source structure before implementation. Provider selections and open product policies are tracked in `docs/DECISIONS.md`.

## Documentation — 15 authoritative files

1. [PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md)
2. [PROJECT_REQUIREMENTS.md](docs/PROJECT_REQUIREMENTS.md)
3. [MASTER_FEATURE_IMPLEMENTATION.md](docs/MASTER_FEATURE_IMPLEMENTATION.md)
4. [IMPLEMENTATION_TRACKER.md](docs/IMPLEMENTATION_TRACKER.md)
5. [ARCHITECTURE.md](docs/ARCHITECTURE.md)
6. [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)
7. [API_SPECIFICATION.md](docs/API_SPECIFICATION.md)
8. [FRONTEND_ARCHITECTURE.md](docs/FRONTEND_ARCHITECTURE.md)
9. [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
10. [UI_UX_GUIDELINES.md](docs/UI_UX_GUIDELINES.md)
11. [SECURITY_GUIDELINES.md](docs/SECURITY_GUIDELINES.md)
12. [TESTING_STRATEGY.md](docs/TESTING_STRATEGY.md)
13. [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)
14. [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)
15. [DECISIONS.md](docs/DECISIONS.md)

## Implementation status

The documentation defines the target product and engineering baseline. It is not proof that all features, collections, APIs or screens are implemented. A feature is complete only when its UI, API, persistence, validation, authorization, audit behavior, tests and operational requirements are verified. See `docs/IMPLEMENTATION_TRACKER.md` for evidence-based progress.

Start with the project/product requirements, then follow the master feature phases. Do not commit secrets, real student records, private resumes or production exports.

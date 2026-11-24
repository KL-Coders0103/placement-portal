# Placement Portal

A secure, role-aware college placement management platform connecting students, placement-cell teams, approved employers and institutional leadership.

## Product promise
One trusted workspace for student career profiles, employer onboarding, approved jobs/internships, eligibility, applications, recruitment rounds, interviews, offers, notifications and placement reporting. It is an institution-governed platform, not an unrestricted public job board.

## Core actors
- Student: maintains a verified profile, manages private resumes, discovers opportunities, checks eligibility, applies and tracks progress.
- Placement administrator: manages institution data, verifies students/companies, approves opportunities, configures drives, reviews applications, oversees outcomes and reports.
- Placement reviewer: reviews only assigned students/applications and records authorized feedback.
- Company owner: manages an approved company profile and invites company recruiters.
- Recruiter: manages own company's approved opportunities and only the applicants assigned/visible under institution policy.
- Placement director: sees aggregate institutional performance and performs explicitly granted approvals.
- Platform operator: manages platform/tenant health; no default access to student content.

## Product principles
Least privilege; institution/company isolation; auditable state transitions; private documents; transparent eligibility; accessible responsive UX; AI advisory only; modular architecture.

## Documentation
1. docs/01-product-requirements.md
2. docs/02-prd-feature-catalogue.md
3. docs/03-workflows-navigation.md
4. docs/04-scope-roadmap.md
5. docs/05-roles-rbac.md
6. docs/06-system-architecture.md
7. docs/07-technology-stack.md
8. docs/08-database-schema.md
9. docs/09-api-specification.md
10. docs/10-project-structure.md
11. docs/11-ui-ux-guidelines.md
12. docs/12-security-privacy.md
13. docs/13-engineering-standards.md
14. docs/14-testing-delivery.md

## Target stack
React + TypeScript + Vite + Tailwind; Node.js LTS + TypeScript + Express 5; MongoDB/Mongoose; Redis + BullMQ; private S3-compatible object storage; Socket.IO for selected live updates; Zod contracts; Vitest/Supertest/Playwright.

## Implementation status
These files define the target product and architecture. They do not claim that all features or source code are implemented. A feature is complete only when UI, API, persistence, authorization, audit, tests and operational behavior exist.

Start with product requirements, feature catalogue, workflows and RBAC. Implement secure vertical slices. Never commit secrets, private resumes, student exports or production data.
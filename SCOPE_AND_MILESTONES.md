# Scope and Milestones

## Scope principles

This plan separates the existing backend foundation from proposed product work. Milestones are ordered dependencies, not claims that those features already exist. Priorities may be adjusted after repository review.

## In scope

- Student and administrator workflows.
- Authentication and role-aware authorization.
- Student profiles and resume metadata/upload.
- Job creation and discovery.
- Applications and status management.
- Eligibility checks.
- Later: resume parsing and explainable matching.
- Operational security, tests, documentation, and deployment readiness.

## Out of scope until separately approved

- Automatic hiring decisions.
- Company portal and external recruiter account management.
- Payments, public social features, or unrelated learning management functionality.
- Native mobile apps.
- Production AI claims without evaluation evidence.

## Milestones

| Phase | Priority | Deliverables | Exit criteria |
|---|---|---|---|
| M0 — Repository baseline | P0 | Environment setup, source inventory, configuration and docs | Fresh clone can install/start API using documented setup |
| M1 — Identity foundation | P0 | Registration, login, JWT verification, role authorization | Auth and access-control tests pass |
| M2 — Student profile | P0 | Profile read/update, academic details, ownership checks | Students cannot access another student's profile |
| M3 — Job lifecycle | P0 | Create/update/list/detail/open/close jobs | Only authorized roles can manage postings |
| M4 — Application lifecycle | P0 | Apply, duplicate prevention, list own applications, status updates | Valid transitions and ownership/admin checks pass |
| M5 — Resume management | P1 | Secure upload/download, metadata, validation, deletion policy | File type/size and access tests pass |
| M6 — Frontend experience | P1 | Responsive student/admin views and API integration | Critical journeys work on mobile and desktop |
| M7 — Eligibility | P1 | Rule model, evaluation service, explanation | Boundary cases and rule versioning are tested |
| M8 — Placement operations | P1 | Admin reporting, filters, audit trail, notifications | Admin workflow is traceable and usable |
| M9 — Resume intelligence | P2 | Document extraction and human correction | Extraction evaluated against labelled examples |
| M10 — AI matching | P2 | Match score, matched/missing skills, model/version | Evaluation, explainability, human review, and fallback documented |
| M11 — Production readiness | P0 | Monitoring, backups, rate limits, CI, security review | Operational checklist signed off |

## Priority definitions

- **P0:** Required for a safe usable baseline.
- **P1:** Important for full placement workflow.
- **P2:** Advanced enhancement after core workflow is stable.

## Release gates

- No known critical/high security issue.
- No endpoint that trusts client-supplied role or ownership identifiers without server verification.
- No public resume storage by default.
- Tests cover success, invalid input, unauthorized access, missing records, and database failures.
- API and environment variables are documented.
- Backups and restore procedure are verified before production data is used.

## Change control

Any new feature must state its user, business value, data requirements, security implications, dependencies, acceptance criteria, and effect on existing milestones. Update this file and the PRD when scope changes.

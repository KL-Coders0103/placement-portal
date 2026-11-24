# Scope, Delivery Plan, and Milestones

## 1. Scope baseline

Deliver a secure campus placement workflow in incremental phases. The current repository is an API foundation. A frontend, eligibility engine, notifications, reporting, and AI processing are future milestones unless source code and tests establish otherwise.

### In scope
Student identity/profile/resume; admin-controlled jobs; job discovery; eligibility; applications/status; student/admin dashboards; auditability; operational readiness; later resume parsing and explainable matching.

### Out of scope until approved
Automated hiring, payroll, attendance, LMS, public resume search, unverified external recruiter access, mobile native apps, and AI training on student data without an approved policy.

## 2. Milestone roadmap

| Phase | Priority | Work packages | Exit gate |
|---|---|---|---|
| 0. Repository recovery & baseline | P0 | Restore source tree, inspect code, document env, verify setup | Clean clone installs and API boots |
| 1. Backend hardening | P0 | Error handling, validation, CORS, headers, rate limits, config, health | Security baseline tests pass |
| 2. Identity & RBAC | P0 | Registration/login, admin provisioning, token policy, role/ownership tests | No privilege escalation or IDOR |
| 3. Student profile | P0 | Profile validation, academic fields, completeness | Own-profile rules and tests pass |
| 4. Resume security | P0 | Private storage, upload validation, authorized access, retention | No public resume exposure |
| 5. Job lifecycle | P0 | Admin create/edit/publish/close, discovery, pagination | Role, deadline, visibility tests pass |
| 6. Eligibility engine | P1 | Structured/versioned criteria, reasons, override audit | Boundary and policy tests pass |
| 7. Application lifecycle | P0 | Apply, unique constraint, status transitions/history | Duplicate and unauthorized transitions blocked |
| 8. Student web experience | P1 | Auth, dashboard, profile, jobs, apply, tracking | E2E student journey passes |
| 9. Admin web experience | P1 | Dashboard, students, jobs, applicant review, reports | E2E admin journey passes |
| 10. Notifications & audit | P1 | Event queue, email/in-app notifications, audit search | Delivery retries and traceability verified |
| 11. Resume intelligence | P2 | Parsing, normalization, corrections, parser evaluation | Quality threshold approved |
| 12. AI matching | P2 | Scoring, explanation, versioning, evaluation/fairness | Human-reviewed pilot approved |
| 13. Production launch | P0 gate | CI/CD, backups, restore, monitoring, security review | Go-live checklist signed |

## 3. Work breakdown and deliverables

Each phase must include:
- user stories and acceptance criteria,
- data/API contract updates,
- UI states where applicable,
- server validation and authorization,
- unit/integration/E2E tests,
- security/privacy review,
- documentation and release notes,
- deployment/rollback considerations.

## 4. Priority model

- **P0:** release blocker / essential safe workflow.
- **P1:** required for a complete operational product.
- **P2:** advanced capability after core workflow is reliable.

## 5. Dependencies

- Eligibility depends on approved college/company policy and clean student academic data.
- Applications depend on stable job lifecycle and eligibility evaluation.
- Frontend depends on stable API contracts and auth behavior.
- AI matching depends on secure resume handling, validated profile/job data, parser evaluation, and a privacy review.
- Notifications depend on event definitions and delivery provider decisions.
- Production launch depends on backups, monitoring, secret rotation, and security review.

## 6. Release gates

**Gate A — Data safety:** authorization/ownership, private resumes, no secret leakage, retention policy.

**Gate B — Functional correctness:** happy paths, invalid input, missing records, duplicate submissions, race conditions, status transitions.

**Gate C — UX quality:** responsive, accessible, empty/loading/error/success states.

**Gate D — Operations:** health checks, logs, alerts, backup/restore, deployment rollback.

**Gate E — AI governance:** model/version traceability, evaluation, fairness, explainability, human oversight.

## 7. Change control

A new feature request must include problem, actor, scope, acceptance criteria, dependencies, data impact, security/privacy risk, test plan, and milestone impact. Product owner approves scope changes. Keep completed, in-progress, blocked, and planned work explicitly separated.

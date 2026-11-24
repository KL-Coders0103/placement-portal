# 04 — Scope and Roadmap

## Phase 0: Engineering foundation
Monorepo, TypeScript strict, lint/format, env validation, CI, Express bootstrap, structured errors, health endpoints, Mongo/Redis connections, auth and membership foundation, audit event infrastructure.
Exit: privileged roles cannot be self-assigned; protected API has positive and negative tests.

## Phase 1: Identity and student readiness
Student invite/activation, verification, login/refresh/logout/reset, institution/cohort, student profile, academic verification, private resume upload and versioning.
Exit: a student cannot access another student's profile or documents.

## Phase 2: Employer and opportunities
Company onboarding and verification, recruiter invites, opportunity draft/review/approval/publication, structured eligibility rules.
Exit: unapproved company cannot publish; student sees only published opportunities in permitted cohort.

## Phase 3: Applications and recruitment
Application submission, duplicate prevention, withdrawal, status timeline, reviewer assignment, recruiter redacted applicant view, drive stages, interviews and offers.
Exit: cross-student/company/institution tests pass; all privileged transitions are auditable.

## Phase 4: Notifications and dashboards
In-app/email notifications, role-specific dashboards, announcements, deadlines and report filters.
Exit: retry-safe delivery and metrics reconcile with source records.

## Phase 5: Operations and analytics
Bulk roster import with preview/reconciliation, exports with audit and row limits, academic-year management, leadership aggregate reports.
Exit: export fields are allowlisted and small-cohort privacy is tested.

## Phase 6: Optional AI
Private resume parsing, student-confirmed extraction, explainable skill matching, versioned evaluation and bias/accuracy review.
Exit: AI is advisory only and can be disabled without breaking core workflows.

## Phase 7: Production hardening
Load/soak tests, security review, restore drills, incident runbooks, accessibility audit, monitoring, SLO/RPO/RTO approval.
Exit: operational owner signs off support, security, recovery and release plan.

## MVP exclusions
Native mobile app, public job marketplace, payroll, full ATS replacement, automated hiring decisions, social feed and paid billing.

## Release gates
Approved acceptance criteria; permission tests; threat/data review; schema/index and rollback plan; tests/build; safe logs; observability; feature flag for risky rollout; documentation and support notes. Implement complete vertical slices rather than screens disconnected from backend.
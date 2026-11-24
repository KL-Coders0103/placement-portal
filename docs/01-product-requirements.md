# 01 — Product Requirements

## Vision and problem
Colleges coordinate placements through spreadsheets, email, chat groups and disconnected job sites. This causes duplicated records, unclear eligibility, missed deadlines, uncontrolled resume sharing, inconsistent recruitment statuses and unreliable reports. Placement Portal centralizes these workflows with role-specific access and an audit trail.

## Outcomes
- One verified student record per institution membership.
- Approved employer and opportunity lifecycle.
- Consistent, explainable eligibility decisions.
- One application per student/opportunity.
- Traceable recruitment-stage and offer history.
- Scoped dashboards and reproducible reports.
- Privacy-preserving access to student records and resumes.

## Users
Students; placement administrators and reviewers; company owners and recruiters; placement directors; platform operators. Each user acts through an active institution/company membership. A user may hold multiple memberships, but the server resolves and validates the active context.

## Functional requirements
FR-01 Secure authentication, email verification, sessions and password recovery.
FR-02 Institution membership, cohort and academic-year management.
FR-03 Student profile, education, skills, projects, experience and private resume versions.
FR-04 Student verification and correction workflow.
FR-05 Employer application, verification, suspension and recruiter invitations.
FR-06 Opportunity drafting, review, approval, publication, pause and closure.
FR-07 Structured eligibility criteria with versioned evaluation and reason codes.
FR-08 Student opportunity discovery, application, withdrawal and status timeline.
FR-09 Recruiter applicant review restricted to owned/assigned opportunities.
FR-10 Configurable recruitment drives, rounds, interviews and offers.
FR-11 In-app/email notifications with retries and deduplication.
FR-12 Role-specific dashboards, aggregate reports and audited exports.
FR-13 Append-only audit events for privileged actions.
FR-14 Optional resume parsing and explainable matching; AI cannot make hiring decisions.

## Non-functional requirements
Security: deny by default, RBAC plus ownership/tenant checks, server validation, private files.
Performance: pagination, query indexes, caching for safe aggregates, async expensive work.
Scalability: stateless API, horizontally scalable workers, managed database/cache/object storage.
Accessibility: WCAG 2.2 AA target.
Reliability: backups, restore drills, bounded retries, idempotent workers and monitoring.
Maintainability: TypeScript strict mode, modular boundaries, tests and documented schema changes.

## Business policies that must be configurable
CGPA scale and cutoff; branch/year eligibility; backlog rules; application limits; withdrawal cutoff; recruiter visibility of phone/email/CGPA/resume; offer acceptance effect; rejection feedback visibility; data retention and consent. Never hard-code institution policy in controllers.

## Non-goals
Replacing a full employer ATS/payroll system, guaranteeing placement, public student-directory search, automatic hiring decisions, or a native mobile app in the first release.

## Success measures
Track profile completion, approved opportunity count, application conversion, time-to-review, interview/offer outcomes, duplicate prevention, audit coverage and support incidents. Define every metric's numerator, denominator and time window.
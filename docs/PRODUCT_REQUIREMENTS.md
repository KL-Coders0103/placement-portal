# Placement Portal — Product Requirements Document

**Version:** 1.1  
**Status:** Proposed product baseline; institution policies and provider decisions remain configurable/open where noted  
**Product:** Institution-governed placement and recruitment management platform  
**Primary audience:** Students, placement-cell teams, approved employers, institutional leadership

## 1. Product vision

Placement Portal provides one trusted digital workspace for the complete campus placement lifecycle: student readiness, employer onboarding, opportunity approval, eligibility, applications, recruitment rounds, interviews, offers, communications and placement analytics.

The product replaces fragmented spreadsheets, email threads and chat-based coordination with structured records, transparent workflows, scoped access and auditable decisions. It is not an unrestricted public job board and does not guarantee employment.

## 2. Product goals

1. Maintain accurate, verified student and academic records.
2. Give students a clear view of opportunities for which they may apply.
3. Ensure only approved employers and approved opportunities are visible to eligible cohorts.
4. Apply institution-configured eligibility rules consistently and explain the result.
5. Prevent duplicate applications and preserve a reliable application history.
6. Coordinate reviewers, recruitment stages, interviews and offers.
7. Give employers access only to their own approved opportunities and authorized applicant information.
8. Provide leadership with accurate aggregate placement outcomes.
9. Protect resumes, contact information, academic records and offer documents.
10. Support responsive, accessible use on desktop, tablet and mobile browsers.

## 3. Product actors

| Actor | Main needs | Primary boundary |
|---|---|---|
| Visitor | Learn about the platform and sign in | Public content only |
| Student | Profile, resume, opportunities, eligibility, applications, interviews, offers | Own records and institution-visible content |
| Placement reviewer | Review assigned students/applications and record feedback | Explicit assignments and institution scope |
| Placement administrator | Operate institution placement workflows | Active institution and granted permissions |
| Placement director | Monitor outcomes and approve explicitly delegated actions | Institution-level aggregate data by default |
| Company owner | Maintain approved company profile and recruiter team | Own company |
| Recruiter | Manage company opportunities and authorized applicants | Own company and assigned/approved opportunity scope |
| Platform operator | Manage tenant/platform configuration and health | No default access to student content |
| Platform security administrator | Handle exceptional security operations | Time-bound, audited privileged access |

A person may hold more than one membership. The active institution/company context must be resolved and validated by the server on every protected request.

## 4. Product surfaces

- **Public surface:** product information, sign-in, registration/invitation acceptance and public help pages.
- **Student workspace:** personal dashboard, profile, academic record, resume vault, opportunities, eligibility, applications, interviews, offers, notifications and settings.
- **Placement workspace:** student directory, verification, company approvals, opportunity review, drives, applications, reviewer assignment, interviews, announcements, reports and audit.
- **Employer workspace:** company profile, team invitations, opportunities, applicant pipeline, interviews and notifications.
- **Leadership workspace:** aggregate placement overview, cohort/program trends, company participation and approved reports.
- **Platform operations workspace:** tenant configuration, health, security events and support access controls.
- **Shared API and worker:** authoritative business rules, persistence, file access, notifications and background processing.

## 5. Functional requirements

### Identity and tenancy
- PR-001: Secure sign-in, email verification, password recovery, session refresh and revocation.
- PR-002: Invitation/policy-controlled student activation and controlled provisioning of privileged users.
- PR-003: Institution, academic year, program, department, cohort and membership management.
- PR-004: Company onboarding, verification, suspension and recruiter invitations.
- PR-005: A user can have multiple memberships but must act in a validated active context.

### Student readiness
- PR-010: Student profile with contact, education, skills, projects, experience, certifications and preferences.
- PR-011: Separate self-reported and institution-verified attributes.
- PR-012: Profile completeness based on institution-required fields.
- PR-013: Private resume upload, versioning, preview and authorized download.
- PR-014: Changes to verified academic facts create a review request rather than silently replacing verified data.

### Opportunities and eligibility
- PR-020: Employer drafts opportunities and submits them for institution review.
- PR-021: Placement staff approve, request changes, reject, publish, pause and close opportunities.
- PR-022: Eligibility criteria support program, branch, graduation year, CGPA scale/minimum, backlog policy and configurable conditions.
- PR-023: Eligibility results include reason codes and identify missing/unverified information.
- PR-024: Students discover only published opportunities visible to their institution/cohort.

### Applications and recruitment
- PR-030: One application per student and opportunity.
- PR-031: Application submission checks deadline, publication state, membership, eligibility and required profile fields.
- PR-032: Application stores relevant profile, resume and eligibility snapshots.
- PR-033: Student sees own application timeline and can withdraw only within policy.
- PR-034: Recruiters see only authorized applicants for their own opportunities and only permitted fields.
- PR-035: Reviewers can be assigned and may record internal or candidate-visible feedback according to permission.
- PR-036: Stage transitions are validated, timestamped and auditable.

### Interviews, offers and reporting
- PR-040: Placement staff/recruiters schedule interviews with explicit timezone handling.
- PR-041: Candidates see invitations, confirm/decline and request rescheduling according to policy.
- PR-042: Offers have private documents, expiry and accepted/declined/revoked/expired states.
- PR-043: Dashboards show role-scoped, reproducible metrics.
- PR-044: Exports require permission, field allowlists, row limits and audit records.
- PR-045: Notifications are persisted, deduplicated and retry-safe.

## 6. Business rules requiring institution configuration

Do not hard-code these in controllers or UI:
- CGPA scale and conversion policy.
- Minimum CGPA, backlog/active-backlog rules and branch/program eligibility.
- Graduation-year and cohort visibility.
- Profile fields required before applying.
- Maximum applications and withdrawal cutoff.
- Whether recruiters can see phone, email, CGPA, resume or other fields.
- Who may approve/publish opportunities and override eligibility.
- Whether accepting an offer affects other applications.
- Candidate-visible rejection feedback.
- Data retention, consent and export policy.

Every policy change must have an effective date, actor, reason and audit record. Preserve the policy version used for prior eligibility evaluations.

## 7. Non-functional requirements

- Security: deny by default; RBAC plus tenant, company, ownership, assignment and field checks.
- Privacy: collect minimum data; private file storage; purpose-limited access and retention.
- Accessibility: WCAG 2.2 AA target.
- Performance: pagination, indexes, bounded payloads, caching only safe aggregates and asynchronous expensive work.
- Reliability: idempotent jobs, durable state transitions, backups, restore drills and monitoring.
- Scalability: stateless API instances, horizontally scalable workers and managed database/cache/storage.
- Maintainability: strict TypeScript, modular boundaries, automated tests and versioned contracts.

### 7.1 Dynamic-data rule (product-level)

Every user-visible value in the delivered product must come from the live API at request time. This is a product promise, not only an engineering constraint.

The following are explicitly forbidden in delivered code paths:

- Hardcoded student, opportunity, application, company, or user records presented as live data.
- Static metric numbers (e.g., a dashboard stat card with a literal value).
- Fabricated company logos, testimonials, profile pictures, or help-center content presented as if produced by real users.
- Client-side filtering used as a substitute for server-side authorization.
- "Fake delay" timeouts to simulate loading in shipped code.
- Status, role, or type strings duplicated across files instead of shared enums.

Allowed exceptions:

- `__DEV__` only: synthetic seed data loaded via `scripts/seed:dev`, clearly labelled with a development banner.
- Test and Storybook fixtures (never imported by production code).
- Static marketing, help, and legal copy on public pages.

Verification: a CI lint rule flags literal values bound to data slots in production components unless the value comes from a variable, hook, or shared constant.

## 8. Success metrics

Define numerator, denominator, cohort and time window before publishing:
- Student profile completion rate.
- Verified student readiness rate.
- Approved employer and published opportunity counts.
- Eligible-to-application conversion.
- Median time from application to first review.
- Interview and offer conversion by cohort.
- Accepted offer count and placement rate using an institution-approved definition.
- Notification delivery success and queue retry rate.
- Duplicate application prevention and authorization-denial incidents.

## 9. Non-goals for initial release

A full employer ATS, payroll, public social network, guaranteed-placement service, automated hiring decision engine, paid billing, native mobile apps and public student-directory search are not initial-release requirements.

## 10. Acceptance principle

A feature is not complete because a screen or endpoint exists. It is complete only when the workflow is persisted, validated, authorized, audited where required, tested for negative access, responsive, accessible and documented.
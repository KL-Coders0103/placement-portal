# Placement Portal — Project Requirements Specification

**Version:** 1.0  
**Status:** Proposed engineering baseline  
**Repository:** `KL-Coders0103/placement-portal`  
**Database name:** `placementPortal` (proposed local/default name)  
**API prefix:** `/api/v1`

## 1. Purpose

Build a secure, multi-role, institution-governed placement management web platform. The platform coordinates student readiness, employer verification, opportunity approvals, eligibility, applications, recruitment, interviews, offers and placement reporting.

The system must implement real end-to-end workflows. Static mock dashboards, frontend-only status changes, fake eligibility and unprotected resume URLs are not acceptable as delivered functionality.

## 2. Objectives

1. Establish a reliable source of truth for student, company, opportunity and application records.
2. Enforce institutional and company boundaries on every protected operation.
3. Standardize opportunity approval and recruitment state transitions.
4. Make eligibility transparent, explainable and configurable.
5. Protect personal, academic and recruitment data.
6. Provide actionable role-specific workspaces.
7. Produce traceable, reproducible placement reports.
8. Support incremental delivery without premature microservice complexity.

## 3. Scope

### 3.1 Initial scope
- Single responsive web application with role-specific workspaces.
- Shared versioned API and background worker.
- Authentication, sessions, invitations and membership context.
- Institution structure, academic year, program, department and cohort.
- Student profiles, verification, resume vault and profile completeness.
- Company applications, verification and recruiter team.
- Opportunity authoring, review, approval, publication and closure.
- Eligibility rules and evaluation history.
- Applications, reviewer assignments and status history.
- Recruitment drives, stages, interviews and offers.
- In-app/email notifications and announcements.
- Dashboards, reports, exports and audit history.
- Security, accessibility, observability, tests and deployment documentation.

### 3.2 Explicitly deferred unless approved
- Native Android/iOS applications.
- Public multi-institution job marketplace.
- Payroll, attendance and employee onboarding after hiring.
- Full employer ATS replacement.
- Automated resume ranking, candidate rejection or hiring decisions.
- Paid subscriptions, billing and payment gateway.
- Social feed, chat between all users and public student search.
- AI resume parsing/matching before privacy and bias review.

## 4. System boundaries

| Component | Responsibility | Proposed local address |
|---|---|---|
| Web application | Public, student, placement, employer and leadership UI | `http://localhost:5173` |
| API | Authentication, authorization, domain use cases and persistence | `http://localhost:3000` |
| API docs | OpenAPI/Swagger | `http://localhost:3000/api/docs` |
| Worker | Notifications, file scanning, exports and scheduled tasks | No public listener |
| MongoDB | System of record | Local configured URI |
| Redis | Queue, rate-limit/cache/session support as approved | Local configured URI |

These ports are proposed development defaults and must be overridden through validated environment configuration. The browser must never connect directly to MongoDB or Redis.

## 5. User types and access

- Student: own profile, resumes, opportunities visible to their cohort, own applications/interviews/offers.
- Placement reviewer: assigned students/applications only.
- Placement administrator: institution-scoped operations permitted by role.
- Placement director: aggregate institution reporting and explicitly delegated approvals.
- Company owner: own company profile/team and company opportunities.
- Recruiter: own company and authorized opportunity/applicant scope.
- Platform operator: tenant configuration and platform health, without default access to student records.
- Platform security administrator: exceptional, audited security controls.

A user account is not equivalent to a role. Access requires an active membership, valid workspace context and resource-level authorization.

## 6. Functional requirements

### 6.1 Identity and account
Registration/activation, email verification, login/logout, password reset, rotating refresh sessions, session list/revocation, account suspension and membership selection. Public registration payloads must not assign privileged roles or tenant identifiers.

### 6.2 Institution administration
Create and manage institution, academic year, programs, departments, cohorts, student roster imports, membership status, policy settings and staff assignments. Bulk import must provide preview, validation errors and reconciliation before commit.

### 6.3 Student profile
Profile fields are grouped into personal, academic, skills, projects, experience, certifications, preferences and documents. Store verification state per relevant field/section. Keep recruiter-visible preview separate from private account data.

### 6.4 Employer and opportunities
Employer application, verification evidence, approval/rejection/change request/suspension, company team invitations, opportunity draft, review, approval, publication, pause, close and archive.

### 6.5 Eligibility and application
Versioned criteria, explainable reason codes, missing-data handling, override with reason, duplicate prevention, snapshot creation, withdrawal policy and immutable status history.

### 6.6 Recruitment operations
Drives, configurable stages, reviewer assignments, assessment records, interview schedules, candidate responses, offers and outcome tracking.

### 6.7 Communication and analytics
In-app/email notifications, announcements, deadline reminders, role-scoped dashboard summaries, aggregate reporting and audited exports.

## 7. Data integrity requirements

- Use MongoDB ObjectId identifiers consistently at API boundaries.
- Normalize emails and enforce unique indexes.
- Enforce one application per student/opportunity with a compound unique index.
- Store application status history separately from the current status projection.
- Preserve criteria/profile/resume snapshots used at application time.
- Use conditional updates and transactions where multi-document consistency is required; MongoDB transactions require an appropriate replica-set deployment.
- Make queue jobs idempotent and deduplicate event delivery.
- Use UTC timestamps; retain IANA timezone for scheduled interviews.
- Store file metadata and private object keys, not public URLs as authorization.
- Keep audit history append-only.

## 8. API and integration requirements

All APIs use `/api/v1`, JSON response envelopes, server-side schema validation, consistent error codes, pagination, request IDs and explicit authorization. Multipart uploads are limited to approved endpoints or use a private upload handshake. External email, storage, scanning and AI providers are adapters behind backend interfaces.

## 9. Non-functional requirements

| Area | Requirement |
|---|---|
| Security | OWASP-aligned controls, least privilege, tenant isolation and secret hygiene |
| Privacy | Purpose limitation, field-level visibility and retention policy |
| Performance | Indexed filters, pagination, bounded exports and async processing |
| Scalability | Stateless API, worker concurrency controls and horizontal scaling |
| Reliability | Health checks, retries, idempotency, backup and tested restore |
| Accessibility | WCAG 2.2 AA target and keyboard-complete workflows |
| Compatibility | Current evergreen desktop/mobile browsers |
| Maintainability | Strict TypeScript, modular code and versioned docs/contracts |

## 10. Error and edge cases

Handle expired invitations, reused verification tokens, revoked sessions, suspended memberships, multiple active memberships, changed eligibility after application, missing academic data, deadline boundary, duplicate submissions, simultaneous status transitions, recruiter removal, company suspension, interview timezone changes, expired offers, file scan failures, notification provider outage and export cancellation.

## 11. Definition of done

A feature requires approved acceptance criteria, UI/API/database integration, validation, permission and ownership checks, audit/outbox behavior where relevant, positive and negative tests, loading/empty/error/forbidden UI states, responsive/accessibility checks, documentation updates and observed passing quality gates. Never report a test as passed unless it was run.

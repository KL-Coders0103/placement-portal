# Placement Portal — Master Feature Implementation Document

**Project:** Placement Portal  
**API:** `/api/v1`  
**Theme:** Light only  
**Execution:** Phase-by-phase, end-to-end vertical slices  
**Status:** Scope baseline; implementation status must be recorded in IMPLEMENTATION_TRACKER.md

> This document is the detailed feature execution contract. It defines what must be built and verified. It does not claim that any listed feature is already implemented.

## Global implementation rules

- Inspect the actual repository and existing source before editing.
- Implement API, persistence, authorization, audit, tests and UI together for each vertical slice.
- All tenant/company/resource boundaries are enforced server-side.
- Use institution-configured policy, not hardcoded CGPA/backlog/application rules.
- Keep private resumes and offer documents in private storage.
- Every asynchronous action must be retry-safe and observable.
- Each page includes loading, empty, error, forbidden and success states.
- No feature is complete without positive and negative tests and tracker evidence.

---

## PHASE 01 — Repository Foundation and Runtime

### 1.1 Repository and workspace
- Inspect existing repository tree, branches, scripts and dependencies.
- Use **npm workspaces** as the package manager (per DECISIONS.md BASE-016); commit one `package-lock.json` at repo root.
- Establish `apps/web`, `apps/api`, `apps/worker`, `packages/shared`, `packages/config` and `docs/`.
- Configure TypeScript strict mode, path aliases, lint, formatting and editor settings.
- Add environment examples, `.gitignore`, README and contribution workflow.
- Configure CI for install, lint, typecheck, tests and build.

### 1.2 Web foundation
- React + TypeScript + Vite + Tailwind.
- Router, query client, form provider, error boundary and toast system.
- Light-only design tokens wired into Tailwind config and CSS variables.
- Public, authentication and protected route groups.
- Single API client scaffold at `apps/web/src/lib/api/client.ts` (no feature may call `fetch` directly).
- Zod-validated env schema at `apps/web/src/lib/env/env.ts`; app fails at boot if `VITE_*` variables are invalid or missing.

### 1.3 API foundation
- Express 5 + TypeScript bootstrap.
- Versioned `/api/v1` routing, centralized errors, request IDs and structured logs.
- Input validation, security headers, restrictive CORS and rate-limit middleware.
- OpenAPI/Swagger and liveness/readiness endpoints.
- Zod-validated env schema at `packages/shared/src/env/api.ts`; API fails startup if any required variable is missing or invalid.
- **No hardcoded credentials, connection strings, tokens or secrets anywhere in code.** All configuration comes from environment variables.

### 1.4 Infrastructure foundation
- MongoDB connection and Mongoose conventions (single-node replica set locally via `infra/docker-compose.yml`).
- Redis connection and BullMQ setup.
- Worker bootstrap and graceful shutdown.
- Local synthetic seed scripts and health checks.
- Docker Compose file providing MongoDB (replica set), Redis and MinIO for local development.

**Exit criteria:** Web, API and worker run independently; env validation works; health checks work; CI quality baseline passes; no secrets or hardcoded data exist in the repo.

## PHASE 02 — Identity, Authentication and Membership

### 2.1 User lifecycle
- Student invitation or institution-controlled activation.
- Employer application and pending company status.
- Privileged user provisioning only by authorized operator/admin process.
- Email verification and resend with cooldown.
- Login, logout, logout-all, forgot/reset password.
- Account suspension, reactivation and session revocation.

### 2.2 Session security
- Password hashing using Argon2id or approved equivalent.
- Short-lived access credential and rotating refresh sessions.
- Hashed refresh-token storage, reuse detection and token-family revocation.
- Session/device listing and revocation.
- Rate limits and generic authentication errors.
- MFA/step-up policy decision for privileged roles.

### 2.3 Membership context
- User may have multiple institution/company memberships.
- Active workspace selection is validated by API.
- Membership status and permissions are rechecked on protected requests.
- Switching workspace clears tenant-scoped frontend cache.

**Exit criteria:** Users cannot self-assign privileged roles or tenant IDs; revoked/suspended memberships lose access immediately; auth and IDOR tests pass.

## PHASE 03 — Institution Structure and Student Records

### 3.1 Institution setup
- Institution profile, slug, timezone and status.
- Academic years, programs, departments and cohorts.
- Institution staff memberships and role assignment.
- Versioned institution policy configuration.
- Active/inactive academic year transitions.

### 3.2 Student onboarding
- Invite/import students.
- Import preview with row-level validation and duplicate detection.
- Reconciliation and explicit commit.
- Student activation and membership linking.
- Student directory with scoped search, filters and pagination.

### 3.3 Student profile
- Personal/contact data.
- Academic details: student number, program, department, cohort, graduation year, CGPA value/scale and backlog information.
- Skills, projects, experience, certifications and preferences.
- Field/section verification state.
- Profile completeness from configured required fields.
- Student correction requests for verified fields.
- Audit every privileged verification/edit.

**Exit criteria:** Institution A cannot access Institution B records; verified facts cannot be silently overwritten; imports are previewed and auditable.

## PHASE 04 — Resume Vault and Private Documents

- Upload intent or approved upload endpoint.
- PDF allowlist initially; file size, MIME and signature validation.
- Server-generated object keys and private storage.
- Quarantine and malware scan state.
- Resume version history, label and default selection.
- Authorized preview/download and short-lived access.
- Student deletion request subject to retention.
- Offer document storage using the same private-file controls.
- Upload failure, scan pending, rejected and retry UI states.

**Exit criteria:** Public URL access is impossible; another student/recruiter cannot fetch unauthorized files; unscanned files are not available.

## PHASE 05 — Employer Onboarding and Company Governance

- Company application with legal/display name, domain, website, industry and evidence.
- Company verification queue.
- Approve, reject, request changes and suspend.
- Company owner membership.
- Invite recruiter with expiring single-use token.
- Accept/revoke invitation.
- Company team roles and removal.
- Company audit history.
- Prevent suspended company/recruiters from creating or managing opportunities.

**Exit criteria:** Unapproved/suspended company cannot publish or access applicant records; recruiter membership is company-scoped.

## PHASE 06 — Opportunity Management and Approval

- Opportunity draft form: title, type, description, responsibilities, skills, location, work mode, compensation (optional), openings and dates.
- Cohort/program visibility selection.
- Structured eligibility criteria.
- Attachments with file security.
- Recruiter draft/edit/submit.
- Placement review queue with approve, request changes and reject.
- Publish only after approval.
- Pause, resume, close and archive with reason and audit.
- Published edit creates a new review version where policy requires.
- Student-facing opportunity list/detail with search, filters and sort.

**Exit criteria:** Only approved/published opportunities appear to permitted cohorts; expired/closed opportunities cannot accept applications.

## PHASE 07 — Eligibility Engine and Student Discovery

- Institution policy version and opportunity criteria version.
- Eligibility evaluation against verified student profile.
- Result states: ELIGIBLE, INELIGIBLE, NEEDS_REVIEW.
- Reason codes for each passed/failed/missing criterion.
- Missing or unverified academic data does not silently pass.
- Re-evaluate when profile or criteria version changes.
- Record evaluation timestamp and profile/criteria version.
- Admin override only with permission, reason and audit.
- Student opportunity filters: type, location/work mode, skills, deadline and eligibility.
- Clear explanation of eligibility and application requirements.

**Exit criteria:** Unit tests cover boundary values, scale differences, missing data and backlog policies; results are reproducible for a recorded policy/profile version.

## PHASE 08 — Applications and Candidate Pipeline

- Apply action with confirmation and required resume selection.
- Validate opportunity state, deadline, cohort, membership, eligibility and required fields.
- Enforce unique student/opportunity application.
- Persist profile, resume and eligibility snapshots.
- Application list/detail for student.
- Student withdrawal subject to policy and cutoff.
- Recruiter applicant list scoped to own authorized opportunity.
- Field-level recruiter DTO redaction.
- Reviewer assignment and reassignment.
- Internal vs candidate-visible notes.
- Application timeline with actor, timestamp and visible reason.
- Conditional state transitions and immutable status history.

**Exit criteria:** Duplicate/concurrent submissions cannot create multiple applications; cross-student/company access tests pass; all transitions are audited.

## PHASE 09 — Drives, Assessments and Interviews

- Create drive linked to approved opportunity.
- Configure ordered stages and stage types.
- Move candidates through permitted stages.
- Add assessment outcome/notes with visibility controls.
- Schedule interview with start/end, timezone, mode and location/meeting details.
- Invite candidate and interviewers.
- Candidate confirm/decline/reschedule request.
- Interviewer attendance/outcome.
- Conflict detection and reschedule history.
- Notifications for invitations and changes.
- Calendar export/integration is optional and requires a decision.

**Exit criteria:** Timezone and scheduling boundary tests pass; only authorized participants see meeting details; schedule changes are audited.

## PHASE 10 — Offers and Placement Outcomes

- Create draft offer with role/title, compensation (restricted), expiry and private document.
- Review/issue offer.
- Candidate accept/decline before expiry.
- Expire/revoke offer with reason and permission.
- Prevent conflicting concurrent responses.
- Record accepted-offer outcome without conflating OFFERED and ACCEPTED.
- Institution-configured rule for effects on other applications.
- Placement outcome report and verified placement definition.
- Student-facing offer details with field-level visibility.

**Exit criteria:** Expired/revoked offers cannot be accepted; only authorized users access compensation and offer documents; outcomes reconcile with application history.

## PHASE 11 — Notifications, Announcements and Dashboards

### Notifications
- In-app notifications and read state.
- Email adapter and templates.
- Events: invitation, verification, opportunity publication, deadline reminder, application submission, stage change, interview, offer and announcement.
- Deduplication, retries, provider failures and delivery history.
- No sensitive resume/academic data in email.

### Announcements
- Institution audience targeting by cohort/program/role.
- Draft, schedule, publish, expire and archive.
- Audit audience and author.

### Dashboards
- Student: profile completeness, eligible opportunities, deadlines, applications, interviews and offers.
- Placement admin: verification queues, employer approvals, opportunities, active drives, pending reviews and outcomes.
- Recruiter: own opportunities, applicant pipeline, review tasks and interviews.
- Reviewer: assigned workload and due tasks.
- Director: aggregate institution outcomes and trends.
- Platform operator: platform health/tenant configuration without default student content access.

**Exit criteria:** Metrics have definitions and reconcile with source data; notification retries do not duplicate user-facing events.

## PHASE 12 — Reports, Exports and Governance

- Placement rate and outcome definitions approved by institution.
- Filters by academic year, cohort, program, department, company and opportunity type.
- Participation, application funnel, interview, offer and company reports.
- Aggregate leadership reports with small-group suppression.
- CSV/XLSX export only when explicitly authorized.
- Field allowlists, row caps, date bounds and asynchronous export jobs.
- Expiring private download links.
- Audit export request, download and expiry.
- Audit event search with restricted access.
- Retention and deletion workflow.

**Exit criteria:** Report totals reconcile with source records; unauthorized fields cannot be exported; export access is logged and expires.

## PHASE 13 — Optional AI Assistance (Deferred)

- Resume parsing extracts candidate-provided data into suggestions.
- Student reviews/edits and confirms extracted fields.
- Skill matching returns evidence, matched/missing skills, model/rule version and limitations.
- AI output is advisory and explainable.
- No automated shortlist, rejection, candidate ranking for selection or application mutation.
- Institution approval, data minimization and legal/privacy review before external AI.
- Disable AI without affecting core placement workflows.

**Exit criteria:** Human confirmation required; bias/accuracy review and audit are complete; AI cannot alter recruitment state.

## PHASE 14 — Production Hardening and Launch

- Security review and cross-tenant penetration tests.
- Accessibility audit and responsive QA.
- Load/soak tests for login, search, application submit and reports.
- Index/query-plan review and queue capacity tests.
- Monitoring, alert ownership and incident runbooks.
- Backup, restore and disaster recovery drills.
- Retention, privacy and data export/deletion policies.
- Production secrets, TLS, CORS, restricted database/network access.
- Support/admin training and release notes.
- Rollback and feature flag strategy.

**Exit criteria:** Institution owner, product owner and technical/security owner approve operational readiness, recovery objectives and known limitations.

---

## System-wide edge cases

- User has several memberships and switches context during an open form.
- Membership/company access is revoked during an active session.
- Institution policy changes after a student has applied.
- Student profile changes after eligibility evaluation.
- Opportunity closes while application submission is in flight.
- Recruiter is removed while assigned to an opportunity.
- Two reviewers update the same application concurrently.
- Interview is rescheduled across timezone/daylight-saving boundaries.
- Offer expires while candidate is responding.
- Worker retries after partial completion.
- File upload completes but metadata callback fails.
- Export is requested and then permission is revoked.
- Institution or company is suspended while workflows are active.

## Feature completion checklist

- [ ] Acceptance criteria approved.
- [ ] Schema/index and migration/backfill reviewed.
- [ ] API contract and validation implemented.
- [ ] Authentication, permission, tenant and resource scope tested.
- [ ] UI loading/empty/error/forbidden/success states implemented.
- [ ] Audit/history and outbox/notification behavior verified.
- [ ] Unit, integration, API/security and E2E tests added.
- [ ] Responsive and accessibility QA complete.
- [ ] Documentation and tracker updated.
- [ ] Commands and test results recorded truthfully.
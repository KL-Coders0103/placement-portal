# Placement Portal — UI/UX Guidelines

**Status:** Design and frontend implementation baseline  
**Theme:** Light theme only  
**Audience:** Students, placement staff, employers, reviewers and leadership  
**Reference:** DESIGN_SYSTEM.md is the source of truth for tokens

## 1. Product experience goals

### Student workspace
Help students understand readiness, discover relevant opportunities, see why they are eligible/ineligible, apply confidently, track each recruitment stage and respond to interviews/offers. Make deadlines and next actions obvious without creating anxiety or implying guaranteed placement.

### Placement workspace
Help staff verify records, review employers/opportunities, manage drives and applications, assign reviewers, resolve exceptions and generate trustworthy reports. Optimize for clarity, traceability and efficient high-volume operations.

### Employer workspace
Help approved company users maintain their company profile, submit opportunities, review authorized applicants and coordinate interviews. Clearly explain review/publishing status and institution feedback.

### Leadership workspace
Show aggregate outcomes and trends with metric definitions, date windows and cohort context. Avoid exposing unnecessary student-level data.

## 2. Design principles

1. Clarity before decoration.
2. Consistent patterns across workspaces.
3. Student experience mobile-first; operational workspaces desktop-first but responsive.
4. Accessibility by default.
5. Honest feedback: do not show success before API confirmation.
6. Protect sensitive actions with preview and confirmation.
7. Progressive disclosure for advanced filters and details.
8. Real API data only; no fake metrics.
9. Explain statuses and eligibility in plain language.
10. Privacy is visible: show who can view a profile or document.

## 3. Brand direction

Use the light palette from DESIGN_SYSTEM.md: white and pale neutral surfaces, navy structure, royal-blue primary actions, restrained teal accent and semantic success/warning/danger. Avoid dark theme, neon colors, excessive gradients, glass effects and oversized decorative hero sections in operational screens.

## 4. Shared application shell

- Public header with brand, product information, sign-in and help.
- Auth shell with focused form, clear validation and accessible recovery links.
- Authenticated shell with role-aware sidebar/navigation, top bar, active institution/company context, notifications, profile menu and breadcrumbs.
- Show active workspace/context explicitly.
- On context switch, confirm unsaved changes and clear tenant-scoped cached data.
- No navigation item is an authorization mechanism.

## 5. Navigation and page requirements

### Public and authentication
- Landing page: product value, audiences, workflow overview, privacy/security trust cues and sign-in CTA.
- Sign in: email/password, show/hide password, validation, rate-limit feedback and recovery.
- Verify email: token state, resend cooldown and expiry guidance.
- Forgot/reset password: generic response, expiry and success/error states.
- Invitation acceptance: show inviting institution/company and requested role before acceptance.

### Student workspace
- Dashboard: profile completion, verification summary, recommended next steps, eligible opportunity count, deadlines, active applications, interviews and offers.
- Profile: sectioned personal/academic/skills/projects/experience/certification/preferences forms; verified fields are clearly marked.
- Profile preview: exact recruiter-visible representation with field visibility explanation.
- Resume vault: version list, upload status, scan state, default selection and authorized preview/delete.
- Opportunities: searchable/filterable list with type, company, location/work mode, deadline and eligibility label.
- Opportunity detail: description, responsibilities, criteria, openings, deadline, company verification and application requirements.
- Eligibility breakdown: passed, failed and missing criteria with clear explanations; no misleading numeric score.
- Applications: list with current stage, last update and next action.
- Application detail: timeline, submitted snapshot, allowed withdrawal action and candidate-visible feedback.
- Interviews: date/time/timezone, mode, location/meeting info, response and reschedule actions.
- Offers: private offer details, expiry and accept/decline confirmation.
- Notifications/settings: read state, preferences and account/session controls.

### Placement administration
- Dashboard: verification queues, company approvals, opportunity review, open drives, application pipeline and outcomes.
- Students: searchable roster, cohort filters, verification status, profile detail and correction review.
- Imports: upload, map columns, preview errors/duplicates, reconcile and commit.
- Companies: approval queue, evidence, decision history, suspension and team overview.
- Opportunities: review queue, criteria preview, approve/request changes/reject, publish/pause/close.
- Drives: stage configuration, candidate progression and schedule.
- Applications: filters, assignment, authorized details, transition actions and audit timeline.
- Interviews: calendar/list views, conflicts, response and attendance.
- Announcements: audience builder, preview, schedule and expiry.
- Reports: clear metric definitions, filters, chart summaries and export permissions.
- Audit: restricted searchable history and export controls.
- Settings: institution profile, academic structure, versioned policy and role permissions.

### Employer workspace
- Company profile and verification status.
- Team members and invitation lifecycle.
- Opportunity list with draft/review/published/paused/closed states.
- Opportunity editor with eligibility and visibility preview.
- Applicant pipeline for owned opportunities only.
- Applicant detail with field-level redaction and authorized notes.
- Interview schedule and candidate responses.
- Notifications and account settings.

### Leadership workspace
- Placement overview by approved academic year.
- Program/department/cohort trend.
- Company participation and opportunity mix.
- Application/interview/offer funnel.
- Export only with permission and privacy suppression.
- No default access to resume files or private reviewer notes.

## 6. Tables, filters and search

Tables need loading skeleton, empty state, error/retry, pagination, sort, filter chips, clear-filters action and responsive detail view. Preserve filters in URL when useful. Avoid unbounded result sets. Show dates with timezone context when they affect deadlines or interviews.

## 7. Forms and validation

Every field has a visible label, helper text when needed and inline error. Validate on blur/submit without noisy errors on first render. Preserve safe input on recoverable server failure. Use explicit confirmation for publish, close, suspend, reject, offer issue/revoke, bulk import commit and export. Explain irreversible or externally visible effects.

## 8. Status and feedback language

Use consistent labels for pending, under review, approved, published, paused, closed, rejected, needs changes, eligible, ineligible, needs review, submitted, shortlisted, assessment, interview, offered, accepted, declined, withdrawn and expired. Distinguish "Offer issued" from "Offer accepted". Distinguish "Verified" from "Self-reported".

## 9. Responsive behavior

- 360px mobile: student tasks fully usable; tables become cards or detail lists.
- 768px tablet: collapsible navigation and responsive filters.
- 1024px laptop: full operational workspace.
- 1440px desktop: wider tables/charts with readable max content width.
Avoid horizontal page overflow. Do not hide critical actions on small screens.

## 10. Accessibility

Target WCAG 2.2 AA. Keyboard navigation, visible focus, semantic heading order, correct labels, screen-reader announcements, focus-managed dialogs, sufficient contrast, reduced motion and chart text alternatives are required. Never communicate status by color alone.

## 11. Trust, privacy and content

- Display recruiter-visible preview and explain visibility.
- Show file scan status and privacy notice near resume controls.
- Do not expose internal reviewer notes in student views.
- Show why eligibility is not confirmed.
- Explain report date range and denominator.
- Avoid language that promises selection, hiring or placement.
- Do not use fabricated company logos, student records, metrics or testimonials in production UI.

## 12. UI QA checklist

Test 360, 768, 1024 and 1440 widths; keyboard-only flow; 200% zoom; long names; empty/large datasets; validation failures; expired sessions; forbidden pages; loading and retry; contrast; focus; table overflow; timezone labels; and every light-theme state.

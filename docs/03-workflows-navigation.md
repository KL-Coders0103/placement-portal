# 03 — Workflows, State Machines and Navigation

## Public routes
/ ; /auth/sign-in ; /auth/verify ; /auth/forgot-password ; /auth/reset-password ; /access-pending.

## Student routes
/student/dashboard ; /student/profile ; /student/profile/preview ; /student/resume ; /student/opportunities ; /student/opportunities/:opportunityId ; /student/applications ; /student/applications/:applicationId ; /student/interviews ; /student/notifications ; /student/settings.

## Placement operations routes
/admin/dashboard ; /admin/students ; /admin/students/:studentId ; /admin/companies ; /admin/companies/:companyId ; /admin/opportunities ; /admin/opportunities/:id ; /admin/drives ; /admin/drives/:id ; /admin/applications ; /admin/applications/:id ; /admin/interviews ; /admin/announcements ; /admin/reports ; /admin/audit ; /admin/settings.

## Employer routes
/employer/dashboard ; /employer/company ; /employer/team ; /employer/opportunities ; /employer/opportunities/:id ; /employer/opportunities/:id/applicants ; /employer/applicants/:applicationId ; /employer/interviews ; /employer/notifications ; /employer/settings.

## Leadership routes
/leadership/overview ; /leadership/reports ; /leadership/participation. Platform operator routes belong in a separate restricted workspace.

## Sign-in workflow
Credentials → server verifies password, account and membership → session issued → client fetches /auth/me → user selects active institution/workspace if multiple → server validates membership on every request → permitted navigation rendered. Frontend guards are UX only.

## Student workflow
Invited/pending → email verified → active membership → profile incomplete → profile complete → resume uploaded/scanned → opportunity discovery → eligibility check → application submitted → recruitment timeline → offer response. Profile edits increment profileVersion and trigger re-evaluation where relevant.

## Employer workflow
Company application → under review → approved / changes requested / rejected → owner invites recruiter → recruiter accepts invite → draft opportunity → submitted → admin review → approved → published.

## Opportunity state machine
DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED → PUBLISHED → PAUSED → PUBLISHED → CLOSED → ARCHIVED. Review may return CHANGES_REQUESTED or REJECTED. Only authorized admin publishes. Closing and reopening are audited.

## Application state machine
SUBMITTED → UNDER_REVIEW → SHORTLISTED → ASSESSMENT → INTERVIEW → OFFERED → ACCEPTED. Alternate terminal states: REJECTED, WITHDRAWN, DECLINED, ON_HOLD. Transitions are drive-configured and server-validated. ACCEPTED means candidate accepted the offer; it is not synonymous with OFFERED. Every transition appends ApplicationStatusEvent with actor, timestamp, reason and visibility.

## Interview and offer workflows
Interview: INVITED → ACCEPTED / DECLINED / RESCHEDULE_REQUESTED → CONFIRMED → ATTENDED / ABSENT / CANCELLED. Offer: DRAFT → ISSUED → ACCEPTED / DECLINED / EXPIRED / REVOKED. Use UTC timestamps plus timezone metadata.

## Transaction boundaries
Application submit: validate + unique insert + initial status event + outbox event. Transition: expected-current-status check + event append + projection update + outbox. Offer acceptance: conditional update. Notifications are dispatched after commit and are idempotent.

## UX states
Every route supports loading, empty, validation, forbidden, not found, server error and retry states. Never show success before durable API confirmation. Destructive actions explain impact and require confirmation.
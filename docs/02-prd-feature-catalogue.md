# 02 — PRD and Feature Catalogue

## A. Identity and onboarding
Student activation by invitation or institution-approved registration; recruiter application with pending status; admin provisioning for privileged roles; email verification; sign-in; password reset; rotating refresh sessions; logout current/all; session revocation. Public payloads must never assign roles, institution IDs, verification state or permissions.

## B. Student workspace
Profile sections: personal details, academic record, skills, projects, experience, certifications, preferences and private resume versions. Show profile completeness based on institution-required fields, verification status and recruiter-visible preview. Student can correct self-reported data; changes to verified academic facts create a review request. Resume upload validates type/size/signature, scans and stores privately.

## C. Company and recruiter workspace
Company application captures legal/display name, domain, website, industry and verification evidence. Admin approves, rejects, requests changes or suspends. Company owner invites recruiters using expiring, single-use invitations. Recruiters are company-scoped; they cannot view another company's opportunities or applicants.

## D. Opportunity management
Types include full-time, internship, apprenticeship and placement drive. Fields include title, description, responsibilities, required skills, location/work mode, compensation (optional), openings, eligibility criteria, visibility cohorts, opening/closing dates and attachments. Recruiter creates draft and submits; placement admin reviews and approves; only approved opportunities can be published. Changes after publication may require reapproval.

## E. Eligibility engine
Structured criteria: program, branch, graduation year, CGPA scale/minimum, backlog limit and institution-specific conditions. Store criteria version, profile version, evaluation time, result and reason codes. Results: eligible, ineligible, needs_review. Missing/unverified data must not silently pass. Admin override requires permission, reason and audit.

## F. Applications and recruitment
Submission validates opportunity state/deadline, membership, cohort visibility, eligibility policy, required profile fields and duplicate constraint. Save profile/resume/criteria snapshots. Student sees own timeline and can withdraw only within policy. Recruiter sees permitted applicant fields for own assigned opportunity. Admin can assign reviewers and record internal/student-visible notes. Every stage transition appends history.

## G. Drives, interviews and offers
Admin configures recruitment stages and schedules. Invitations are visible only to invited candidates. Time zones are explicit. Offer includes role, compensation visibility, expiry and private document. Offer lifecycle: draft, issued, accepted, declined, expired, revoked. Institution policy controls whether accepting an offer affects other applications.

## H. Notifications and announcements
Persist in-app notifications; email is an asynchronous adapter. Events: opportunity published, deadline reminder, application submitted, stage changed, interview invitation, announcement and offer action. Deduplicate per user/event/channel; do not include sensitive documents or academic details in email.

## I. Dashboards and reports
Student: profile completion, eligible opportunities, deadlines, applications, interviews. Admin: verification queues, employer approvals, pending jobs, drives, stage counts and outcomes. Recruiter: own opportunities, applicants, review tasks and interviews. Leadership: aggregate placement outcomes, cohort trends and company participation; suppress small groups to prevent identification.

## J. AI later phase
Resume parser extracts suggestions that the student confirms. Matching returns matched/missing skills, evidence, algorithm version, confidence and limitations. AI is advisory; it cannot shortlist, reject, rank for automatic selection or mutate application state.

Every feature acceptance test must cover actor, preconditions, permission scope, happy path, invalid input, forbidden access, persisted state, audit, notification and UI loading/empty/error states.
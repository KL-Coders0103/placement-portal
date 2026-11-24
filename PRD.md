# Product Requirements Document (PRD)

## Product summary

**Product:** AI-Powered College Placement Portal  
**Primary users:** Students and college placement administrators  
**Product type:** Web application with an API backend  
**Current state:** Backend foundation; frontend and AI service planned.

## Problem statement

Placement teams often coordinate student data, resumes, vacancies, eligibility, and applicant status through disconnected tools. This creates duplicated work, inconsistent records, delayed communication, and limited visibility for students.

## Product vision

Provide a single workflow for managing campus placement opportunities and student applications, with explainable AI-assisted matching as a later enhancement. Final selection remains a human responsibility.

## Goals

1. Centralize student profiles and placement opportunities.
2. Make application progress visible to students.
3. Give placement administrators a controlled way to manage vacancies and applicants.
4. Reduce repetitive resume review with optional skill extraction and match explanations.
5. Protect sensitive academic and resume data.

## Non-goals for the initial release

- Automated hiring or rejection without human review.
- Public exposure of student records/resumes.
- Company self-service portal until a later approved phase.
- Claims of AI accuracy before a representative evaluation dataset exists.
- Native mobile applications unless separately scoped.

## Personas

### Student
Wants a clear profile, relevant opportunities, a simple application flow, and reliable status updates.

### Placement administrator
Needs trustworthy student/job records, eligibility visibility, applicant lists, and traceable decisions.

### Company representative (future)
May eventually submit opportunities and view only candidates approved for sharing by the institution.

## Core user journeys

### Student onboarding
1. Student registers.
2. Student logs in.
3. Student reviews and completes profile details.
4. Student uploads a resume.
5. Student sees profile completeness and any missing required information.

### Find and apply
1. Student opens available jobs.
2. Student reviews role and eligibility requirements.
3. Student checks eligibility (once implemented).
4. Student submits an application.
5. Student sees a confirmation and can track status.

### Admin job and applicant management
1. Administrator authenticates.
2. Administrator creates or updates a job.
3. Administrator publishes/ closes the opportunity.
4. Administrator reviews applicants.
5. Administrator updates application outcomes with a recorded actor and timestamp.

### AI-assisted match review (future)
1. Resume content is extracted.
2. Student reviews/corrects extracted skills.
3. Matching service compares profile and job requirements.
4. UI explains matched and missing skills.
5. Administrator uses the score as decision support, not as an automatic decision.

## Feature requirements and acceptance criteria

| Feature | Priority | Acceptance criteria |
|---|---|---|
| Account registration/login | P0 | Valid account can register and log in; invalid credentials fail safely; passwords are hashed |
| Role-aware access | P0 | Protected endpoints reject missing/invalid tokens and unauthorized roles |
| Student profile | P0 | Student can read/update only their own profile |
| Resume upload | P1 | Only approved file types/sizes accepted; stored file is not anonymously exposed |
| Job management | P0 | Authorized staff can manage jobs; students can view published/open jobs |
| Applications | P0 | Valid student can apply once to open eligible job and view own status |
| Admin applicant review | P1 | Admin can list applicants and perform valid status changes |
| Eligibility rules | P1 | Job criteria are evaluated consistently and reasons are shown |
| Resume skill extraction | P2 | Extracted fields are reviewable and correction is supported |
| AI matching | P2 | Score includes matched/missing skills, version metadata, and limitations |
| Notifications | P2 | Events such as deadlines/status changes can be communicated reliably |

## UX principles

- Make the next action obvious for both student and administrator.
- Show status using text plus color, not color alone.
- Keep forms short and validate close to the relevant field.
- Provide clear feedback after upload and application submission.
- Explain eligibility and matching results rather than showing opaque numbers.
- Design responsive layouts for desktop, tablet, and mobile.

## Success metrics

- Share of active students with complete profiles.
- Share of open job postings with all required eligibility fields.
- Successful application completion rate.
- Duplicate/invalid application rate.
- Time required for administrators to review an applicant batch.
- Student-reported clarity of application status.
- Resume extraction correction rate and match recommendation quality (before AI feature is promoted).

## Risks and mitigations

- **Incorrect eligibility logic:** use explicit rules, test boundary cases, and show reasons.
- **Biased or misleading AI scores:** evaluate across cohorts, explain factors, retain human review, and allow appeals/corrections.
- **Sensitive data exposure:** enforce ownership checks, private storage, and audit access.
- **Unverified assumptions in docs:** mark planned features separately from implemented ones.

## Release definition

A feature is ready when its UI/API path, authorization, validation, failure states, tests, and docs are complete. A mock screen or proposed endpoint is not a delivered feature.

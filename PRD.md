# Product Requirements Document

## Document control
- Product: AI-Powered College Placement Portal
- Version: 2.0 (fresh product baseline)
- Status: Draft for product-owner review
- Primary platform: Responsive web application
- Core backend: Node.js + Express + MongoDB
- AI capability: Separate service planned; not part of the current API implementation

## 1. Vision

Give students a transparent place to manage their placement readiness and opportunities, while giving placement teams reliable tools to operate campus recruitment. AI should reduce repetitive resume review by explaining skill alignment, never by making unreviewable hiring decisions.

## 2. Problem and opportunity

Current placement operations can involve repeated spreadsheet updates, manual resume sorting, unclear eligibility rules, duplicate applications, and delayed status communication. A unified system can improve data quality, traceability, and student experience.

## 3. Goals and measurable outcomes

- Increase completeness and accuracy of student placement profiles.
- Reduce time to publish a job and review a candidate batch.
- Reduce duplicate/invalid applications.
- Make eligibility outcomes explainable and consistent.
- Let students see current application status.
- Measure resume extraction quality and recommendation usefulness before AI launch.

**North-star candidate:** percentage of active students who can complete a valid application to an eligible open opportunity without staff intervention.

Supporting metrics: profile completion rate, eligible-to-applied conversion, application error rate, admin review time, status update latency, support tickets, parser correction rate, and AI recommendation precision/recall on an approved evaluation set.

## 4. Personas

### Student
Needs: secure account, clear profile requirements, resume upload, relevant jobs, eligibility explanation, easy application, timely status.
Pain points: unclear criteria, repeated data entry, no visibility after applying.

### Placement administrator
Needs: accurate cohort data, job publishing, configurable eligibility, applicant review, audit history, reports.
Pain points: manual filtering, inconsistent records, difficult follow-up.

### Company representative (future)
Needs: submit approved vacancies and view authorized candidate information.
Not included in the first release.

### Platform operator
Needs: secure configuration, uptime, backups, logs, monitoring, and incident response.

## 5. Product principles

1. Student privacy by default.
2. Human-controlled placement decisions.
3. Explain eligibility and match recommendations.
4. Consistent workflows across devices.
5. Server-side enforcement; never trust the browser.
6. Incremental releases with measurable acceptance criteria.

## 6. Information architecture

### Student area
- Dashboard / placement readiness
- My profile
- Resume and extracted information
- Opportunities / job details
- Eligibility explanation
- My applications / status timeline
- Notifications
- Account settings

### Placement admin area
- Overview dashboard
- Students and cohort management
- Jobs and eligibility criteria
- Applicants by job
- Application review/status history
- Reports and exports
- Audit log
- Placement policy/settings

### Future company area
- Organization profile and verification
- Job request submission
- Applicant shortlist access under institution approval

## 7. Core user journeys

### Journey A — Student onboarding
1. Register with email and password.
2. Authenticate.
3. Complete academic/contact profile.
4. Upload resume securely.
5. Review parsed information when parsing becomes available.
6. See readiness checklist and missing data.

Success: student profile is saved, private resume reference is stored, and validation errors are actionable.

### Journey B — Discover and apply
1. Student browses published opportunities.
2. Opens a job and reviews role, deadline, and criteria.
3. Sees eligible/ineligible/needs-review with reasons.
4. Completes required profile/resume details.
5. Submits once.
6. Receives confirmation and tracks status.

Success: valid application persisted once; duplicate/closed/ineligible attempts fail safely with explanation.

### Journey C — Admin job and applicant workflow
1. Admin signs in with approved account.
2. Creates job and structured eligibility criteria.
3. Reviews preview and publishes.
4. Monitors applicants.
5. Reviews student profile/resume and optional match evidence.
6. Records shortlist/selection/rejection with reason.
7. Student status is updated and notification is queued.

Success: all changes are authorized, traceable, and visible to the appropriate student.

### Journey D — AI-assisted review (future)
1. Resume is processed asynchronously.
2. Student reviews extracted profile data.
3. Matching compares approved job criteria and profile.
4. UI shows matched/missing skills and evidence.
5. Admin makes independent decision.

Success: recommendation is reproducible, explainable, evaluated, and never silently changes application state.

## 8. Feature priority

| Priority | Features |
|---|---|
| P0 | Auth, role/ownership checks, profile, jobs, applications, API validation, private resume handling, audit essentials |
| P1 | Responsive student/admin frontend, eligibility engine, reporting, notifications, search/filter, status timeline |
| P2 | Resume parsing, skill normalization, explainable matching, company portal, advanced analytics |

## 9. Product requirements and acceptance

| Feature | Acceptance |
|---|---|
| Registration/login | Unique normalized account, hashed password, safe token behavior, negative tests |
| Student profile | Student can manage only own profile; server validates all fields |
| Resume | Upload limits and content checks; private storage and authorized download |
| Job management | Admin-only mutations; publication/deadline rules; paginated discovery |
| Eligibility | Versioned rules; explicit reasons; missing data returns review/ineligible, not assumed eligible |
| Application | Open job, deadline and eligibility validated; unique student/job pair |
| Status tracking | Valid transitions; actor/time/reason history; student sees own status |
| Admin reporting | Authorized filters, pagination, export controls, audit |
| AI matching | Explainable evidence, versioned output, evaluated quality, human review |

## 10. UX requirements

- Dashboard must prioritize next action and important deadlines.
- Job cards show role, employer, location/work mode, deadline, and eligibility summary.
- Job detail separates responsibilities, requirements, benefits, and application action.
- Application status uses labels/icons as well as color.
- Forms have visible labels, inline errors, helper text, and preserved values after recoverable errors.
- Resume upload explains accepted file types, size limit, and privacy.
- Admin tables provide filters, pagination, bulk action confirmation, and mobile fallback.
- AI score must not be shown without context, factors, limitations, and timestamp.

## 11. Analytics and privacy

Track aggregate product events (profile completed, job viewed, application submitted, status changed) without storing resume contents or secrets in analytics. Define retention, access, export, and deletion policies. AI evaluation datasets must be approved and de-identified where possible.

## 12. Risks

- Policy variations across colleges: make eligibility configurable and versioned.
- Incorrect AI extraction: human correction and source evidence.
- Bias in recommendations: representative evaluation, fairness review, no automated rejection.
- Data leakage: ownership tests, private files, least privilege.
- Scope creep: milestone gates and explicit non-goals.

## 13. Release definition

A release requires acceptance criteria, code review, automated tests, security checks, migration/rollback plan, documentation, staging verification, monitoring, and product-owner sign-off.

# 05 — Roles, RBAC and Resource Authorization

## Authorization design
Use RBAC for broad capabilities plus resource attributes: institution, company, owner, cohort, assignment, account state and resource status. Deny by default. Frontend route/menu guards never replace API authorization. Resolve active membership from trusted server state, not stale client role claims.

## Roles
- student: own profile, documents, applications and personal notifications.
- placement_admin: institution-scoped operations, approvals and configuration.
- placement_reviewer: assigned student/application review only.
- placement_director: aggregate reporting and explicitly granted approvals.
- company_owner: approved company profile and recruiter membership administration.
- recruiter: own/assigned company opportunities and authorized applicants.
- platform_operator: tenant configuration and platform health, no default student content access.
- platform_security_admin: exceptional platform security privileges, separately provisioned and audited.

## Permission catalogue
identity.read_self; students.read; students.invite; students.verify; students.update_verified; companies.read; companies.review; companies.approve; companies.suspend; company_members.invite; opportunities.create; opportunities.read; opportunities.submit; opportunities.approve; opportunities.publish; opportunities.close; applications.read; applications.assign; applications.transition; interviews.manage; offers.issue; offers.revoke; reports.read; exports.create; audit.read; institution.settings.manage; platform.tenants.manage.

## Baseline role matrix
Student: self profile/documents/applications, visible opportunities, own notifications.
Reviewer: assigned student/application read, assigned review notes and allowed transitions.
Placement admin: institution-scoped student/company/opportunity/drive/application management, verification, publication, reports and audited exports.
Director: aggregate reports and approved policy-sensitive actions; no default resume access.
Company owner: own company profile/team and company opportunity management.
Recruiter: assigned company opportunities, applicants and interviews, with redacted field set.
Platform operator: tenant configuration/health only; exceptional data support is time-bound and audited.

## Required policy checks
Institution: resource.institutionId equals active membership institutionId.
Student ownership: resource.userId equals authenticated userId.
Company: recruiter companyMembership.companyId equals opportunity.companyId.
Assignment: reviewer must be assigned unless broader permission exists.
Field scope: recruiter DTO omits private fields not allowed by institution policy.
State: action is valid from current state and permitted for that actor.

## Request enforcement sequence
Authenticate → resolve active membership → check permission → load resource using scoped query → verify ownership/assignment/tenant/state → validate allowlisted payload → conditional mutation/transaction → append audit and outbox → return safe DTO.

Never accept role, institutionId, companyId, ownerId, studentId, createdBy, verified or isApproved as trusted client authority. Derive from context or privileged workflow.

## Provisioning and lifecycle
Admins grant only institution roles within their institution. Company owners invite recruiters only within their approved company. Invites are expiring and single-use. Suspension/role changes revoke sessions or force privilege refresh. Sensitive changes require reason and audit.

## Mandatory tests
Unauthenticated; wrong role; wrong institution; wrong company; unassigned reviewer; cross-student ID; field injection; suspended membership; revoked session; valid access. Test every endpoint with these boundaries.
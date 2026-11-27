# Placement Portal — Architecture and Product Decision Log

**Repository:** `KL-Coders0103/placement-portal`  
**Purpose:** Record decisions affecting product behavior, architecture, data, security, UX, testing and operations.  
**Status values:** Approved · Proposed · Open · Superseded

## 1. How to use this log

A meaningful decision must be recorded before implementation when it changes:
- Product scope, actor responsibilities or institutional policy.
- Authentication, authorization, tenant boundaries or privacy.
- Frameworks, runtime, hosting or infrastructure.
- Database shape, indexes, migrations or retention.
- API contracts, external integrations or event semantics.
- Design system, accessibility or navigation.
- Testing, release, recovery or operational ownership.

Do not silently convert a proposal into an approved decision. If implementation exposes a problem, add a new decision and mark the old one Superseded; preserve history.

## 2. Decision record template

```text
ID:
Title:
Status: Proposed / Approved / Open / Superseded
Date:
Owner / approver:
Context:
Options considered:
Decision:
Rationale:
Consequences / trade-offs:
Affected documents and features:
Review trigger:
```

## 3. Current baseline decisions

| ID | Decision | Status | Notes |
|---|---|---|---|
| BASE-001 | Product is an institution-governed placement management platform | Approved | Not an unrestricted public job board |
| BASE-002 | One responsive web application provides role-specific workspaces | Proposed | Separate apps may be reconsidered only for a clear operational need |
| BASE-003 | React + TypeScript + Vite + Tailwind for web | Proposed | Confirm package versions against repository |
| BASE-004 | Node.js LTS + TypeScript + Express 5 API | Proposed | Existing scaffold compatibility must be inspected |
| BASE-005 | MongoDB + Mongoose as primary persistence | Proposed | MongoDB deployment must support transactions if critical workflows use them |
| BASE-006 | Redis + BullMQ for asynchronous jobs | Proposed | Queue provider/hosting open |
| BASE-007 | Private S3-compatible object storage for resumes and offer documents | Proposed | Provider open; public ACL prohibited |
| BASE-008 | API version prefix `/api/v1` | Proposed | Contract baseline |
| BASE-009 | Modular monolith plus separate worker before microservices | Approved baseline | Keep domain boundaries explicit |
| BASE-010 | Light theme is the only required theme | Approved | No dark-mode implementation requirement |
| BASE-011 | Violet/purple and neutral light palette | Approved | Exact tokens in DESIGN_SYSTEM.md |
| BASE-012 | Server-side authorization is authoritative | Approved | RBAC plus tenant/resource/field checks |
| BASE-013 | AI, if introduced, is advisory only | Approved | No automated hiring decisions |
| BASE-014 | Student files are private by default | Approved | Authorized download only |
| BASE-015 | All consequential workflow transitions are auditable | Approved | Append-only event history |
| BASE-016 | Package manager is npm workspaces | Approved | Single committed package-lock.json at repo root |
| BASE-017 | Design identity uses violet/purple seed colors `#f5f7ff #c7c1ff #8b7cf6 #5046e5 #1e1b4b #0b0f1a` | Approved | Semantic colors hue-shifted cooler for violet harmony |
| BASE-018 | `#8b7cf6` (violet accent) is decorative only — never used for text | Approved | Fails WCAG AA contrast on white (2.9:1) |
| BASE-019 | Frontend uses a single centralized API client; features never import fetch/axios directly | Approved | All API calls in one place, reused everywhere |
| BASE-020 | All user-visible data must come from the live API; no hardcoded records, metrics, or credentials in shipped frontend code | Approved | Synthetic data limited to dev seed scripts and test fixtures |

## 4. Open decisions requiring owner approval

| ID | Topic | Options / questions | Needed before |
|---|---|---|---|
| OPEN-001 | Institution tenancy | Shared collections with institutionId vs database-per-institution | Production data architecture |
| OPEN-002 | Student activation | Institution invite, verified domain, bulk import or combination | Identity release |
| OPEN-003 | CGPA policy | Supported scales, conversion and rounding | Eligibility engine |
| OPEN-004 | Backlog policy | Active vs historical backlog treatment | Eligibility engine |
| OPEN-005 | Application rules | Maximum applications, withdrawal deadline, profile requirements | Application release |
| OPEN-006 | Recruiter visibility | Exact fields visible to each company role | Employer applicant access |
| OPEN-007 | Offer policy | Whether offer acceptance closes/affects other applications | Offer workflow |
| OPEN-008 | Rejection feedback | Whether reason is internal, candidate-visible or both | Recruitment workflow |
| OPEN-009 | Authentication transport | Cookie strategy, access lifetime, refresh rotation and CSRF | Auth implementation |
| OPEN-010 | MFA | Required for all privileged roles or selected actions | Production security gate |
| OPEN-011 | File storage/scanning | Storage provider, file limits, scanning provider and quarantine | Resume upload |
| OPEN-012 | Email provider | Provider, templates, sender domain and retry policy | Notifications |
| OPEN-013 | Real-time updates | Socket.IO vs polling/SSE for first release | Live pipeline features |
| OPEN-014 | Deployment providers | Web, API, MongoDB, Redis, storage and monitoring | Staging |
| OPEN-015 | Retention | Student records, applications, resumes, audit, logs and backups | Production launch |
| OPEN-016 | SLO/RPO/RTO | Availability and recovery objectives | Production launch |
| OPEN-017 | Institution governance | Who can approve companies/opportunities and override eligibility | Admin workflow |
| OPEN-018 | Data protection/legal review | Applicable notices, consent/legal basis and data-subject processes | Production launch |

## 5. Change-control rules

1. Include decision IDs in relevant pull requests.
2. Update the affected PRD, API, schema, security and UX docs after approval.
3. Record migration/backfill and rollback consequences.
4. Never store credentials, real student records or private resumes in this file.
5. Keep decision status visible; unresolved items block dependent production features.
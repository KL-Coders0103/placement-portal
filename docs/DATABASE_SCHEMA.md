# Placement Portal — Database Schema

**Status:** Logical design baseline; not a migration  
**Database:** `placementPortal` (proposed)  
**Database engine:** MongoDB  
**ODM:** Mongoose  
**Identifiers:** ObjectId  
**Time convention:** UTC instants

## 1. Design principles

1. MongoDB is the system of record for users, memberships, student profiles, employers, opportunities, applications and recruitment records.
2. Use explicit schemas, strict validation, controlled subdocuments and references for independently queried entities.
3. Denormalize only for read performance or immutable historical snapshots; document synchronization rules.
4. Store normalized email values for uniqueness and lookup.
5. Every tenant-owned document carries institutionId; every company-owned document carries companyId where applicable.
6. Use compound indexes for tenant scope, lifecycle state, and common sort keys.
7. Use transactions for multi-document critical operations where deployment supports replica sets.
8. Use append-only history/audit collections for consequential actions.
9. Never store passwords, raw refresh tokens, OTPs or reset tokens in plaintext.
10. Store private object keys and metadata; never rely on a public file URL for access control.

## 2. Common fields and conventions

Common timestamps: createdAt, updatedAt. Use createdBy/updatedBy where meaningful. Tenant documents include institutionId. Company-owned records include companyId. Soft deletion is reserved for records whose history must remain; otherwise use explicit status transitions. API serializes ObjectId values as strings and dates as ISO-8601 UTC.

## 3. Collection catalogue

### Identity and tenancy
- **users**: _id, normalizedEmail (unique), email, passwordHash, displayName, phone, avatarObjectKey, emailVerifiedAt, accountStatus, lastLoginAt, createdAt, updatedAt.
- **sessions**: _id, userId, refreshTokenHash, tokenFamilyId, deviceLabel, userAgentHash, ipMetadata (minimized), expiresAt, revokedAt, replacedBySessionId, createdAt. TTL index on expiresAt; TTL is cleanup only, not authorization.
- **institutions**: _id, slug (unique), name, domainAllowlist, status, timezone, settingsRef, createdAt, updatedAt.
- **memberships**: _id, userId, institutionId, role, status, permissionsVersion, joinedAt, invitedBy. Unique index on userId + institutionId + role where applicable.
- **academicYears**: _id, institutionId, label, startsAt, endsAt, status.
- **programs**: _id, institutionId, code, name, degree, status.
- **departments**: _id, institutionId, code, name, status.
- **cohorts**: _id, institutionId, academicYearId, programId, departmentId, graduationYear, section, status.
- **institutionPolicies**: _id, institutionId, version, effectiveFrom, eligibility, profileRequirements, applicationRules, recruiterVisibility, retention, createdBy, createdAt. Immutable after activation; create a new version for policy changes.

### Student domain
- **studentProfiles**: _id, userId, institutionId, membershipId, studentNumber, firstName, lastName, dateOfBirth (only if justified), contact, address (restricted), programId, departmentId, cohortId, graduationYear, cgpa { value, scale }, backlogs { active, historical }, academicVerification, skills[], projects[], experiences[], certifications[], preferences, profileVersion, completeness, status, createdAt, updatedAt. Unique index for institutionId + studentNumber where present.
- **profileReviewRequests**: _id, institutionId, studentProfileId, requestedChanges, affectedFields, status, reviewerId, decisionReason, decidedAt, createdAt.
- **resumeDocuments**: _id, userId, institutionId, objectKey, originalFilename, mimeType, sizeBytes, checksum, scanStatus, version, label, uploadedAt, deletedAt. Private storage only.
- **studentVerifications**: _id, institutionId, studentProfileId, fieldGroup, verifiedFields[], verifiedBy, status, reason, verifiedAt.

### Employer and opportunity domain
- **companies**: _id, name, normalizedDomain, website, industry, description, headquarters, verificationStatus, evidenceObjectKeys[], status, reviewedBy, reviewedAt, createdAt, updatedAt.
- **companyMemberships**: _id, userId, companyId, role, status, invitedBy, acceptedAt. Unique index on userId + companyId + role.
- **companyInvitations**: _id, companyId, emailNormalized, role, tokenHash, expiresAt, acceptedAt, revokedAt, invitedBy.
- **opportunities**: _id, institutionId, companyId, createdBy, title, type, description, responsibilities[], skills[], location, workMode, compensation (restricted), openings, eligibilityCriteria, visibilityCohortIds[], applicationOpensAt, applicationClosesAt, status, reviewVersion, publishedAt, closedAt, createdAt, updatedAt.
- **opportunityReviews**: _id, institutionId, opportunityId, version, reviewerId, decision, comments, createdAt.
- **eligibilityEvaluations**: _id, institutionId, opportunityId, studentProfileId, criteriaVersion, profileVersion, result, reasonCodes[], evaluatedAt, evaluatedBy, override { actorId, reason }.

### Application and recruitment domain
- **applications**: _id, institutionId, opportunityId, companyId, studentProfileId, studentUserId, submittedAt, currentStatus, statusVersion, resumeDocumentId, profileSnapshot, eligibilitySnapshot, coverLetter, assignedReviewerIds[], recruiterVisibleFieldsVersion, withdrawnAt, createdAt, updatedAt. Unique compound index on studentProfileId + opportunityId.
- **applicationStatusEvents**: _id, institutionId, applicationId, fromStatus, toStatus, actorUserId, actorRole, reason, visibility, metadata, createdAt. Append-only.
- **drives**: _id, institutionId, opportunityId, name, stageTemplate[], status, startsAt, endsAt, createdBy.
- **driveStages**: _id, institutionId, driveId, key, label, order, stageType, configuration, active.
- **interviews**: _id, institutionId, applicationId, driveId, stageId, scheduledStartAt, scheduledEndAt, timezone, mode, locationOrMeetingRef, interviewerIds[], candidateResponse, status, notesVisibility, createdBy.
- **offers**: _id, institutionId, applicationId, companyId, roleTitle, compensation (restricted), issuedAt, expiresAt, status, documentObjectKey, responseAt, revokedAt, createdBy.
- **reviewAssignments**: _id, institutionId, reviewerId, applicationId, assignedBy, assignedAt, status.

### Communication, reporting and governance
- **notifications**: _id, userId, institutionId, eventType, title, body, safeLink, readAt, dedupeKey, createdAt. Unique dedupeKey where applicable.
- **notificationDeliveries**: _id, notificationId, channel, providerMessageId, status, attempts, nextAttemptAt, lastErrorCode, deliveredAt.
- **announcements**: _id, institutionId, title, body, audienceRules, publishAt, expiresAt, status, createdBy.
- **auditEvents**: _id, institutionId (nullable for platform events), actorUserId, actorMembershipId, action, resourceType, resourceId, outcome, reason, requestId, metadataAllowlisted, createdAt. Append-only with indexes on tenant/time and actor/time.
- **outboxEvents**: _id, eventId (unique), aggregateType, aggregateId, eventType, payloadVersion, payload, status, attempts, availableAt, processedAt, createdAt.
- **exportJobs**: _id, institutionId, requestedBy, reportType, filters, fieldAllowlist, status, objectKey, expiresAt, auditEventId.
- **idempotencyRecords**: _id, scope, key, requestHash, responseRef, expiresAt; unique scope + key.

## 4. Key relationships

- User 1—many memberships; membership belongs to one institution or company context.
- Institution 1—many academic years, programs, departments, cohorts, student profiles and opportunities.
- Company 1—many company memberships and opportunities.
- Opportunity 1—many eligibility evaluations, applications, reviews and drives.
- Student profile 1—many resume versions and applications.
- Application 1—many status events, review assignments, interviews and offers.
- Notification belongs to one recipient; audit/outbox records reference the affected resource.

## 5. Critical indexes and constraints

| Collection | Index / invariant |
|---|---|
| users | unique normalizedEmail |
| memberships | userId + institutionId + role; query by institutionId + role + status |
| studentProfiles | institutionId + studentNumber unique where studentNumber exists; institutionId + cohortId |
| companies | normalizedDomain and verificationStatus |
| companyMemberships | unique userId + companyId + role |
| opportunities | institutionId + status + applicationClosesAt; companyId + status |
| applications | unique studentProfileId + opportunityId; institutionId + currentStatus + submittedAt |
| applicationStatusEvents | applicationId + createdAt |
| interviews | institutionId + scheduledStartAt; interviewerIds + scheduledStartAt |
| notifications | userId + createdAt; unique dedupeKey |
| auditEvents | institutionId + createdAt; actorUserId + createdAt |
| sessions | userId + revokedAt; TTL expiresAt |
| outboxEvents | unique eventId; status + availableAt |

## 6. Sensitive data classification

- Restricted: passwordHash, session hashes, resume object keys/content, contact details, address, CGPA/backlogs, offer compensation/documents, private reviewer notes.
- Internal: verification decisions, application events, audit events, recruiter-visible profile fields.
- Aggregate: institution reports after small-group suppression and permission checks.
- Public: approved public opportunity fields only.

## 7. Migration and evolution

Mongoose schemas do not replace migration discipline. Use versioned migration/backfill scripts for data shape changes. Scripts must be resumable, idempotent, logged and tested against a copy of representative data. Create indexes deliberately; measure index build impact. Do not drop fields or collections until compatibility and rollback windows expire.

## 8. Open schema decisions

Confirm whether institution tenancy remains shared-database/shared-collection; exact student identifier uniqueness rules; CGPA representation; retention and deletion policy; whether academic records need separate normalized collections; and the deployment topology required for transactions.

# 08 — Database Schema and Collection Catalogue

## Conventions
Database name: placementPortal. ObjectId primary keys; UTC createdAt/updatedAt. Every institution-owned record carries institutionId. Company-owned records carry companyId. Tenant IDs are derived from active membership, never trusted from request body. References are checked for matching tenant scope in services.

## Collections
users: emailNormalized unique, passwordHash, displayName, phone?, emailVerifiedAt, accountStatus, lastLoginAt, timestamps. Never return passwordHash. Index unique emailNormalized.

institutions: name, slug unique, domainAllowlist, timezone, status, settings, timestamps.

memberships: userId, institutionId, role, status, cohortId?, permissions[], invitedBy, joinedAt. Unique logical user/institution/role; indexes by institution/status/role and user/status.

cohorts: institutionId, academicYear, graduationYear, program, branch, section?, status. Index institution/graduationYear/branch.

studentProfiles: institutionId, userId, cohortId, studentNumber, personal, education(degree, program, branch, graduationYear, cgpa, cgpaScale, backlogCount), skills[], projects[], experience[], preferences, verification, profileVersion, timestamps. Unique institutionId+userId; unique sparse institutionId+studentNumber.

resumeDocuments: institutionId, studentId, storageKey, sanitized originalName, mimeType, sizeBytes, sha256, scanStatus, parseStatus, version, uploadedAt, deletedAt?. Private storage key only; never public URL. Index student/version and upload time.

companies: displayName, legalName, domainNormalized, website, industry, verificationStatus, verifiedBy, verifiedAt, timestamps.

companyMemberships: companyId, userId, role(company_owner|recruiter), status, invitedBy, timestamps. Unique companyId+userId.

opportunities: institutionId, companyId, createdByUserId, assignedRecruiterIds[], title, description, type, workMode, locations[], compensation?, requiredSkills[], responsibilities[], eligibilityCriteria, criteriaVersion, applicationWindow, visibility, status, approval, publishedAt, timestamps. Index institution/status/publishedAt; institution/company/createdAt; close date.

eligibilityEvaluations: institutionId, opportunityId, studentId, profileVersion, criteriaVersion, result(eligible|ineligible|needs_review), reasons[], evaluatedAt, engineVersion. Unique opportunity/student/profileVersion/criteriaVersion.

applications: institutionId, opportunityId, companyId, studentId, status, submittedAt, withdrawnAt?, profileSnapshot, resumeDocumentId?, eligibilityEvaluationId, currentStageId?, timestamps. Unique institution/opportunity/student; indexes student/submittedAt and opportunity/status/submittedAt.

applicationStatusEvents: institutionId, applicationId, fromStatus?, toStatus, actorUserId, actorRole, reason?, visibility, metadata, createdAt. Append-only; index application/createdAt.

drives: institutionId, opportunityId, name, startAt, endAt, status, stageIds[], createdBy.
driveStages: driveId, order, name, stageType, allowedTransitions[], schedule?, configuration.
interviews: institutionId, applicationId, stageId, startsAt, endsAt, timezone, mode, locationOrMeetingRef, interviewerIds[], status, createdBy.
offers: institutionId, applicationId, companyId, roleTitle, compensationPrivate, location, documentId?, status, issuedAt, expiresAt, respondedAt?, createdBy.
notifications: userId, institutionId, type, title, bodySafe, resourceType, resourceId, readAt?, deliveryState, dedupeKey, createdAt. Unique userId+dedupeKey.
auditEvents: institutionId?, actorUserId, actorMembershipId?, action, resourceType, resourceId, outcome, reason?, requestId, safe metadata, createdAt. Append-only; never store secrets or resume body.
outboxEvents: eventType, aggregateType, aggregateId, minimal payload, dedupeKey unique, status, attempts, nextAttemptAt, processedAt, createdAt.

## Optional later collections
resumeParseResults; matchEvaluations; imports/importRows; exportJobs; announcements; institutionPolicyVersions; refreshSessions; passwordResetTokens.

## Relationships and invariants
User has many memberships; institution has cohorts/memberships/opportunities; student has one profile per institution; company has many recruiters/opportunities; opportunity has many evaluations/applications; application has status events/interviews/offers. Enforce unique application, membership and notification dedupe indexes. Mongo references are not foreign keys: verify references and tenant consistency in service layer.

## Integrity and retention
Use transactions for critical multi-document writes and conditional updates for state transitions. Indexes must match actual query patterns and be reviewed before production. TTL only for expiring tokens/temporary records, never audit history. Resume replacement creates a new version; deletion follows approved retention policy. Backups and restore are tested.
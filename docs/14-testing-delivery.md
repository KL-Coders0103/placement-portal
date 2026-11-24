# 14 — Testing, CI/CD and Operations

## Test pyramid
Unit: eligibility engine, status transition map, policies, DTO redaction, validation, deadline logic and metric calculations.
Integration: Mongo replica-set transactions/indexes, auth/session rotation, membership scope, unique application, status transition, outbox, private file metadata, Redis/BullMQ retry/dedupe.
API/security: every route tested for unauthenticated, wrong role, wrong institution/company/owner/assignment, suspended membership, invalid payload, field injection and valid access.
E2E: student activation → profile → resume → opportunity → eligibility → application → status timeline; employer onboarding → approval → recruiter invite → opportunity submit → admin publish → applicant review; admin drive → stage → interview → offer → acceptance; scoped reports and exports.

## Synthetic fixtures
Create Institution A/B; two students in same institution and one in another; two companies and recruiters; admin, reviewer, director and platform operator. Tests must prove cross-boundary denial. Never use production student records.

## Critical invariants
Unique normalized email; membership uniqueness; one application per student/opportunity; no application after deadline/closure; client cannot set role/tenant/owner/status; recruiter only sees own assigned opportunity applicants; only approved employer opportunities publish; privileged transitions create audit; notification retry creates no duplicate; AI cannot mutate application state.

## CI
On pull request: install lockfile; format/lint; typecheck; unit tests; integration tests with ephemeral Mongo replica set and Redis; OpenAPI contract check; build web/API/worker; dependency, secret and container scans; publish safe reports. Protected branch deploys to staging, runs smoke and migration checks, then requires production approval. Rollback plan required.

## Environments
Local uses synthetic data. Test is ephemeral. Staging is production-like but uses synthetic/anonymized fixtures. Production uses managed services, secret manager, least privilege, backups and monitoring. Never share credentials or databases between environments.

## Observability
Structured logs include requestId, traceId, module, action, outcome and duration. Redact tokens, cookies, passwords, resume contents, offer documents and unnecessary PII.
Metrics: HTTP latency/errors; auth failures; rate limits; DB health; queue depth/retries/dead letters; file scan duration; notification delivery; application transition conflicts; export volume and authorization denials. Alerts require an owner and runbook.

## Recovery
Encrypted automated database backups and point-in-time recovery where available. Object storage versioning/lifecycle. Periodic isolated restore drills. Institution defines RPO/RTO. A successful backup job is not proof of recoverability.

## Release checklist
Product/policy signoff; role and cross-tenant report; security/privacy review; indexes and backfill plan; migration rollback; API compatibility; queue idempotency; monitoring/runbooks; accessibility/responsive QA; support training; feature flag/rollback; release notes and known limitations.

Production-ready means the system is operated against an agreed threat model, SLO, retention policy, backup/restore and incident process. A local build alone is not production readiness.
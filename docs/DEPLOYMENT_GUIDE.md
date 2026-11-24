# Placement Portal — Deployment and Operations Guide

**Status:** Provider-neutral deployment baseline  
**Applications:** Web, Express API, background worker  
**Dependencies:** MongoDB, Redis/BullMQ, private object storage, email and optional scanning provider

## 1. Purpose

This guide defines environment separation, build/release flow, runtime configuration, monitoring, backup, restore and incident operations. Hosting vendors are not selected by this document. Record selections in DECISIONS.md before production implementation.

## 2. Logical production topology

```text
Students / Staff / Employers
          |
        HTTPS
          |
     Web Frontend
          |
   API Gateway / TLS
          |
   Express API replicas --------------------+
      |          |            |             |
      v          v            v             v
   MongoDB     Redis       Private       Email / Scan
               Queue       Storage       Providers
                 |
                 v
            Worker replicas
                 |
        Notifications / exports /
        reminders / file scanning

Backups and monitoring cover database, object metadata, queues and services.
```

Principles:
- Public traffic uses HTTPS.
- MongoDB, Redis and worker internals are not public.
- Only API/worker identities access storage and databases.
- Production secrets are injected through a secret manager.
- Staging resembles production but uses synthetic/anonymized data.
- Do not copy production student records to local development.

## 3. Environments

### Development
Local synthetic data, test email sink/provider sandbox, isolated MongoDB/Redis and private development storage. Never use production credentials or real student resumes.

### Test / CI
Ephemeral database and queue infrastructure. Deterministic seed fixtures. No external email or AI calls unless isolated test adapters are used.

### Staging
Production-like topology, separate credentials, storage bucket and email sender. Restrict to authorized staff/test users. Validate migrations, upload/download authorization, queue retry, backups and smoke tests.

### Production
Separate database, Redis, storage and secrets. TLS, restricted admin access, monitored queues, encrypted backups, tested restore, incident ownership and release approval are mandatory.

## 4. Configuration

Use validated environment variables. Proposed API variables:

```env
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1
WEB_ORIGIN=http://localhost:5173
MONGODB_URI=
REDIS_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_TTL=
REFRESH_TOKEN_TTL=
OBJECT_STORAGE_ENDPOINT=
OBJECT_STORAGE_BUCKET=
OBJECT_STORAGE_ACCESS_KEY=
OBJECT_STORAGE_SECRET_KEY=
EMAIL_PROVIDER=
EMAIL_FROM=
LOG_LEVEL=debug
```

Names are examples; finalize exact names in env schema. Never commit populated .env files. Only explicitly public `VITE_*` variables may enter the web bundle. Validate required values at startup and fail fast.

## 5. Build and release process

1. Confirm branch and clean working tree.
2. Install from lockfile.
3. Run formatting, lint, typecheck and unit tests.
4. Run integration tests against isolated MongoDB replica set and Redis.
5. Build web, API and worker.
6. Run security/dependency/secret scans.
7. Review schema/index changes and resumable migration scripts.
8. Deploy compatible API/worker release to staging.
9. Run smoke, E2E, permission and upload tests.
10. Approve production rollout and migration.
11. Monitor errors, latency, queue backlog and authorization denials.
12. Record release SHA, migration version, known issues and rollback plan.

## 6. Database and file operations

- Use least-privilege database users.
- Restrict network access to application services.
- Enable encrypted backups and point-in-time recovery where supported.
- Back up database and object-storage metadata/lifecycle state.
- Test restoration into an isolated environment.
- Define retention for orphaned uploads, expired exports and deleted resumes.
- A successful backup job is not proof of recoverability.

## 7. Worker and queue operations

Use bounded concurrency and retry with exponential backoff plus jitter. Classify permanent vs transient failures. Track queue depth, oldest job age, retries and dead-letter count. Replays must be idempotent and operator-authorized. Do not include resume contents or secrets in job logs.

## 8. Health and observability

- `/health/live`: process is alive.
- `/health/ready`: required dependencies are reachable and the service can accept traffic.
- Structured logs include requestId/traceId, environment, module, operation, outcome and duration.
- Metrics include API latency/errors, Mongo health, Redis health, queue lag, notification delivery, file scan duration, export volume and authorization denials.
- Alerts need an owner and runbook.

## 9. Rollback and recovery

Prefer backward-compatible expand/migrate/contract schema changes. Keep old API versions compatible during rolling deployment. Do not roll back destructive data migrations without a tested restore/reconciliation plan. Define institution-approved RPO/RTO. Revoke credentials and sessions after compromise.

## 10. Incident response

Runbooks must cover compromised privileged account, exposed resume, unauthorized export, malicious upload, database exposure, queue outage, email outage and corrupted deployment. Each runbook defines detection, containment, evidence preservation, credential/session revocation, impact assessment, notification/legal review, recovery and post-incident actions.

## 11. Production release gate

No production release until security review, cross-tenant tests, privacy/retention policy, backup restore drill, monitoring, support ownership, accessibility review, API compatibility, migration rollback and incident contacts are approved.

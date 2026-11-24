# 06 — System Architecture

## Architecture choice
Begin with a modular monolith plus separately scalable background workers. This keeps domain transactions simple while preserving clear boundaries. Split services only when throughput, ownership or isolation justifies the operational cost.

## Components
1. React SPA: role workspaces, accessible UI, route navigation and API client.
2. Express API: identity, institutions, memberships, students, companies, opportunities, eligibility, applications, drives, interviews, offers, notifications, reports, audit and files.
3. MongoDB replica set: durable domain data.
4. Redis: cache, distributed rate limits and queue coordination; never source of truth for business state.
5. BullMQ workers: email, import/export, file scanning, resume parsing and report generation.
6. Private object storage: resumes and offer documents.
7. Provider adapters: email, storage, malware scanning and optional AI.
8. Observability: structured logs, metrics, traces, alerts.

## Module boundaries
Each domain owns routes, controller, service/use case, schema/model, policy, DTO and tests as needed. Controllers map HTTP; services enforce business rules; policies authorize; repositories encapsulate complex queries. Cross-module writes go through service interfaces or domain events, not direct model manipulation.

## Request flow
HTTPS proxy → stateless API → authentication/membership context → validation → policy → domain service → MongoDB conditional write/transaction → outbox event → response. Worker consumes committed events and calls adapters. Realtime updates are hints; clients refetch authorized persisted data.

## Consistency
Use replica-set transactions for critical multi-document writes. Unique indexes enforce email/membership/application invariants. Conditional updates prevent invalid transitions. Transactional outbox makes side effects retry-safe. Store UTC timestamps and explicit timezone for scheduled events.

## Scaling
Stateless API replicas; shared Redis; worker replicas scaled by queue depth; indexed and cursor-paginated Mongo queries; private object storage and short-lived signed URLs; CDN only for public assets; expensive reports/AI run asynchronously. Profile before adding read replicas or sharding.

## Reliability
Timeouts and circuit breakers for providers; bounded exponential retries with jitter; dead-letter queues; idempotency keys; graceful shutdown; health/readiness endpoints; encrypted backups and restore drills.

## Deployment
CDN-hosted web app; API containers behind HTTPS load balancer; independent worker containers; managed Mongo replica set and Redis; private object bucket; email provider; centralized telemetry. Separate development, staging and production credentials/data.

## Security boundaries
Browser is untrusted. API owns policy. Workers use least-privilege credentials. Buckets are private. AI receives minimum necessary data only after policy approval. Platform support access is separate from institution operations. Record major choices as architecture decision records.
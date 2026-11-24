# Placement Portal — Frontend Architecture

**Status:** Proposed implementation baseline  
**Scope:** Single React SPA with role-specific workspaces  
**Theme:** Light only  
**Principle:** Centralized data access, feature boundaries, safe DTOs and consistent UI states

## 1. Non-negotiable rules

1. All HTTP requests go through one centralized API client.
2. No feature component imports axios/fetch directly.
3. No hardcoded API URLs, tokens, secrets or production data.
4. No hardcoded student, opportunity, application or dashboard records presented as live data.
5. Server state belongs in TanStack Query; form state belongs in React Hook Form; transient UI state belongs in component state or Zustand.
6. Every data view handles loading, empty, error, forbidden and success states.
7. API response DTOs are typed and validated at trust boundaries.
8. Frontend guards improve navigation only; API authorization is mandatory.
9. Light design tokens are the only required theme.
10. Private files are fetched through authorized API handshakes, never public static paths.

## 2. Application structure

```text
apps/web/src/
  app/
    providers/
    router/
    layouts/
    guards/
  assets/
  components/
    ui/
    data-display/
    feedback/
    forms/
  features/
    auth/
    workspace/
    student/
    opportunities/
    eligibility/
    applications/
    interviews/
    offers/
    employer/
    placement-admin/
    leadership/
    notifications/
    reports/
    settings/
  hooks/
  lib/
    api/
    env/
    errors/
    permissions/
    format/
  stores/
  styles/
  main.tsx
```

Only create folders when their first feature is implemented. Do not create empty placeholder modules for every future phase.

## 3. Routing and workspace context

Use route groups for public, student, employer, placement, leadership and platform operations workspaces. After sign-in, call `GET /auth/me`, resolve memberships and require explicit active-context selection when multiple contexts exist. Send a context identifier only as a selection hint; the API must validate membership and derive trusted scope.

A route guard may redirect users away from irrelevant pages, but the API still checks permission on every request. Avoid role assumptions from local storage or decoded unverified client claims.

## 4. Central API client

The client owns base URL, credentials, request ID, JSON headers, response envelope parsing, normalized errors, refresh coordination and logout behavior. Use one refresh retry at most to avoid loops. Concurrent 401 responses should share one refresh operation. Clear in-memory session state when refresh fails.

Do not store raw refresh tokens in localStorage. Preferred browser strategy is HttpOnly Secure refresh cookie with a short-lived access token held in memory, subject to DECISIONS.md auth transport approval. Protect cookie-based mutations against CSRF.

## 5. Data and state management

- TanStack Query: profiles, opportunities, eligibility, applications, interviews, reports and server-derived dashboard data.
- Zustand: small cross-route UI state such as active workspace selection after server validation, sidebar state and temporary filters only when URL state is unsuitable.
- React Hook Form + Zod: validated forms.
- URL query params: shareable filters, search, pagination and sort.
- Never duplicate server data into a global store without a clear consistency reason.

Query keys include tenant/context and resource identifiers. On membership switch/logout, clear tenant-scoped caches to prevent stale data crossing workspaces.

## 6. Forms and file uploads

Use shared field components and schema validation. Show server errors beside fields and preserve safe input on recoverable failure. Resume upload flow: request upload authorization → upload to private object storage or approved proxy → complete upload → API records metadata and queues scanning → UI shows pending scan → only clean files become downloadable. Do not expose storage credentials.

## 7. Error and state patterns

Normalize errors to stable codes. Handle 401 session expiry, 403 permission denial, 404 non-visible resource, 409 duplicate/conflict, 422 business rule, 429 throttling and 5xx retryable failure. Never reveal internal error details. Retry only safe/idempotent requests automatically.

Each screen must include skeleton/loading, empty guidance, retryable error, forbidden state and populated state. Sensitive actions show pending state until API confirms.

## 8. Component architecture

Shared primitives: Button, Input, Select, Checkbox, Dialog, Drawer, Tabs, Badge, Avatar, Tooltip, Dropdown, DataTable, Pagination, EmptyState, Skeleton, Alert, Toast, FileUpload, StatusTimeline, ConfirmAction, MetricCard and FilterBar.

Domain components: OpportunityCard, EligibilityBreakdown, ApplicationTimeline, StudentProfileSections, ResumeVersionList, ApplicantReviewPanel, InterviewSchedule, OfferResponsePanel, ApprovalPanel and ReportChart.

Keep domain logic in feature hooks/services rather than UI primitives.

## 9. Accessibility and responsive behavior

Use semantic HTML, keyboard navigation, visible focus, labels, error announcements, focus-managed dialogs, reduced-motion support and WCAG 2.2 AA contrast. Test mobile, tablet and desktop. Tables need an alternate small-screen presentation; do not simply shrink desktop tables.

## 10. Frontend environment

Only public Vite variables are allowed in the client bundle. Validate configuration at startup. Example: `VITE_API_BASE_URL`. Never expose MongoDB URI, Redis URL, storage secret, signing key or email credentials.

## 11. Frontend tests

Test route behavior, permission-aware navigation, query states, form validation, cache clearing on workspace switch, refresh concurrency, file upload state, keyboard interactions and E2E workflows. Mock API boundaries for component tests; use real test API for integration/E2E.

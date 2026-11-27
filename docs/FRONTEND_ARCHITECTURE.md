# Placement Portal — Frontend Architecture

**Status:** Implementation baseline  
**Scope:** Single React SPA with role-specific workspaces  
**Stack:** React 18 + TypeScript strict + Vite + Tailwind + TanStack Query + React Hook Form + Zod + Zustand  
**Theme:** Light only  
**Principle:** Centralized data access, feature boundaries, safe DTOs, consistent UI states, reused primitives

## 1. Non-negotiable rules

1. **One centralized API client.** All HTTP requests go through `apps/web/src/lib/api/client.ts`. No feature component imports `fetch`, `axios`, `ky` or any other HTTP library directly. Enforced by ESLint.
2. **No hardcoded API URLs, tokens or secrets.** Endpoint paths live in `lib/api/endpoints.ts`. Base URL comes from `lib/env/env.ts`. Credentials never appear in code.
3. **No hardcoded records or metrics presented as live data.** Every value rendered in production code must come from a TanStack Query hook that fetches from the API. No `<StatCard value={124} />`, no fake names, no fabricated company logos, no invented testimonials, no fake student records. Synthetic data lives only in `scripts/seed:dev` and test fixtures.
4. **No hardcoded colors.** Use design tokens only — `bg-brand-primary`, `text-text-primary`, etc. No `bg-[#5046e5]` or inline `style={{ color: '#...' }}` in feature code.
5. **Server state in TanStack Query.** Form state in React Hook Form + Zod. Transient UI state in component state or Zustand. Never duplicate server data into a global store.
6. **Every data view handles five states:** loading (skeleton), empty (guidance + action), error (retryable), forbidden (403), success (populated). No screen may render only the happy path.
7. **DTOs validated at the boundary** using Zod schemas from `@placement/shared`.
8. **Frontend guards guide navigation only.** The API is the authorization authority. Never rely on a route guard or a hidden button for security.
9. **Light theme only.** No dark mode toggle, no theme persistence.
10. **Private files fetched only through authorized API handshakes** — upload-intent → upload → complete → scan → authorized download. Never public static paths.

## 2. Application structure

```text
apps/web/src/
  app/
    providers/          # QueryClient, Toaster, ErrorBoundary, I18n
    router/             # route definitions and guards
    layouts/            # PublicLayout, AuthLayout, AppShell (sidebar+topbar)
  assets/
  components/
    ui/                 # Reusable primitives — no domain logic
      Button.tsx
      Input.tsx
      Textarea.tsx
      Select.tsx
      Checkbox.tsx
      Switch.tsx
      Dialog.tsx
      Drawer.tsx
      Tabs.tsx
      Badge.tsx
      Avatar.tsx
      Tooltip.tsx
      Alert.tsx
      Toast.tsx
      Skeleton.tsx
      EmptyState.tsx
      Pagination.tsx
      ConfirmAction.tsx
      PageHeader.tsx
      SectionCard.tsx
      FormField.tsx
      FileUpload.tsx
      StatusTimeline.tsx
      MetricCard.tsx
      FilterBar.tsx
      DataTable.tsx
      index.ts          # Barrel export — the only public entry
    data-display/       # Domain-agnostic presentational helpers
      DateTimeWithTz.tsx
      NumberFormat.tsx
      CurrencyFormat.tsx
      CopyButton.tsx
      StatusPill.tsx
      EligibilityLabel.tsx
    feedback/           # Async state helpers
      QueryBoundary.tsx  # Wraps loading/error/empty/success
      PermissionGate.tsx # Renders fallback when unauthorized
      ErrorFallback.tsx
    forms/
      FormShell.tsx
      FormActions.tsx
      FormErrorSummary.tsx
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
  hooks/                # Cross-feature hooks only
    useDebounce.ts
    useMediaQuery.ts
    useUnsavedChanges.ts
  lib/
    api/
      client.ts         # THE ONLY FILE THAT CALLS fetch
      endpoints.ts      # All endpoint path constants
      errors.ts         # Normalize to AppError with stable code
      auth.ts           # Token storage, refresh coordination
    env/
      env.ts            # Zod-validated VITE_* variables
    permissions/
      useAbility.ts     # Permission checks derived from /auth/me
    format/
      datetime.ts
      number.ts
      currency.ts
  stores/
    workspace.ts        # active membership (UI hint only; server validates)
    sidebar.ts
  styles/
    tokens.css          # CSS variables from DESIGN_SYSTEM.md
    globals.css
  main.tsx
```

### 2.1 Reuse rules

- **Only create a file when you first need it.** No empty placeholder modules for future phases.
- **Before creating any component in a feature folder, check `components/ui/` first.** If a primitive exists, use it. If it doesn't exist but will be used in two or more places, create it in `components/ui/` with its own test. Do not duplicate primitives in feature folders.
- **If you find yourself writing a `Button` (or `Input`, or `Dialog`, or `ConfirmAction`) inside a feature folder, stop** — it belongs in `components/ui/`.
- **All `components/ui/*` components must consume design tokens only** — no hardcoded hex.

## 3. Routing and workspace context

Use route groups for public, student, employer, placement, leadership and platform operations workspaces. After sign-in, call `GET /auth/me`, resolve memberships and require explicit active-context selection when multiple contexts exist. Send a context identifier only as a selection hint; the API must validate membership and derive trusted scope.

A route guard may redirect users away from irrelevant pages, but the API still checks permission on every request. Avoid role assumptions from local storage or decoded unverified client claims.

On workspace switch or logout: clear all TanStack Query caches before navigating. Prevents stale data crossing tenant boundaries.

## 4. Central API client — non-negotiable

### 4.1 The client

Only `lib/api/client.ts` calls `fetch`. Everything else imports from it.

```ts
// lib/api/client.ts (contract)
export const api = {
  get:    <T>(path: string, opts?: RequestOptions): Promise<T>,
  post:   <T>(path: string, body: unknown, opts?: RequestOptions): Promise<T>,
  patch:  <T>(path: string, body: unknown, opts?: RequestOptions): Promise<T>,
  delete: <T>(path: string, opts?: RequestOptions): Promise<T>,
};
```

The client is responsible for:
- Adding `Authorization: Bearer <access-token>` from in-memory session state.
- Adding `X-Request-Id` (crypto.randomUUID).
- Adding `Idempotency-Key` on retry-sensitive mutations (opt-in via `opts`).
- Parsing the response envelope `{ success, data, meta }` or `{ success: false, error, meta }`.
- Mapping errors to `AppError { code, message, status, requestId, details }`.
- Coordinating 401 refresh: one in-flight refresh shared across concurrent 401s; retry the original request once; on refresh failure clear session and redirect to login.
- Adding CSRF token on cookie-auth mutations (once auth transport is decided).
- Base URL from `lib/env/env.ts` — never hardcoded.
- Redacting sensitive fields from any debug logging.

### 4.2 How features consume the client

Each feature has an `api.ts` that wraps the client with typed calls, then a `queries.ts` with TanStack Query hooks. Pages only use the hooks.

```ts
// features/student/api.ts
import { api } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { StudentProfile, UpdateProfileInput } from '@placement/shared';

export const getProfile = () =>
  api.get<StudentProfile>(endpoints.student.profile);

export const updateProfile = (data: UpdateProfileInput) =>
  api.patch<StudentProfile>(endpoints.student.profile, data);
```

```ts
// features/student/queries.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProfile, updateProfile } from './api';

export const useProfile = () =>
  useQuery({ queryKey: ['student', 'profile'], queryFn: getProfile });

export const useUpdateProfile = () =>
  useMutation({ mutationFn: updateProfile });
```

```tsx
// features/student/pages/ProfilePage.tsx
import { useProfile } from '../queries';
import { QueryBoundary } from '@/components/feedback/QueryBoundary';

export function ProfilePage() {
  const query = useProfile();
  return (
    <QueryBoundary query={query}>
      {(data) => <ProfileForm data={data} />}
    </QueryBoundary>
  );
}
```

**What pages never do:**
- Never call `fetch` / `axios` / `ky`.
- Never read `import.meta.env` directly — use `lib/env/env.ts`.
- Never construct URL strings — use `endpoints.ts`.
- Never store or read tokens from `localStorage` directly — use `lib/api/auth.ts`.

## 5. Data and state management

- **TanStack Query:** profiles, opportunities, eligibility, applications, interviews, reports and all server-derived data.
- **Zustand:** small cross-route UI state only — active workspace hint (after server validation), sidebar open state. Never server data.
- **React Hook Form + Zod:** validated forms.
- **URL query params:** shareable filters, search, pagination, sort, active tab.
- **Never duplicate server data into a global store.**

Query keys include tenant/context and resource identifiers. On membership switch/logout, clear tenant-scoped caches to prevent stale data crossing workspaces.

## 6. Forms and file uploads

Use shared field components and Zod schema validation. Show server errors beside fields and preserve safe input on recoverable failure. Clear only secret fields (like password) on error.

Resume upload flow: request upload authorization → upload to private object storage (or approved proxy) → complete upload → API records metadata and queues scanning → UI shows pending scan → only clean files become downloadable. Never expose storage credentials to the browser.

## 7. Error and state patterns

Normalize errors to stable codes. Handle 401 session expiry, 403 permission denial, 404 non-visible resource, 409 duplicate/conflict, 422 business rule, 429 throttling and 5xx retryable failure. Never reveal internal error details. Retry only safe/idempotent requests automatically.

Each screen must include skeleton/loading, empty guidance, retryable error, forbidden state and populated state. Sensitive actions show pending state until the API confirms — never optimistically mark success before the server responds.

## 8. Component architecture

### 8.1 Shared primitives (in `components/ui/`)

Button, Input, Textarea, Select, Checkbox, Switch, Dialog, Drawer, Tabs, Badge, Avatar, Tooltip, Alert, Toast, Skeleton, EmptyState, Pagination, ConfirmAction, PageHeader, SectionCard, FormField, FileUpload, StatusTimeline, MetricCard, FilterBar, DataTable.

### 8.2 Data-display helpers (in `components/data-display/`)

DateTimeWithTz, NumberFormat, CurrencyFormat, CopyButton, StatusPill, EligibilityLabel.

### 8.3 Feedback helpers (in `components/feedback/`)

QueryBoundary (loading/error/empty wrapper), PermissionGate (renders fallback when unauthorized), ErrorFallback.

### 8.4 Domain components (in respective `features/*/components/`)

OpportunityCard, EligibilityBreakdown, ApplicationTimeline, StudentProfileSections, ResumeVersionList, ApplicantReviewPanel, InterviewSchedule, OfferResponsePanel, ApprovalPanel, ReportChart.

### 8.5 Reuse check rule

Before writing any new component:
1. Search `components/ui/`, `components/data-display/`, `components/feedback/` for an existing primitive.
2. If a match exists → use it.
3. If a similar component exists → extend it with props, don't fork it.
4. If a new primitive will be used in 2+ places → create it in `components/ui/` with a test.
5. Only put one-off feature components inside `features/<name>/components/`.

## 9. Accessibility and responsive behavior

Use semantic HTML, keyboard navigation, visible focus, labels, error announcements, focus-managed dialogs, reduced-motion support and WCAG 2.2 AA contrast. Test mobile, tablet and desktop. Tables need an alternate small-screen presentation; do not simply shrink desktop tables. See `docs/UI_RESPONSIVE_SPEC.md` for per-page layouts.

## 10. Frontend environment

Only public `VITE_*` variables are allowed in the client bundle. Validate configuration at startup with a Zod schema in `lib/env/env.ts`. Examples: `VITE_API_BASE_URL`, `VITE_APP_ENV`.

**Never expose** MongoDB URI, Redis URL, storage secret, signing key or email credentials. CI scans the built bundle and fails on forbidden names.

## 11. Frontend tests

Test route behavior, permission-aware navigation, query states, form validation, cache clearing on workspace switch, refresh concurrency, file upload state, keyboard interactions and E2E workflows. Mock API boundaries for component tests; use the real test API for integration/E2E.

## 12. Anti-patterns (forbidden)

- ❌ `fetch('/api/...')` anywhere outside `lib/api/client.ts`
- ❌ `axios` or `ky` anywhere in the codebase
- ❌ `bg-[#5046e5]` or any hardcoded hex in JSX/CSS
- ❌ `if (role === 'admin')` in any component — use `useAbility()` or `PermissionGate`
- ❌ `<StatCard value={124} />` or any literal that should come from the API
- ❌ Duplicating `Button`, `Input`, `Dialog`, `ConfirmAction` or `DataTable` inside a feature folder
- ❌ `useState` for server data
- ❌ `localStorage` for access tokens
- ❌ `new Date().toString()` — use `<DateTimeWithTz>`
- ❌ Reading `import.meta.env` outside `lib/env/env.ts`
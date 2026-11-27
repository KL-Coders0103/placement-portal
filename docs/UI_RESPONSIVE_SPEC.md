# Placement Portal — UI Responsive Specification

**Version:** 1.0
**Purpose:** Define how every screen renders at each breakpoint.
**Breakpoints:** mobile `<640` · tablet `640–1023` · laptop `1024–1279` · wide `≥1280`
**Stack:** React + Tailwind with tokenized spacing/breakpoints

---

## 1. Global shell

### 1.1 Public header
- Mobile: hamburger menu, logo left, sign-in button right.
- Tablet+: logo left, nav inline center, sign-in button right.
- Sticky on scroll, `surface` bg + `border` bottom.

### 1.2 Auth shell
- Centered single-column card, max-width 420px.
- Mobile: card full-width with 16px gutters.
- Tablet+: card floating on `page` background.

### 1.3 Authenticated shell
| Region | Mobile `<640` | Tablet `640–1023` | Laptop `≥1024` |
|---|---|---|---|
| Sidebar | Off-canvas drawer, hamburger in top bar | Collapsed icon-only rail (64px) with flyout | Expanded 240px sidebar, sticky |
| Top bar | Logo + context switcher + bell + avatar | + breadcrumbs | + breadcrumbs + search |
| Content | Full width, 16px padding | 24px padding | max-w-[1280px], 32px padding |
| Context switcher | Inline chip in top bar | Inline chip | Sidebar top dropdown |
| Notifications | Sheet from right | Sheet from right | Sheet from right |

**Context switch behavior (all breakpoints):**
1. If unsaved form → confirm dialog "Discard unsaved changes?".
2. Call API to switch active membership.
3. Clear all TanStack Query caches scoped to previous tenant.
4. Redirect to workspace home for new role.
5. Announce via `aria-live`: "Switched to {workspace name}".

### 1.4 Page header pattern (reusable `PageHeader`)
- Mobile: title stack, actions in overflow `⋯` menu.
- Tablet: title left, primary action right, secondary in overflow.
- Laptop+: title left, breadcrumbs above, actions right inline.

---

## 2. Student workspace

### 2.1 Dashboard
- Mobile: vertical card stack — Profile completeness → Verified status → Next steps → Eligible count → Deadlines → Active applications → Interviews → Offers.
- Tablet: 2-column grid.
- Laptop: 3-column grid, deadlines column always visible.

### 2.2 Profile
- Mobile: single-column sections with sticky save bar at bottom.
- Tablet+: two-column form (label+field) with section sidebar nav.
- Verification badge inline next to each field group (`Verified` / `Self-reported` / `Pending`).

### 2.3 Resume vault
- Mobile: card list, one per version, upload FAB bottom-right.
- Tablet+: table view with columns (Version, Label, Status, Uploaded, Actions).
- Scan status chips always visible (Pending/Clean/Rejected).

### 2.4 Opportunities list
- Mobile: full-width cards, filter drawer via "Filters" button, sort sheet.
- Tablet: 2-column card grid, filter bar inline above.
- Laptop: list with left filters sidebar (240px) + main list.
- Eligibility label chip on every card: `Eligible` (success) / `Ineligible` (danger) / `Needs review` (warning) / `Not evaluated` (neutral).

### 2.5 Opportunity detail
- Mobile: single-column, sticky bottom action bar (Apply / Save / Share).
- Tablet+: two-column (description left, criteria+apply card right).

### 2.6 Eligibility breakdown
- Mobile: accordion per criterion.
- Tablet+: table with columns (Criterion, Required, Your value, Status, Reason).

### 2.7 Applications list
- Mobile: cards with status timeline preview.
- Tablet+: table with sortable columns.

### 2.8 Application detail
- Mobile: vertical timeline, sticky bottom "Withdraw" (disabled after cutoff).
- Tablet+: two-column (timeline left, details right).

### 2.9 Interviews
- Mobile: card per interview, "Add to calendar" button.
- Tablet+: calendar list view (not full grid — see 2.10).
- Timezone label always visible: e.g. `14:30 IST (Asia/Kolkata)`.

### 2.10 Offers
- Mobile: full-screen detail with sticky accept/decline.
- Tablet+: dialog with summary + document viewer.

---

## 3. Placement admin workspace

### 3.1 Dashboard
- Mobile: KPI cards stacked + pending-actions list.
- Tablet: 2-col KPI grid, queue below.
- Laptop: 4-col KPI grid, queue tables below.

### 3.2 Students directory
- Mobile: cards (name, cohort, verification chip).
- Tablet: table with fewer columns, horizontal scroll for full data + "Open" row action.
- Laptop+: full data table, filters sidebar, bulk actions, column visibility.

### 3.3 Import wizard
- All sizes: 4-step stepper (Upload → Map columns → Preview/Reconcile → Commit).
- Mobile: one step per screen.
- Tablet+: stepper header sticky, content wide.

### 3.4 Opportunity review queue
- Mobile: cards with criteria preview.
- Laptop: two-pane layout — queue left (360px), preview right.

### 3.5 Applications pipeline
- Mobile: cards filtered by stage chip row (horizontal scroll).
- Tablet: two-pane (list left, detail right).
- Laptop: three-pane (filters / list / detail).

### 3.6 Interviews
- Mobile: list of upcoming, conflict alert banner if any.
- Laptop: calendar week view + list sidebar.

### 3.7 Announcements
- Mobile: composer is full-screen.
- Laptop: editor left, audience preview right.

### 3.8 Reports
- Mobile: chart cards stacked, export menu in header.
- Tablet: 2-col chart grid.
- Laptop: 3-col grid with filters sidebar.
- Every chart shows **denominator + date range + text summary** below it.

### 3.9 Audit
- Mobile: cards.
- Laptop: table with filters, export button behind permission + confirm.

### 3.10 Settings
- Mobile: accordion sections.
- Laptop: sidebar tabs + content pane.

---

## 4. Employer workspace

### 4.1 Company profile
- Mobile: stacked sections, save bar bottom.
- Laptop: two-column with verification status panel right.

### 4.2 Team
- Mobile: card per member.
- Laptop: table + invite dialog.

### 4.3 Opportunities list
- Mobile: cards grouped by status (Draft / In Review / Published / Paused / Closed).
- Laptop: table with status tabs.

### 4.4 Opportunity editor
- Mobile: single-column, sticky bottom save/submit bar.
- Laptop: two-column — form left, live preview + eligibility checklist right.

### 4.5 Applicant pipeline
- Same responsive pattern as placement pipeline but with field redaction
  applied to DTOs server-side.

### 4.6 Interviews
- Mobile: card per interview with candidate response.
- Laptop: list + detail with reschedule controls.

---

## 5. Leadership workspace

### 5.1 Overview
- Mobile: KPI stack + trend charts full-width.
- Laptop: 4-col KPI row + 2×2 chart grid.
- Every metric shows denominator + date range + definition tooltip.

### 5.2 Trends
- Mobile: chart full-width, filters as drawer.
- Laptop: chart + filters sidebar.

### 5.3 Exports
- Permission-gated. Confirm dialog states: field allowlist, row cap, expiry.

---

## 6. Cross-cutting rules

### 6.1 Tables
- Below `md`: convert to card list (never horizontal scroll for critical data).
- Above `md`: real table with sticky header on scroll > 1 viewport.
- Column priority order per table (implement via Tailwind `hidden md:table-cell` etc.).

### 6.2 Forms
- Mobile: single-column always.
- ≥ `md`: optional two-column for short paired fields only.
- Save bar sticky on mobile.
- Validation: inline under field; summary at top on submit failure.

### 6.3 Modals
- Mobile: full-screen sheet.
- ≥ `md`: centered dialog max-w-[560px] (form) / [720px] (detail).
- Focus trap, escape to close, restore focus to trigger.

### 6.4 Toasts
- Mobile: bottom, full-width, above safe area.
- ≥ `md`: bottom-right, max 400px.

### 6.5 Empty states
- Icon (accent-violet decorative) + heading + explanation + primary action.
- Mobile: centered, full-width.
- ≥ `md`: card, centered, max 480px.

### 6.6 Loading states
- Skeleton primitives matching final layout.
- Above 300ms → skeleton; below → keep UI stable, no flicker.

### 6.7 Error states
- Inline alert with retry.
- 401 → redirect to login with redirect-back.
- 403 → forbidden page with "Request access" copy.
- 404 → "Not found or not visible" (non-enumerable).
- 5xx → retry button + requestId in muted text.

### 6.8 Date/time
- All dates rendered via `<DateTimeWithTz>` — never `new Date().toString()` inline.
- Format: `Mon, 24 Nov 2026 · 14:30 IST (Asia/Kolkata)`.
- Relative times allowed alongside absolute (`2 hours ago · 14:30 IST`).

### 6.9 Numbers/currency
- `<NumberFormat>` and `<CurrencyFormat>` primitives — locale-aware, INR default.

### 6.10 Accessibility per breakpoint
- Target size 44×44 on touch, 32×32 minimum on pointer.
- Visible focus at all sizes.
- Skip-to-content link on every authenticated page.
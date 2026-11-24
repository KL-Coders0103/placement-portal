# UI/UX Guidelines and Design System

## 1. Product experience

Design a trustworthy, professional campus recruitment product. Students should understand readiness, eligibility, deadlines, and application progress. Administrators should be able to manage jobs and applicant queues efficiently. Avoid an over-decorated marketing aesthetic inside operational dashboards.

The frontend is planned with React + Tailwind CSS. The tokens below are a proposed baseline, not an approved brand identity; confirm with Figma/product owner before treating them as final.

## 2. Visual direction and tokens

Suggested direction: modern institutional SaaS, light surfaces, strong typography, restrained indigo primary, teal progress accent, neutral backgrounds.

| Token | Proposed value | Usage |
|---|---|---|
| Primary | `#283593` | Main navigation, primary actions |
| Primary hover | `#1A237E` | Hover/active |
| Accent | `#0F9D8A` | Progress and positive emphasis |
| Background | `#F7F8FC` | App canvas |
| Surface | `#FFFFFF` | Cards, dialogs |
| Text | `#172033` | Primary text |
| Muted | `#667085` | Supporting text |
| Border | `#E4E7EC` | Dividers and outlines |
| Success | `#16803C` | Success state |
| Warning | `#B54708` | Deadline/attention |
| Danger | `#B42318` | Error/rejection |
| Info | `#175CD3` | Neutral information |

Do not rely on color alone; every state needs text and/or an icon.

## 3. Typography and spacing

- Use a legible sans-serif font with consistent weights.
- Desktop page title: 28–32 px; mobile: 24–28 px.
- Section title: 20–24 px; card title: 16–18 px.
- Body: 14–16 px; helper/meta: 12–14 px with sufficient contrast.
- Use a 4 px base spacing scale and common 8/12/16/24/32 increments.
- Keep line lengths readable and avoid dense all-in-one forms.

## 4. Layout principles

### Student dashboard
- Welcome/placement readiness summary.
- Profile completion checklist.
- Recommended/open opportunities.
- Upcoming deadlines.
- Recent applications with clear statuses.
- Quick links to profile and resume.

### Student job discovery/detail
- Search and filters for role, location, work mode, skills, and eligibility.
- Job card with company, title, location, deadline, and eligibility state.
- Detail page separates description, responsibilities, requirements, criteria, and apply CTA.
- Display eligibility reasons and missing profile data.

### Admin dashboard
- Summary metrics with date/cohort context.
- Job lifecycle overview.
- Applicant review queue.
- Filters for branch, graduation year, CGPA, skill, and status.
- Bulk operations require explicit confirmation and audit.

## 5. Components

- App shell, header, sidebar, mobile navigation, breadcrumbs.
- Buttons: primary, secondary, outline, danger, icon, loading, disabled.
- Inputs: text, email, password, select, multi-select, textarea, number, date.
- Form field: label, required indicator, hint, error.
- Cards, tables, pagination, filters, tabs, badges, dialogs, drawers, toasts.
- Job card, eligibility panel, skill chip, resume uploader, application timeline.
- Dashboard metric, chart, empty state, skeleton, error boundary.
- Admin review panel and audit history.

## 6. Interaction and state standards

Every async screen must handle loading, empty, success, validation, network error, server error, and retry. Prevent duplicate form submission. Preserve user input on recoverable failures. Confirm destructive actions. Use optimistic updates only where rollback is safe.

## 7. Responsive requirements

Test at 320, 360, 390, 768, 1024, 1280, and 1440 px:
- No page-level horizontal overflow.
- Tables become cards or have deliberate horizontal scrolling.
- Sidebar collapses to drawer/compact navigation.
- Forms stack to one column on small screens.
- Primary actions remain reachable.
- Touch targets are approximately 44 × 44 px.
- Dialogs fit viewport and support scrolling.

## 8. Accessibility requirements

- Semantic landmarks and heading order.
- Visible labels and associated form controls.
- Keyboard operation for navigation, dialogs, menus, and tables.
- Visible focus ring and logical tab order.
- WCAG AA contrast target.
- Screen-reader announcements for validation and async state.
- Alt text for meaningful images; decorative assets hidden.
- Reduced-motion preference respected.
- Status never indicated by color alone.

## 9. AI explanation UX

Never show a match percentage by itself. Show matched skills, missing skills, required-vs-preferred distinction, evidence/source, generated time, algorithm version, and caveat that score is advisory. Provide a correction path for extracted profile data.

## 10. Design handoff checklist

Figma pages cover tokens, typography, icons, components, variants, student flows, admin flows, mobile breakpoints, empty/error/loading states, and accessibility annotations. Keep implementation tokens synchronized with the approved design file.

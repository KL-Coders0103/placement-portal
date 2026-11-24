# Placement Portal — Design System

**Status:** Light-theme baseline for implementation  
**Theme:** Light only; dark mode is not required  
**Applications:** Public pages and role-specific workspaces  
**Token authority:** Components must use semantic design tokens, not scattered raw values

## 1. Design philosophy

The product should feel trustworthy, clear, professional and supportive. It serves students making important career decisions and staff coordinating sensitive institutional workflows. Prioritize legibility, predictable navigation, clear status, calm surfaces and confident actions. Avoid a generic admin-template appearance, excessive gradients, glass effects and decorative animation.

## 2. Color distribution

Use a 60-30-10 visual balance:
- **60% neutral light surfaces:** page backgrounds, cards, tables, whitespace and separators.
- **30% primary navy/royal blue:** navigation, headings, selected navigation, structure and key information hierarchy.
- **10% accent and semantic colors:** primary CTAs, focus emphasis, highlights and statuses.

Blue should communicate structure and trust; accent colors should remain restrained. Do not use color alone to communicate status.

## 3. Light palette

| Token | Value | Usage |
|---|---|---|
| brand-navy | `#14213D` | Main navigation, strong headings, brand anchor |
| brand-blue | `#3157D5` | Primary buttons, links, selected states |
| brand-blue-hover | `#2546B8` | Hover/pressed state |
| brand-blue-soft | `#EAF0FF` | Selected rows, subtle callouts |
| page | `#F6F8FC` | Main application background |
| surface | `#FFFFFF` | Cards, dialogs, inputs and tables |
| surface-subtle | `#F1F4F9` | Secondary panels |
| text-primary | `#172033` | Main content |
| text-secondary | `#596579` | Supporting text |
| text-muted | `#778399` | Timestamps and tertiary metadata |
| border | `#E1E7F0` | Dividers and outlines |
| focus | `#4B75F2` | Visible keyboard focus |
| accent-teal | `#0F8B8D` | Secondary highlight, use sparingly |
| success | `#16845B` | Success/verified |
| warning | `#A96812` | Needs attention/pending |
| danger | `#C43D4B` | Error/rejected/destructive |
| info | `#2865B8` | Informational state |

Check final text/background pairs for WCAG contrast; adjust semantic token pairings rather than weakening contrast.

## 4. Typography

Use a modern, highly readable sans-serif stack such as Inter with system fallbacks. Suggested scale:
- Display: 32–40px, page hero only.
- H1: 28–32px.
- H2: 22–24px.
- H3: 18–20px.
- Body: 14–16px.
- Small/meta: 12–13px, never for essential instructions.
Use 1.4–1.6 line height for body. Avoid all-caps labels for long text.

## 5. Layout and spacing

Use a 4px base spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Content width should remain readable; dashboards may use wider layouts. Cards use consistent padding, subtle borders and restrained shadows. Use 8–12px control radii and 12–16px card radii.

## 6. Components

- Buttons: primary, secondary, outline, ghost, danger; clear loading/disabled states.
- Inputs: visible labels, helper/error text, keyboard focus and correct autocomplete.
- Cards: consistent title, content and action hierarchy.
- Badges: text plus semantic color; never rely on color alone.
- Tables: responsive columns, sticky header only when useful, row actions with permission-aware visibility.
- Dialogs/drawers: focus trap, escape handling and explicit close label.
- Toasts: concise confirmation/error; persistent errors also appear inline.
- Empty states: explain why no data exists and the next permitted action.
- Status timeline: actor/time/reason where the viewer is authorized.
- File upload: accepted formats, size limit, scan status and privacy notice.
- Charts: label axes, date range, units, denominator and accessible text summary.

## 7. Responsive behavior

Breakpoints: mobile <640px, tablet 640–1023px, desktop 1024–1279px, wide ≥1280px. Use fluid sizing, not device-specific hacks. Student experience is mobile-first. Admin/employer workspaces are desktop-optimized but must support tablet and phone for essential tasks. Tables collapse into summary cards or controlled horizontal scrolling with an alternate detail view.

## 8. Interaction and feedback

Every async page supports loading, empty, error, retry and success states. Forms show field-level validation and preserve safe user input on recoverable errors. Do not optimistically show a sensitive workflow transition as complete before API confirmation. Destructive actions require confirmation and explain impact. Display pending/verified/rejected states with clear labels.

## 9. Accessibility

Target WCAG 2.2 AA. Require keyboard navigation, visible focus, semantic headings, form labels, dialog focus management, sufficient contrast, screen-reader status announcements, touch targets, reduced-motion support, accessible charts and meaningful link text.

## 10. Light-theme implementation rules

- Do not add dark theme toggles, dark palettes or theme persistence in MVP.
- Define tokens centrally in CSS variables/Tailwind theme.
- No one-off hardcoded hex values in feature components.
- Validate focus, hover, disabled and error states in light theme.
- Screenshots and visual QA should use the same light palette.

## 11. Design QA checklist

Check 360px, 768px, 1024px and 1440px; keyboard-only flow; 200% zoom; empty/error/loading states; long student names and company names; large tables; charts with missing data; contrast; focus; and responsive navigation.

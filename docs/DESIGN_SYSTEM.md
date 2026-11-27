# Placement Portal — Design System

**Version:** 2.0 (purple-violet identity)
**Status:** Implementation baseline — light theme only
**Token authority:** Components MUST consume semantic tokens. No hardcoded hex in feature code.
**Contrast standard:** WCAG 2.2 AA (4.5:1 body text, 3:1 large text & UI components)

---

## 1. Design philosophy

Trustworthy, clear, professional, supportive. For students making career decisions and staff running sensitive workflows. Prioritize legibility, predictable navigation, clear status, calm surfaces, confident actions. Avoid generic admin templates, glass effects, decorative animation.

---

## 2. Color identity — the violet family

The brand identity is a violet/purple scale derived from six seed colors. Semantic
colors (success/warning/danger/info) are deliberately hue-shifted *cooler* so they
never collide with the violet brand on-screen.

### 2.1 Seed colors (given)

| Seed | Hex | Name |
|---|---|---|
| S1 | `#f5f7ff` | lavender-white |
| S2 | `#c7c1ff` | pale-violet |
| S3 | `#8b7cf6` | violet-accent |
| S4 | `#5046e5` | royal-violet |
| S5 | `#1e1b4b` | deep-violet-ink |
| S6 | `#0b0f1a` | near-black |

### 2.2 Derived token palette

| Token | Value | Contrast on `surface` (#FFFFFF) | Usage |
|---|---|---|---|
| `page` | `#f5f7ff` | — | App background |
| `surface` | `#FFFFFF` | — | Cards, dialogs, inputs, tables |
| `surface-subtle` | `#f9faff` | — | Secondary panels (tinted lavender) |
| `surface-strong` | `#eceaff` | — | Hover row, selected callout |
| `border` | `#e6e4f5` | — | Dividers, input outlines |
| `border-strong` | `#c7c1ff` | — | Focus rings, active border, chart grid |
| `brand-primary` | `#5046e5` | **6.1:1** ✅ AA text | Primary CTAs, links, active nav, selected |
| `brand-primary-hover` | `#4338ca` | 7.2:1 ✅ | Hover/pressed |
| `brand-primary-soft` | `#eeeaff` | — | Selected row bg, subtle callout |
| `brand-ink` | `#1e1b4b` | 14.6:1 ✅ | Nav background, headings, brand anchor |
| `brand-ink-hover` | `#14122f` | — | Nav hover |
| `accent-violet` | `#8b7cf6` | **2.9:1** ❌ | **Decorative only** — icons, chart series, badges with bold text, hover glow. **Never for body text on white.** |
| `accent-violet-soft` | `#ede9ff` | — | Tag/chip background (with dark text) |
| `text-primary` | `#0b0f1a` | 18.4:1 ✅ | Main content |
| `text-secondary` | `#4a486a` | 8.0:1 ✅ | Supporting text |
| `text-muted` | `#6b6a8a` | 5.1:1 ✅ | Timestamps, tertiary metadata |
| `text-inverse` | `#f5f7ff` | on `brand-ink` 14.6:1 ✅ | Text on dark nav |
| `focus-ring` | `#5046e5` | — | 2px focus outline + 2px offset |
| `focus-halo` | `#c7c1ff` | — | Outer glow for focus ring |

### 2.3 Semantic colors (hue-shifted for violet harmony)

| Token | Value | On white | Usage |
|---|---|---|---|
| `success-fg` | `#0f7a52` | 5.4:1 ✅ | Success text/icon |
| `success-bg` | `#e6f7ef` | — | Success surface |
| `success-border` | `#9dd9bf` | — | Success outline |
| `warning-fg` | `#a15c00` | 5.9:1 ✅ | Warning text/icon |
| `warning-bg` | `#fdf3e3` | — | Warning surface |
| `warning-border` | `#f3d39a` | — | Warning outline |
| `danger-fg` | `#b4232f` | 6.3:1 ✅ | Error text/icon |
| `danger-bg` | `#fdecee` | — | Error surface |
| `danger-border` | `#f2b8bf` | — | Error outline |
| `info-fg` | `#1f5fb3` | 6.1:1 ✅ | Informational text |
| `info-bg` | `#e8f1fd` | — | Info surface |
| `info-border` | `#a9c8ef` | — | Info outline |
| `neutral-fg` | `#4a486a` | 8.0:1 ✅ | Neutral text |
| `neutral-bg` | `#f0eefc` | — | Neutral chip bg |

### 2.4 Contrast verification (must-pass pairs)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `text-primary` `#0b0f1a` | `surface` `#ffffff` | 18.4 | ✅ AAA |
| `text-primary` | `page` `#f5f7ff` | 16.9 | ✅ AAA |
| `text-secondary` `#4a486a` | `surface` | 8.0 | ✅ AAA |
| `text-muted` `#6b6a8a` | `surface` | 5.1 | ✅ AA |
| `brand-primary` `#5046e5` | `surface` | 6.1 | ✅ AA |
| `text-inverse` `#f5f7ff` | `brand-ink` `#1e1b4b` | 14.6 | ✅ AAA |
| `danger-fg` `#b4232f` | `danger-bg` `#fdecee` | 5.7 | ✅ AA |
| `success-fg` `#0f7a52` | `success-bg` `#e6f7ef` | 4.8 | ✅ AA |
| `accent-violet` `#8b7cf6` | `surface` | **2.9** | ❌ **Not for text** |

**Rule:** any new text/background pairing introduced during implementation must be
run through a contrast checker and added to this table with the measured ratio.
`accent-violet` may only carry **large bold text ≥18.66px**, icon glyphs, or
decorative fills.

---

## 3. Color distribution (60-30-10)

- **60%** neutral light surfaces (`page`, `surface`, `surface-subtle`)
- **30%** violet structure (`brand-ink` nav, `brand-primary` actions, `brand-ink` headings)
- **10%** accent + semantic (`accent-violet` decoration, status colors, focus)

Never use color alone for status — pair with text label + icon.

---

## 4. Typography

**Family:** `Inter, "Inter var", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
**Monospace (ids, codes):** `"JetBrains Mono", "SF Mono", Consolas, monospace`

| Role | Size | Line height | Weight | Usage |
|---|---|---|---|---|
| Display | 36–40px | 1.15 | 700 | Public hero only |
| H1 | 28–30px | 1.2 | 700 | Page title |
| H2 | 22–24px | 1.25 | 600 | Section |
| H3 | 18–20px | 1.35 | 600 | Subsection, card title |
| Body | 15–16px | 1.55 | 400 | Default |
| Body-sm | 14px | 1.5 | 400 | Dense tables |
| Meta | 12–13px | 1.4 | 500 | Timestamps, badges |
| Mono | 13px | 1.4 | 400 | IDs, codes |

**Rules:** no all-caps for long text (only badges/labels ≤ 24 chars). No text below 12px.
Minimum 200% zoom legible.

---

## 5. Spacing, radii, elevation

- **Spacing:** 4px base — `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64`
- **Radii:** control 8px, card 12px, dialog 16px, pill 999px
- **Elevation:** `shadow-sm` 0 1px 2px rgba(30,27,75,0.06); `shadow-md` 0 4px 12px rgba(30,27,75,0.08); `shadow-lg` 0 12px 32px rgba(30,27,75,0.12). No heavy drop shadows.
- **Focus:** 2px `focus-ring` + 2px offset + 4px `focus-halo` glow.

---

## 6. Motion

- Durations: 120ms (state), 200ms (enter), 300ms (drawer). Max 400ms.
- Easing: `cubic-bezier(0.2, 0, 0.2, 1)`.
- Respect `prefers-reduced-motion: reduce` — disable non-essential motion globally.
- Never animate layout-affecting properties except opt-in.

---

## 7. Components (required primitives)

Buttons (primary/secondary/outline/ghost/danger × sm/md/lg × loading/disabled), Input/Textarea/Select/Combobox, Checkbox/Radio/Switch, Dialog/Drawer, Tabs, Badge (semantic), Avatar, Tooltip, Dropdown, DataTable (sort, filter, pagination, empty, loading, error), Pagination, EmptyState, Skeleton, Alert, Toast, FileUpload (with scan-state), StatusTimeline, ConfirmAction, MetricCard, FilterBar, DateTimeWithTz, NumberFormat, CurrencyFormat, CopyButton, PageHeader, SectionCard, FormField, ErrorBoundary.

All primitives:
- Consume only design tokens.
- Have a default, hover, focus-visible, active, disabled, loading, error state.
- Pass contrast table.
- Support keyboard fully.
- Expose `aria-*` correctly.

---

## 8. Responsive behavior

Breakpoints: `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1440`.
See `docs/UI_RESPONSIVE_SPEC.md` for per-page layouts.

---

## 9. Accessibility

WCAG 2.2 AA target. Semantic HTML, keyboard-complete, focus-visible everywhere, dialog focus trap,
status announcements via `role="status"` / `aria-live`, reduced-motion honored, alt text required,
color not sole indicator, links descriptive, target size ≥ 44×44px on touch.

---

## 10. Light-theme rules

- No dark toggle, no dark palette, no theme persistence.
- Tokens live in `apps/web/src/styles/tokens.css` (CSS variables) mirrored in
  `tailwind.config.ts` `theme.extend.colors`.
- **Zero** one-off `#hex` in any component or feature file. Enforced by ESLint rule
  `no-restricted-syntax` on JSX attributes and CSS strings.
- All design QA screenshots use this light palette.

---

## 11. Design QA checklist

360 / 768 / 1024 / 1440; keyboard-only; 200% zoom; long names (60+ chars); empty/error/loading;
contrast verification; visible focus; reduced-motion; tables on mobile; timezone labels.
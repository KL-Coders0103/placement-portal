# UI/UX Guidelines

## 1. Product experience

The portal serves students and placement administrators. Its interface should feel trustworthy, clear, and efficient rather than overly decorative. Prioritize job discovery, profile completeness, application progress, and admin review workflows.

The repository notes specify React + Tailwind CSS as the intended frontend, but no frontend implementation or approved final visual design is currently present. The design tokens below are a proposed starting system and should be reconciled with the Figma design before implementation.

## 2. Proposed visual direction

- **Primary:** deep indigo/navy for trust and navigation.
- **Accent:** teal for positive actions and progress.
- **Surface:** white cards on a very light neutral background.
- **Text:** high-contrast charcoal, with muted secondary text.
- **Status:** success, warning, danger, and informational states must include text/icon labels as well as color.

Suggested starting tokens (adjust after design review):
- Primary: `#283593`
- Accent: `#0F9D8A`
- Background: `#F7F8FC`
- Surface: `#FFFFFF`
- Text: `#172033`
- Muted: `#667085`
- Border: `#E4E7EC`
- Success: `#16803C`
- Warning: `#B54708`
- Danger: `#B42318`

## 3. Typography

Use a readable sans-serif family with a clear hierarchy:
- Page title: 28–32 px desktop, 24–28 px mobile.
- Section heading: 20–24 px.
- Card heading: 16–18 px.
- Body: 14–16 px.
- Supporting/meta text: 12–14 px, never too low contrast.

Use consistent line height and avoid long, dense text blocks in dashboards.

## 4. Spacing and layout

Use a consistent 4/8 px spacing scale. Keep content in a responsive container, with a stable sidebar on wide admin screens and a compact navigation pattern on mobile. Use clear card boundaries and whitespace to separate job details, eligibility, and application actions.

## 5. Core components

- App shell, header, navigation, breadcrumbs.
- Form fields with labels, hints, inline validation, and error summaries.
- Buttons with default, hover, focus, disabled, and loading states.
- Job cards and job detail panels.
- Eligibility checklist with reasons.
- Application status timeline.
- Student profile completion indicator.
- Resume upload/drop zone with accepted format and size guidance.
- Tables with pagination, sorting, empty states, and mobile alternatives.
- Confirmation dialogs for irreversible admin actions.
- Toasts/alerts for transient operation feedback.

## 6. Responsive rules

- Mobile-first implementation; test at 320, 375, 768, 1024, and 1440 px widths.
- No horizontal overflow on common mobile sizes.
- Convert wide tables to cards or controlled horizontal scrolling.
- Keep primary actions reachable without excessive scrolling.
- Form controls should have comfortable touch targets (approximately 44 px).
- Sidebar navigation should collapse into a drawer or compact navigation on smaller screens.

## 7. Accessibility

- Use semantic headings, landmarks, buttons, and form elements.
- Associate each input with a visible label.
- Support keyboard navigation and visible focus.
- Maintain adequate contrast for text and interactive states.
- Do not rely on color alone for job/application status.
- Announce validation and async updates accessibly.
- Provide alt text for meaningful illustrations and hide decorative assets from screen readers.

## 8. Interaction standards

- Show skeleton/loading states for data requests.
- Provide intentional empty states with next steps.
- Disable duplicate submissions while a request is pending.
- Confirm destructive actions and clearly report their result.
- Preserve user-entered form data after recoverable server errors.
- Explain eligibility and AI match results with concrete factors.

## 9. Design consistency

Create shared tokens and reusable components before building multiple dashboards. Keep spacing, typography, radii, and button behavior consistent. Figma remains the design reference when an approved file is available; do not invent brand assets or claim these proposed colors are final.

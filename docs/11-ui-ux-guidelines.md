# 11 — UI/UX and Design System

## Visual direction
Trustworthy career platform with navy, royal blue, white and calm neutral surfaces. Suggested semantic tokens: navy #101B3F, royal blue #3157D5, white #FFFFFF, page #F5F7FC, text #172033, muted #667085, border #E4E8F0, success #16845B, warning #B7791F, danger #C93636. Centralize tokens; color is never the only status cue.

## Layout
Desktop: persistent role sidebar, top bar with institution/workspace context, breadcrumbs, page title and content. Tablet: collapsible sidebar and responsive filters. Mobile: compact header, drawer or student bottom navigation, stacked cards. Avoid horizontal page overflow. Dense tables should adapt columns and provide detail views.

## Role dashboards
Student: profile completeness, opportunities, deadlines, application timeline, interviews and unread notifications.
Admin: verification queues, company approvals, pending jobs, active drives, stage counts and outcomes.
Recruiter: own opportunities, approval feedback, applicant pipeline and interviews.
Leadership: aggregate trends and cohort outcomes; no unnecessary PII.

## Shared components
Button, Input, Select, Checkbox, Dialog, Drawer, Tabs, Badge, Avatar, Tooltip, Dropdown, DataTable, Pagination, EmptyState, Skeleton, Alert, Toast, FileUpload, StatusTimeline, ConfirmAction, MetricCard, FilterBar.
Domain components: OpportunityCard, EligibilityBreakdown, ApplicationTimeline, StudentProfileSections, ResumeVersionList, ApplicantReviewPanel, InterviewSchedule, ApprovalPanel and ReportChart.

## Interaction rules
Forms have labels, helper text, validation, submitting and server-error states. Destructive actions require confirmation. Tables support loading, empty, error, sort/filter and pagination. Status changes show actor/time/reason where allowed. Sensitive transitions wait for server confirmation; do not optimistically claim success. Every route covers loading, empty, error and forbidden states.

## Accessibility
Target WCAG 2.2 AA. Keyboard access, visible focus, semantic headings, form labels, dialog focus management, contrast, screen-reader announcements, touch targets, reduced motion, accessible tables and text summaries for charts.

## Responsive QA
Test 360px mobile, 768px tablet, 1024px laptop and 1440px desktop. Use fluid layouts and real content. Test keyboard-only navigation and browser zoom.

## Trustworthy content
Explain eligibility reasons without exposing internal notes. Distinguish verified from self-reported facts. Show last-updated times. Define chart denominators and time windows. Never imply an AI score measures candidate worth or guarantees placement.
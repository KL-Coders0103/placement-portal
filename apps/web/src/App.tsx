import { Button } from '@/components/ui/Button';

/**
 * Phase 01 placeholder shell.
 * Real routing and layouts arrive in Phase 02.
 */
export function App(): JSX.Element {
  return (
    <main className="min-h-screen bg-page p-8">
      <div className="mx-auto max-w-2xl rounded-card bg-surface p-8 shadow-sm">
        <h1 className="text-h1 text-brand-ink">Placement Portal</h1>
        <p className="mt-2 text-body text-text-secondary">
          Institution-governed placement and recruitment management platform.
        </p>
        <p className="mt-4 text-meta text-text-muted">
          Phase 01 — repository foundation. Application features arrive in Phase 02.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
    </main>
  );
}
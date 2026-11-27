import { forwardRef, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary:
    'bg-brand-primary text-text-inverse hover:bg-brand-primary-hover disabled:bg-brand-primary/50',
  secondary:
    'bg-brand-primary-soft text-brand-primary hover:bg-surface-strong disabled:opacity-50',
  outline:
    'border border-border-strong bg-surface text-text-primary hover:bg-surface-subtle disabled:opacity-50',
  ghost:
    'bg-transparent text-text-primary hover:bg-surface-subtle disabled:opacity-50',
  danger:
    'bg-danger text-text-inverse hover:bg-danger/90 disabled:bg-danger/50',
};

const sizeClass: Record<Size, string> = {
  sm: 'h-8 px-3 text-body-sm rounded-control',
  md: 'h-10 px-4 text-body rounded-control',
  lg: 'h-12 px-6 text-body rounded-card',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', isLoading = false, disabled, className = '', children, ...rest },
  ref,
) {
  const isDisabled = disabled || isLoading;
  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={[
        'inline-flex items-center justify-center gap-2 font-medium transition-colors',
        'focus-visible:outline-none disabled:cursor-not-allowed',
        variantClass[variant],
        sizeClass[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}
      {children}
    </button>
  );
});
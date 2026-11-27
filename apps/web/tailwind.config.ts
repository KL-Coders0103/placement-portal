import type { Config } from 'tailwindcss';

/**
 * Tailwind config — mirrors DESIGN_SYSTEM.md v2.0 (violet palette).
 * Design tokens live here AND in src/styles/tokens.css.
 * Components MUST consume semantic names (bg-brand-primary, text-text-primary)
 * — never raw hex.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        page: '#f5f7ff',
        surface: '#ffffff',
        'surface-subtle': '#f9faff',
        'surface-strong': '#eceaff',
        border: '#e6e4f5',
        'border-strong': '#c7c1ff',

        // Brand
        'brand-primary': '#5046e5',
        'brand-primary-hover': '#4338ca',
        'brand-primary-soft': '#eeeaff',
        'brand-ink': '#1e1b4b',
        'brand-ink-hover': '#14122f',
        'accent-violet': '#8b7cf6',
        'accent-violet-soft': '#ede9ff',

        // Text
        'text-primary': '#0b0f1a',
        'text-secondary': '#4a486a',
        'text-muted': '#6b6a8a',
        'text-inverse': '#f5f7ff',

        // Focus
        'focus-ring': '#5046e5',
        'focus-halo': '#c7c1ff',

        // Semantic — fg / bg / border trios
        success: { DEFAULT: '#0f7a52', bg: '#e6f7ef', border: '#9dd9bf' },
        warning: { DEFAULT: '#a15c00', bg: '#fdf3e3', border: '#f3d39a' },
        danger:  { DEFAULT: '#b4232f', bg: '#fdecee', border: '#f2b8bf' },
        info:    { DEFAULT: '#1f5fb3', bg: '#e8f1fd', border: '#a9c8ef' },
        neutral: { DEFAULT: '#4a486a', bg: '#f0eefc', border: '#e6e4f5' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        display: ['2.5rem', { lineHeight: '1.15', fontWeight: '700' }],
        h1: ['1.875rem', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '1.25', fontWeight: '600' }],
        h3: ['1.25rem', { lineHeight: '1.35', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.55' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        meta: ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        control: '0.5rem',
        card: '0.75rem',
        dialog: '1rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(30,27,75,0.06)',
        md: '0 4px 12px rgba(30,27,75,0.08)',
        lg: '0 12px 32px rgba(30,27,75,0.12)',
      },
      spacing: {
        0.5: '2px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;
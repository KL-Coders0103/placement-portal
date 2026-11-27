// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/*.css',
      'infra/**',
      'scripts/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "Literal[value=/^#([0-9a-fA-F]{3,8})$/]",
          message:
            'Hardcoded hex colors are forbidden in feature code. Use design tokens — see DESIGN_SYSTEM.md §10.',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Design tokens are DEFINED here — hex is expected. Do not enforce the rule.
    files: [
      'apps/web/tailwind.config.ts',
      'apps/web/tailwind.config.js',
      'apps/web/src/styles/**/*.{ts,tsx,css}',
    ],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  {
    // The single API client is exempt from the no-hex rule and the fetch restriction.
    files: ['apps/web/src/lib/api/client.ts'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  prettier,
];
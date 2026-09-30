// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Variables: Declarations, scope, shadowing, assignments and destructuring.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Variables rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function variablesBlock() {
  return [
    {
      name: 'rules/variables',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-const-assign': ['error'],
        'no-dupe-args': ['error'],
        'no-inner-declarations': ['error'],
        'no-unassigned-vars': ['error'],
        'no-undef': ['error'],
        'no-unused-vars': ['error'],
        'no-use-before-define': ['error'],
        'block-scoped-var': ['warn'],
        // Off: non-standard, forbids `let x: T;` assigned later.
        'init-declarations': ['off'],
        'no-delete-var': ['warn'],
        'no-global-assign': ['error'],
        'no-implicit-globals': ['error'],
        // `a = b = 0` is allowed, `const a = (b = 0)` is not.
        'no-multi-assign': ['info', { ignoreNonDeclaration: true }],
        'no-redeclare': ['error'],
        'no-restricted-globals': ['off'],
        'no-shadow': ['warn'],
        'no-undef-init': ['off'],
        'no-useless-rename': ['error'],
        'no-var': ['error'],
        'no-with': ['error'],
        // One declaration per statement (cleaner diffs).
        'one-var': ['error', 'never'],
        // Destructuring is reported only when every variable could be const.
        'prefer-const': ['error', { destructuring: 'all' }],
        'prefer-destructuring': ['error'],
        // Off: `var` is forbidden (no-var).
        'vars-on-top': ['off'],
        // ---- SonarJS ----
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/destructuring-assignment-syntax': ['off'],
        // Off: duplicate of block-scoped-var.
        'sonarjs/block-scoped-var': ['off'],
        // Off: duplicate of no-delete-var.
        'sonarjs/no-delete-var': ['off'],
        // Off: duplicate of no-shadow-restricted-names.
        'sonarjs/no-globals-shadowing': ['off'],
        // Off: duplicate of no-undef (and a TypeScript compiler error).
        'sonarjs/no-implicit-global': ['off'],
        // Off: duplicate of @typescript-eslint/no-unused-vars (which honours the `_` prefix).
        'sonarjs/no-unused-vars': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/declarations-in-global-scope': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-mixed-completion-style': ['off'],
        'sonarjs/no-nested-assignment': ['warn'],
        'sonarjs/no-redundant-assignments': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-variable-usage-before-declaration': ['off'],
      },
    },
    {
      name: 'rules/variables/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        'no-const-assign': ['off'],
        'no-dupe-args': ['off'],
        'no-undef': ['off'],
        'no-with': ['off'],
        'no-delete-var': ['off'],
        'no-implicit-globals': ['off'],
        // Off: see core rule. If enabled, write `['error', 'always']` (ESLint 10 passes no default mode).
        '@typescript-eslint/init-declarations': ['off'],
        '@typescript-eslint/no-dynamic-delete': ['warn'],
        // Replaced by the TS version (a type and a value may not share a name either).
        'no-redeclare': ['off'],
        '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: false }],
        // Replaced by the TS version.
        'no-shadow': ['off'],
        '@typescript-eslint/no-shadow': ['warn'],
        // Replaced by the TS version.
        'no-unused-vars': ['off'],
        // `_` prefix = intentionally unused.
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
          },
        ],
        // Replaced by the TS version.
        'no-use-before-define': ['off'],
        // Hoisted function declarations may be used before their definition.
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        '@typescript-eslint/no-useless-default-assignment': ['info'],
        '@typescript-eslint/prefer-as-const': ['error'],
        // Replaced by the TS version.
        'prefer-destructuring': ['off'],
        '@typescript-eslint/prefer-destructuring': ['error'],
      },
    },
  ];
}

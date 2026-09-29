// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Functions: Declarations, parameters, return values and callbacks: consistent, small and predictable functions.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Functions rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function functionsBlock() {
  return [
    {
      name: 'code/functions',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-func-assign': ['error'],
        'no-obj-calls': ['error'],
        // Off: breaks the prettier/prettier autofix (eslint-plugin-prettier docs).
        'arrow-body-style': ['off'],
        // Off: TypeScript `noImplicitReturns` covers it.
        'consistent-return': ['off'],
        'default-param-last': ['error'],
        // Custom: named functions use `function foo()`, not `const foo = () =>`.
        'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
        // Off: replaced by sonarjs/max-lines-per-function (200), like SonarQube.
        'max-lines-per-function': ['off'],
        // Off: replaced by sonarjs/no-nested-functions (5), like SonarQube.
        'max-nested-callbacks': ['off'],
        // 7 = SonarQube default (S107).
        'max-params': ['error', { max: 7, countThis: 'never' }],
        'no-caller': ['error'],
        'no-empty-function': ['error'],
        'no-extra-bind': ['error'],
        // Custom: parameters' properties cannot be mutated either; libraries must expose methods instead.
        'no-param-reassign': ['error', { props: true }],
        // No assignment in `return`, even in parentheses.
        'no-return-assign': ['error', 'always'],
        'no-useless-call': ['error'],
        // Off: covered by sonarjs/no-redundant-jump, which also reports useless `continue`.
        'no-useless-return': ['off'],
        // Off: breaks the prettier/prettier autofix (eslint-plugin-prettier docs).
        'prefer-arrow-callback': ['off'],
        'prefer-rest-params': ['error'],
        // ---- SonarJS ----
        'sonarjs/max-lines-per-function': ['error', { maximum: 60 }],
        // Custom: rules off in the preset, enabled for a strict library.
        'sonarjs/bool-param-default': ['error'],
        'sonarjs/prefer-immediate-return': ['error'],
        // Off: already a TypeScript compiler error.
        'sonarjs/no-extra-arguments': ['off'],
        // Off: duplicate of no-param-reassign.
        'sonarjs/no-parameter-reassignment': ['off'],
        // Off: duplicate of @typescript-eslint/no-confusing-void-expression.
        'sonarjs/no-use-of-empty-return-value': ['off'],
        'sonarjs/arrow-function-convention': ['off'],
        'sonarjs/call-argument-line': ['error'],
        'sonarjs/inconsistent-function-call': ['error'],
        'sonarjs/no-function-declaration-in-block': ['off'],
        'sonarjs/no-identical-functions': ['error'],
        'sonarjs/no-ignored-return': ['error'],
        'sonarjs/no-inconsistent-returns': ['off'],
        'sonarjs/no-invariant-returns': ['error'],
        'sonarjs/no-literal-call': ['error'],
        'sonarjs/no-nested-functions': ['error'],
        'sonarjs/no-selector-parameter': ['error'],
        'sonarjs/no-unused-function-argument': ['off'],
        // ---- Unicorn ----
        'unicorn/consistent-arrow-return-style': ['off'],
        'unicorn/consistent-function-scoping': ['error'],
        'unicorn/consistent-function-style': ['off'],
        'unicorn/isolated-functions': ['error'],
        'unicorn/max-nested-calls': ['error'],
        'unicorn/no-array-callback-reference': ['error'],
        // Off: already a TypeScript compiler error.
        'unicorn/no-invalid-argument-count': ['off'],
        'unicorn/no-object-as-default-parameter': ['error'],
        'unicorn/no-unreadable-iife': ['error'],
        'unicorn/prefer-block-statement-over-iife': ['error'],
        'unicorn/prefer-default-parameters': ['error'],
        'unicorn/prefer-reflect-apply': ['error'],
        'unicorn/prefer-single-call': ['error'],
        'unicorn/prefer-url-search-parameters': ['error'],
      },
    },
    {
      name: 'code/functions/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        'no-func-assign': ['off'],
        'no-obj-calls': ['off'],
        // Off: TypeScript `noImplicitReturns` covers it.
        '@typescript-eslint/consistent-return': ['off'],
        // Replaced by the TS version.
        'default-param-last': ['off'],
        '@typescript-eslint/default-param-last': ['error'],
        // Replaced by the TS version.
        'max-params': ['off'],
        // 7 = SonarQube default (S107).
        '@typescript-eslint/max-params': ['error', { max: 7 }],
        // Replaced by the TS version.
        'no-empty-function': ['off'],
        '@typescript-eslint/no-empty-function': ['error'],
        '@typescript-eslint/no-unnecessary-parameter-property-assignment': ['error'],
      },
    },
  ];
}

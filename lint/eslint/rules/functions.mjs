// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Functions: Declarations, parameters, return values and callbacks: consistent, small and predictable functions.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
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
      name: 'rules/functions',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-func-assign': ['error'],
        'no-obj-calls': ['error'],
        // Off: breaks the prettier/prettier autofix (eslint-plugin-prettier docs).
        'arrow-body-style': ['off'],
        // Off: TypeScript `noImplicitReturns` covers it.
        'consistent-return': ['off'],
        'default-param-last': ['info'],
        // Custom: named functions use `function foo()`, not `const foo = () =>`.
        'func-style': ['info', 'declaration', { allowArrowFunctions: false }],
        // Off: replaced by sonarjs/max-lines-per-function, like SonarQube.
        'max-lines-per-function': ['off'],
        // Off: replaced by sonarjs/no-nested-functions, like SonarQube.
        'max-nested-callbacks': ['off'],
        // 7 = SonarQube default (S107).
        // Warn: a size limit: a justified exception (a data table, a state machine) may pass.
        'max-params': ['warn', { max: 7, countThis: 'never' }],
        'no-caller': ['error'],
        'no-empty-function': ['warn'],
        'no-extra-bind': ['error'],
        // Custom: parameters' properties cannot be mutated either; libraries must expose methods instead.
        'no-param-reassign': ['warn', { props: true }],
        // No assignment in `return`, even in parentheses.
        'no-return-assign': ['warn', 'always'],
        'no-useless-call': ['info'],
        // Off: replaced by sonarjs/no-redundant-jump, like SonarQube.
        'no-useless-return': ['off'],
        // Off: breaks the prettier/prettier autofix (eslint-plugin-prettier docs).
        'prefer-arrow-callback': ['off'],
        'prefer-rest-params': ['info'],
        // ---- SonarJS ----
        // Custom: outside Sonar way; replaces the core max-lines-per-function, like SonarQube.
        // Warn: a size limit: a justified exception (a data table, a state machine) may pass.
        'sonarjs/max-lines-per-function': ['warn', { maximum: 60 }],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/bool-param-default': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/prefer-immediate-return': ['off'],
        // Off: already a TypeScript compiler error.
        'sonarjs/no-extra-arguments': ['off'],
        // Off: duplicate of no-param-reassign.
        'sonarjs/no-parameter-reassignment': ['off'],
        // Off: duplicate of @typescript-eslint/no-confusing-void-expression.
        'sonarjs/no-use-of-empty-return-value': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/arrow-function-convention': ['off'],
        'sonarjs/call-argument-line': ['warn'],
        'sonarjs/inconsistent-function-call': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-function-declaration-in-block': ['off'],
        'sonarjs/no-identical-functions': ['warn'],
        'sonarjs/no-ignored-return': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-inconsistent-returns': ['off'],
        'sonarjs/no-invariant-returns': ['warn'],
        'sonarjs/no-literal-call': ['error'],
        // Sonar way; replaces the core max-nested-callbacks, like SonarQube.
        // Warn: a size limit: a justified exception (a data table, a state machine) may pass.
        'sonarjs/no-nested-functions': ['warn'],
        'sonarjs/no-selector-parameter': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-unused-function-argument': ['off'],
      },
    },
    {
      name: 'rules/functions/typescript',
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
        '@typescript-eslint/default-param-last': ['info'],
        // Replaced by the TS version.
        'max-params': ['off'],
        // 7 = SonarQube default (S107).
        // Warn: a size limit: a justified exception (a data table, a state machine) may pass.
        '@typescript-eslint/max-params': ['warn', { max: 7 }],
        // Replaced by the TS version.
        'no-empty-function': ['off'],
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/no-unnecessary-parameter-property-assignment': ['info'],
      },
    },
  ];
}

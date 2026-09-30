// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Conditions: if / else, ternaries, booleans, comparisons, equality and switch: explicit, simple and exhaustive branches.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Conditions rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function conditionsBlock() {
  return [
    {
      name: 'rules/conditions',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-compare-neg-zero': ['error'],
        'no-cond-assign': ['error'],
        'no-constant-binary-expression': ['error'],
        'no-constant-condition': ['error'],
        'no-dupe-else-if': ['error'],
        'no-duplicate-case': ['error'],
        'no-fallthrough': ['error'],
        'no-self-compare': ['error'],
        'no-template-curly-in-string': ['error'],
        'no-unmodified-loop-condition': ['error'],
        'no-unsafe-negation': ['error'],
        'no-unsafe-optional-chaining': ['error'],
        // Off: replaced by @typescript-eslint/naming-convention.
        camelcase: ['off'],
        // Braces on every block: smaller diffs, the only option safe with Prettier.
        curly: ['error', 'all'],
        // Off: @typescript-eslint/switch-exhaustiveness-check covers it.
        'default-case': ['off'],
        'default-case-last': ['info'],
        eqeqeq: ['error'],
        'logical-assignment-operators': ['error'],
        'no-case-declarations': ['error'],
        'no-else-return': ['error'],
        // Off: eqeqeq already forbids `== null`.
        'no-eq-null': ['off'],
        'no-extra-boolean-cast': ['error'],
        'no-lonely-if': ['error'],
        'no-negated-condition': ['info'],
        'no-nested-ternary': ['warn'],
        'no-ternary': ['off'],
        'no-unneeded-ternary': ['error'],
        yoda: ['error'],
        // ---- SonarJS ----
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-nested-switch': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/strings-comparison': ['off'],
        // Off: duplicate of no-labels.
        'sonarjs/no-case-label-in-switch': ['off'],
        // Off: duplicate of no-fallthrough.
        'sonarjs/no-fallthrough': ['off'],
        // Off: duplicate of @typescript-eslint/no-unnecessary-condition.
        'sonarjs/no-gratuitous-expressions': ['off'],
        // Off: duplicate of no-dupe-else-if and no-duplicate-case.
        'sonarjs/no-identical-conditions': ['off'],
        // Off: duplicate of no-nested-ternary.
        'sonarjs/no-nested-conditional': ['off'],
        // Off: duplicate of @typescript-eslint/no-unnecessary-boolean-literal-compare.
        'sonarjs/no-redundant-boolean': ['off'],
        'sonarjs/comma-or-logical-or-case': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/conditional-indentation': ['off'],
        // Warn: false positives on narrowed union types.
        'sonarjs/different-types-comparison': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/elseif-without-else': ['off'],
        'sonarjs/index-of-compare-to-positive-number': ['warn'],
        'sonarjs/max-switch-cases': ['warn'],
        'sonarjs/no-all-duplicated-branches': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-collapsible-if': ['off'],
        'sonarjs/no-duplicated-branches': ['warn'],
        'sonarjs/no-equals-in-for-termination': ['warn'],
        'sonarjs/no-identical-expressions': ['error'],
        'sonarjs/no-inverted-boolean-check': ['warn'],
        'sonarjs/no-same-line-conditional': ['warn'],
        'sonarjs/no-small-switch': ['warn'],
        'sonarjs/prefer-single-boolean-return': ['warn'],
      },
    },
    {
      name: 'rules/conditions/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        // Off: TypeScript `noFallthroughCasesInSwitch` covers it.
        'no-fallthrough': ['off'],
        'no-unsafe-negation': ['off'],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
        // `while (true)` is allowed.
        '@typescript-eslint/no-unnecessary-condition': ['warn', { allowConstantLoopConditions: true }],
        '@typescript-eslint/no-unsafe-enum-comparison': ['error'],
        // Custom: `str || 'default'` stays allowed to also replace empty strings.
        '@typescript-eslint/prefer-nullish-coalescing': ['info', { ignorePrimitives: { string: true } }],
        '@typescript-eslint/prefer-optional-chain': ['error'],
        // Custom: only numbers must be compared explicitly (`count > 0`).
        '@typescript-eslint/strict-boolean-expressions': [
          'warn',
          { allowNumber: false, allowNullableBoolean: true, allowNullableString: true },
        ],
        // Custom: a `default` case covers the remaining members.
        '@typescript-eslint/switch-exhaustiveness-check': ['error', { considerDefaultExhaustiveForUnions: true }],
      },
    },
  ];
}

// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Conditions: if / else, ternaries, booleans, comparisons, equality and switch: explicit, simple and exhaustive branches.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
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
      name: 'code/conditions',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
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
        'default-case-last': ['error'],
        eqeqeq: ['error'],
        'logical-assignment-operators': ['error'],
        'no-case-declarations': ['error'],
        'no-else-return': ['error'],
        // Off: eqeqeq already forbids `== null`.
        'no-eq-null': ['off'],
        'no-extra-boolean-cast': ['error'],
        'no-lonely-if': ['error'],
        // Off: duplicate of unicorn/no-negated-condition (autofixable).
        'no-negated-condition': ['off'],
        'no-nested-ternary': ['error'],
        'no-ternary': ['off'],
        'no-unneeded-ternary': ['error'],
        yoda: ['error'],
        // ---- SonarJS ----
        'sonarjs/no-nested-switch': ['error'],
        'sonarjs/strings-comparison': ['error'],
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
        'sonarjs/conditional-indentation': ['off'],
        'sonarjs/different-types-comparison': ['error'],
        'sonarjs/elseif-without-else': ['off'],
        'sonarjs/index-of-compare-to-positive-number': ['error'],
        'sonarjs/max-switch-cases': ['error'],
        'sonarjs/no-all-duplicated-branches': ['error'],
        'sonarjs/no-collapsible-if': ['off'],
        'sonarjs/no-duplicated-branches': ['error'],
        'sonarjs/no-equals-in-for-termination': ['error'],
        'sonarjs/no-identical-expressions': ['error'],
        'sonarjs/no-inverted-boolean-check': ['error'],
        'sonarjs/no-same-line-conditional': ['error'],
        'sonarjs/no-small-switch': ['error'],
        'sonarjs/prefer-single-boolean-return': ['error'],
        // ---- Unicorn ----
        // Custom: API function names come from the specification (`shallowEqual`, `meetsContrastLevel`);
        // predicate callbacks are named after their role.
        'unicorn/consistent-boolean-name': ['error', { checkFunctions: 'never', ignore: ['^predicate$', '^guard$'] }],
        'unicorn/consistent-conditional-object-spread': ['error'],
        // Off: duplicate of check-file/filename-naming-convention.
        'unicorn/filename-case': ['off'],
        // Off: duplicate of the core logical-assignment-operators.
        'unicorn/logical-assignment-operators': ['off'],
        'unicorn/no-boolean-sort-comparator': ['error'],
        'unicorn/no-double-comparison': ['error'],
        // Off: duplicate of sonarjs/no-duplicated-branches.
        'unicorn/no-duplicate-if-branches': ['off'],
        'unicorn/no-duplicate-logical-operands': ['error'],
        'unicorn/no-impossible-length-comparison': ['error'],
        'unicorn/no-lonely-if': ['error'],
        'unicorn/no-negated-array-predicate': ['error'],
        'unicorn/no-negated-comparison': ['error'],
        'unicorn/no-negated-condition': ['error'],
        'unicorn/no-negation-in-equality-check': ['error'],
        // Off: duplicate of the core no-nested-ternary; its parentheses fight Prettier.
        'unicorn/no-nested-ternary': ['off'],
        'unicorn/no-redundant-comparison': ['error'],
        'unicorn/no-subtraction-comparison': ['error'],
        'unicorn/no-unnecessary-boolean-comparison': ['error'],
        'unicorn/no-unnecessary-nested-ternary': ['error'],
        'unicorn/no-useless-boolean-cast': ['error'],
        // Off: duplicate of the core no-else-return.
        'unicorn/no-useless-else': ['off'],
        'unicorn/no-useless-logical-operand': ['error'],
        'unicorn/no-useless-switch-case': ['error'],
        'unicorn/prefer-boolean-return': ['error'],
        'unicorn/prefer-combined-guards': ['error'],
        'unicorn/prefer-early-return': ['error'],
        'unicorn/prefer-else-if': ['error'],
        'unicorn/prefer-includes-over-repeated-comparisons': ['error'],
        'unicorn/prefer-logical-operator-over-ternary': ['error'],
        'unicorn/prefer-minimal-ternary': ['error'],
        'unicorn/prefer-negative-index': ['error'],
        'unicorn/prefer-simple-condition-first': ['error'],
        'unicorn/prefer-simplified-conditions': ['error'],
        'unicorn/prefer-switch': ['error'],
        'unicorn/prefer-ternary': ['error'],
        'unicorn/prefer-while-loop-condition': ['error'],
        'unicorn/switch-case-braces': ['error'],
        'unicorn/switch-case-break-position': ['error'],
      },
    },
    {
      name: 'code/conditions/typescript',
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
        '@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: true }],
        '@typescript-eslint/no-unsafe-enum-comparison': ['error'],
        // Custom: `str || 'default'` stays allowed to also replace empty strings.
        '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true } }],
        '@typescript-eslint/prefer-optional-chain': ['error'],
        // Custom: only numbers must be compared explicitly (`count > 0`).
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          { allowNumber: false, allowNullableBoolean: true, allowNullableString: true },
        ],
        // Custom: a `default` case covers the remaining members.
        '@typescript-eslint/switch-exhaustiveness-check': ['error', { considerDefaultExhaustiveForUnions: true }],
      },
    },
  ];
}

// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Core ESLint rules (possible problems, suggestions): every rule is listed, for every JavaScript and TypeScript file.
// Also reports stale `eslint-disable` comments and inline configs, so every exception stays justified.

import globals from 'globals';
import { CODE_FILES } from './files.mjs';

/**
 * Core JavaScript rules, for any project.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function baseBlock() {
  return [
    {
      name: 'base/linter-options',
      linterOptions: {
        reportUnusedDisableDirectives: 'error',
        reportUnusedInlineConfigs: 'error',
      },
    },
    {
      name: 'base/javascript',
      files: CODE_FILES,
      // JS files are Node tooling configs (browser globals are in the TS block).
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.es2027,
        },
      },
      rules: {
        // ---- Possible problems ----
        // Custom: a bare `return;` is allowed; `forEach` callbacks must not return a value.
        'array-callback-return': ['error', { allowImplicit: true, checkForEach: true }],
        'constructor-super': ['error'],
        'for-direction': ['error'],
        'getter-return': ['error'],
        'no-async-promise-executor': ['error'],
        'no-await-in-loop': ['error'],
        'no-class-assign': ['error'],
        'no-compare-neg-zero': ['error'],
        'no-cond-assign': ['error'],
        'no-const-assign': ['error'],
        'no-constant-binary-expression': ['error'],
        'no-constant-condition': ['error'],
        'no-constructor-return': ['error'],
        'no-control-regex': ['error'],
        'no-debugger': ['error'],
        'no-dupe-args': ['error'],
        'no-dupe-class-members': ['error'],
        'no-dupe-else-if': ['error'],
        'no-dupe-keys': ['error'],
        'no-duplicate-case': ['error'],
        // Off: `import type` lines are kept separate (consistent-type-imports).
        'no-duplicate-imports': ['off'],
        'no-empty-character-class': ['error'],
        'no-empty-pattern': ['error'],
        'no-ex-assign': ['error'],
        'no-fallthrough': ['error'],
        'no-func-assign': ['error'],
        'no-import-assign': ['error'],
        'no-inner-declarations': ['error'],
        'no-invalid-regexp': ['error'],
        'no-irregular-whitespace': ['error'],
        'no-loss-of-precision': ['error'],
        'no-misleading-character-class': ['error'],
        'no-new-native-nonconstructor': ['error'],
        'no-obj-calls': ['error'],
        'no-promise-executor-return': ['error'],
        'no-prototype-builtins': ['error'],
        'no-self-assign': ['error'],
        'no-self-compare': ['error'],
        'no-setter-return': ['error'],
        'no-sparse-arrays': ['error'],
        'no-template-curly-in-string': ['error'],
        'no-this-before-super': ['error'],
        'no-unassigned-vars': ['error'],
        'no-undef': ['error'],
        'no-unexpected-multiline': ['error'],
        'no-unmodified-loop-condition': ['error'],
        'no-unreachable': ['error'],
        'no-unreachable-loop': ['error'],
        'no-unsafe-finally': ['error'],
        'no-unsafe-negation': ['error'],
        'no-unsafe-optional-chaining': ['error'],
        'no-unused-private-class-members': ['error'],
        'no-unused-vars': ['error'],
        'no-use-before-define': ['error'],
        'no-useless-assignment': ['error'],
        'no-useless-backreference': ['error'],
        // Off: false positives with async/await (removed from eslint:recommended).
        'require-atomic-updates': ['off'],
        'use-isnan': ['error'],
        'valid-typeof': ['error'],

        // ---- Suggestions ----
        'accessor-pairs': ['error'],
        // Off: breaks the prettier/prettier autofix (eslint-plugin-prettier docs).
        'arrow-body-style': ['off'],
        'block-scoped-var': ['error'],
        // Off: replaced by @typescript-eslint/naming-convention.
        camelcase: ['off'],
        'capitalized-comments': ['off'],
        'class-methods-use-this': ['error'],
        // Off: replaced by sonarjs/cognitive-complexity (15), like SonarQube.
        complexity: ['off'],
        // Off: TypeScript `noImplicitReturns` covers it.
        'consistent-return': ['off'],
        'consistent-this': ['error'],
        // Braces on every block: smaller diffs, the only option safe with Prettier.
        curly: ['error', 'all'],
        // Off: @typescript-eslint/switch-exhaustiveness-check covers it.
        'default-case': ['off'],
        'default-case-last': ['error'],
        'default-param-last': ['error'],
        'dot-notation': ['error'],
        eqeqeq: ['error'],
        'func-name-matching': ['error'],
        // Off: callbacks are arrow functions by convention.
        'func-names': ['off'],
        // Custom: named functions use `function foo()`, not `const foo = () =>`.
        'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
        'grouped-accessor-pairs': ['error'],
        'guard-for-in': ['error'],
        'id-denylist': ['off'],
        'id-length': ['off'],
        'id-match': ['off'],
        // Off: non-standard, forbids `let x: T;` assigned later.
        'init-declarations': ['off'],
        'logical-assignment-operators': ['error'],
        'max-classes-per-file': ['error'],
        // Off: replaced by sonarjs/nested-control-flow (3), like SonarQube.
        'max-depth': ['off'],
        // Off: replaced by sonarjs/max-lines (1000), like SonarQube.
        'max-lines': ['off'],
        // Off: replaced by sonarjs/max-lines-per-function (200), like SonarQube.
        'max-lines-per-function': ['off'],
        // Off: replaced by sonarjs/no-nested-functions (5), like SonarQube.
        'max-nested-callbacks': ['off'],
        // 7 = SonarQube default (S107).
        'max-params': ['error', { max: 7, countThis: 'never' }],
        // Off: no SonarQube equivalent.
        'max-statements': ['off'],
        'new-cap': ['error'],
        'no-alert': ['error'],
        'no-array-constructor': ['error'],
        // Off: colour parsing and formatting need bitwise math.
        'no-bitwise': ['off'],
        'no-caller': ['error'],
        'no-case-declarations': ['error'],
        'no-console': ['error'],
        'no-continue': ['error'],
        'no-delete-var': ['error'],
        'no-div-regex': ['error'],
        'no-else-return': ['error'],
        'no-empty': ['error'],
        'no-empty-function': ['error'],
        'no-empty-static-block': ['error'],
        // Off: eqeqeq already forbids `== null`.
        'no-eq-null': ['off'],
        'no-eval': ['error'],
        'no-extend-native': ['error'],
        'no-extra-bind': ['error'],
        'no-extra-boolean-cast': ['error'],
        // Off: labels are forbidden by no-labels.
        'no-extra-label': ['off'],
        'no-global-assign': ['error'],
        'no-implicit-coercion': ['error'],
        'no-implicit-globals': ['error'],
        'no-implied-eval': ['error'],
        // Off: non-standard, end-of-line comments are fine.
        'no-inline-comments': ['off'],
        'no-invalid-this': ['error'],
        'no-iterator': ['error'],
        // Off: labels are forbidden by no-labels.
        'no-label-var': ['off'],
        'no-labels': ['error'],
        'no-lone-blocks': ['error'],
        'no-lonely-if': ['error'],
        'no-loop-func': ['error'],
        // Replaced by the TS version.
        'no-magic-numbers': ['off'],
        // `a = b = 0` is allowed, `const a = (b = 0)` is not.
        'no-multi-assign': ['error', { ignoreNonDeclaration: true }],
        'no-multi-str': ['error'],
        // Off: duplicate of unicorn/no-negated-condition (autofixable).
        'no-negated-condition': ['off'],
        'no-nested-ternary': ['error'],
        'no-new': ['error'],
        'no-new-func': ['error'],
        'no-new-wrappers': ['error'],
        'no-nonoctal-decimal-escape': ['error'],
        'no-object-constructor': ['error'],
        'no-octal': ['error'],
        'no-octal-escape': ['error'],
        // Custom: parameters' properties cannot be mutated either; libraries must expose methods instead.
        'no-param-reassign': ['error', { props: true }],
        // `i++` only in `for` loops, `+= 1` elsewhere.
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-proto': ['error'],
        'no-redeclare': ['error'],
        'no-regex-spaces': ['error'],
        'no-restricted-exports': ['off'],
        'no-restricted-globals': ['off'],
        // Custom: a theme's internal/ folder is private to it (src/internal/ is shared by every theme).
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                regex: String.raw`^\.\./[^./]+/internal/`,
                message: "Another theme's internal/ helpers are private to it: move the helper to src/internal/.",
              },
            ],
          },
        ],
        'no-restricted-properties': ['off'],
        'no-restricted-syntax': ['off'],
        // No assignment in `return`, even in parentheses.
        'no-return-assign': ['error', 'always'],
        'no-script-url': ['error'],
        'no-sequences': ['error'],
        'no-shadow': ['error'],
        'no-shadow-restricted-names': ['error'],
        'no-ternary': ['off'],
        'no-throw-literal': ['error'],
        'no-undef-init': ['off'],
        'no-undefined': ['off'],
        // Off: `_` prefix is allowed (private members, unused params).
        'no-underscore-dangle': ['off'],
        'no-unneeded-ternary': ['error'],
        'no-unused-expressions': ['error'],
        'no-unused-labels': ['error'],
        'no-useless-call': ['error'],
        'no-useless-catch': ['error'],
        'no-useless-computed-key': ['error'],
        'no-useless-concat': ['error'],
        'no-useless-constructor': ['error'],
        'no-useless-escape': ['error'],
        'no-useless-rename': ['error'],
        // Off: covered by sonarjs/no-redundant-jump, which also reports useless `continue`.
        'no-useless-return': ['off'],
        'no-var': ['error'],
        // `void promise;` marks a promise as intentionally not awaited.
        'no-void': ['error', { allowAsStatement: true }],
        'no-warning-comments': ['error'],
        'no-with': ['error'],
        'object-shorthand': ['error'],
        // One declaration per statement (cleaner diffs).
        'one-var': ['error', 'never'],
        'operator-assignment': ['error'],
        // Off: breaks the prettier/prettier autofix (eslint-plugin-prettier docs).
        'prefer-arrow-callback': ['off'],
        // Destructuring is reported only when every variable could be const.
        'prefer-const': ['error', { destructuring: 'all' }],
        'prefer-destructuring': ['error'],
        'prefer-exponentiation-operator': ['error'],
        // Off: duplicate of regexp/prefer-named-capture-group.
        'prefer-named-capture-group': ['off'],
        'prefer-numeric-literals': ['error'],
        'prefer-object-has-own': ['error'],
        'prefer-object-spread': ['error'],
        'prefer-promise-reject-errors': ['error'],
        'prefer-regex-literals': ['off'],
        'prefer-rest-params': ['error'],
        'prefer-spread': ['error'],
        'prefer-template': ['error'],
        'preserve-caught-error': ['error'],
        radix: ['error'],
        'require-await': ['error'],
        // Off: regexp/require-unicode-sets-regexp requires the stricter `v` flag.
        'require-unicode-regexp': ['off'],
        'require-yield': ['error'],
        'sort-imports': ['off'],
        'sort-keys': ['off'],
        'sort-vars': ['off'],
        strict: ['error'],
        'symbol-description': ['error'],
        // Off: `var` is forbidden (no-var).
        'vars-on-top': ['off'],
        yoda: ['error'],

        // ---- Layout & formatting ----
        // Off: formatting is Prettier's job.
        'unicode-bom': ['off'],
      },
    },
  ];
}

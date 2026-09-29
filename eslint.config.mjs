// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// TypeScript utility library (one exported function per file): sources, specs, benchmarks and tool configs.
// Plugin configs with many rules live in eslint/ (JSDoc, regexp, unicorn, local rules).

import { defineConfig, globalIgnores } from 'eslint/config';
import tsEslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import importX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import checkFile from 'eslint-plugin-check-file';
import vitest from '@vitest/eslint-plugin';
import globals from 'globals';
import jsdocConfig from './eslint/jsdoc.config.mjs';
import localConfig from './eslint/local.config.mjs';
import regexpConfig from './eslint/regexp.config.mjs';
import unicornConfig from './eslint/unicorn.config.mjs';

// @typescript-eslint/naming-convention selectors.
const namingConventionSelectors = [
  // camelCase; `_` prefix = intentionally unused.
  { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
  { selector: 'import', format: ['camelCase', 'PascalCase'] },
  // UPPER_CASE: module-level constants.
  { selector: 'variable', format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
  // Names come from external APIs.
  { selector: 'variable', modifiers: ['destructured'], format: null },
  { selector: 'function', format: ['camelCase'] },
  { selector: 'typeLike', format: ['PascalCase'] },
  // No `I` prefix (TypeScript convention).
  { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } },
  { selector: 'enumMember', format: ['PascalCase'] },
  // Quoted keys: HTTP headers, external APIs.
  {
    selector: [
      'classProperty',
      'objectLiteralProperty',
      'typeProperty',
      'classMethod',
      'objectLiteralMethod',
      'typeMethod',
      'accessor',
      'enumMember',
    ],
    modifiers: ['requiresQuotes'],
    format: null,
  },
];

export default defineConfig([
  // Stale `eslint-disable` and inline configs are errors, so every exception stays justified.
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error',
    },
  },
  // Build outputs, caches and dependencies (same folders as .gitignore).
  globalIgnores(['**/node_modules/', 'dist/', 'coverage/']),
  // Formatting is Prettier's job; its recommended config turns off the conflicting rules.
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts'],
    extends: [prettier],
    rules: {
      'prettier/prettier': ['error'],
    },
  },
  // SonarJS: recommended preset (same rules as SonarQube), plus the relevant rules it leaves off;
  // duplicates of explicit rules are off.
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts'],
    extends: [sonarjs.configs.recommended],
    rules: {
      // Custom: size limits, off in the preset; one function per file keeps files and functions short.
      'sonarjs/max-lines': ['error', { maximum: 200 }],
      'sonarjs/max-lines-per-function': ['error', { maximum: 60 }],
      'sonarjs/nested-control-flow': ['error'],
      // Custom: rules off in the preset, enabled for a strict library.
      'sonarjs/bool-param-default': ['error'],
      'sonarjs/class-prototype': ['error'],
      'sonarjs/destructuring-assignment-syntax': ['error'],
      'sonarjs/expression-complexity': ['error'],
      'sonarjs/max-union-size': ['error'],
      'sonarjs/no-built-in-override': ['error'],
      'sonarjs/no-commented-code': ['error'],
      'sonarjs/no-duplicate-string': ['error'],
      'sonarjs/no-incorrect-string-concat': ['error'],
      'sonarjs/no-nested-incdec': ['error'],
      'sonarjs/no-nested-switch': ['error'],
      'sonarjs/no-return-type-any': ['error'],
      'sonarjs/no-sonar-comments': ['error'],
      'sonarjs/non-number-in-arithmetic-expression': ['error'],
      'sonarjs/operation-returning-nan': ['error'],
      'sonarjs/prefer-immediate-return': ['error'],
      'sonarjs/prefer-object-literal': ['error'],
      'sonarjs/strings-comparison': ['error'],
      'sonarjs/too-many-break-or-continue-in-loop': ['error'],
      'sonarjs/useless-string-operation': ['error'],
      'sonarjs/values-not-convertible-to-numbers': ['error'],
      // Off: duplicate of array-callback-return.
      'sonarjs/array-callback-without-return': ['off'],
      // Off: duplicate of vitest/no-standalone-expect.
      'sonarjs/assertions-in-test-cases': ['off'],
      // Off: duplicate of vitest/expect-expect.
      'sonarjs/assertions-in-tests': ['off'],
      // Off: duplicate of block-scoped-var.
      'sonarjs/block-scoped-var': ['off'],
      // Off: duplicate of @typescript-eslint/naming-convention.
      'sonarjs/class-name': ['off'],
      // Off: duplicate of no-eval, no-new-func and no-implied-eval.
      'sonarjs/code-eval': ['off'],
      // Off: duplicate of no-new.
      'sonarjs/constructor-for-side-effects': ['off'],
      // Off: duplicate of @typescript-eslint/no-deprecated.
      'sonarjs/deprecation': ['off'],
      // Off: duplicate of no-warning-comments.
      'sonarjs/fixme-tag': ['off'],
      // Off: duplicate of no-loop-func.
      'sonarjs/function-inside-loop': ['off'],
      // Off: duplicate of require-yield.
      'sonarjs/generator-without-yield': ['off'],
      // Off: duplicate of vitest/prefer-hooks-on-top.
      'sonarjs/hooks-before-test-cases': ['off'],
      // Off: duplicate of no-labels.
      'sonarjs/label-position': ['off'],
      // Off: duplicate of @typescript-eslint/require-array-sort-compare.
      'sonarjs/no-alphabetical-sort': ['off'],
      // Off: duplicate of @typescript-eslint/no-array-delete.
      'sonarjs/no-array-delete': ['off'],
      // Off: duplicate of no-labels.
      'sonarjs/no-case-label-in-switch': ['off'],
      // Off: duplicate of no-control-regex.
      'sonarjs/no-control-regex': ['off'],
      // Off: duplicate of no-useless-assignment.
      'sonarjs/no-dead-store': ['off'],
      // Off: duplicate of no-delete-var.
      'sonarjs/no-delete-var': ['off'],
      // Off: duplicate of @typescript-eslint/no-duplicate-type-constituents.
      'sonarjs/no-duplicate-in-composite': ['off'],
      // Off: duplicate of vitest/no-identical-title.
      'sonarjs/no-duplicate-test-title': ['off'],
      // Off: duplicate of no-empty-character-class.
      'sonarjs/no-empty-character-class': ['off'],
      // Off: duplicate of vitest/valid-title.
      'sonarjs/no-empty-test-title': ['off'],
      // Off: duplicate of vitest/no-focused-tests.
      'sonarjs/no-exclusive-tests': ['off'],
      // Off: already a TypeScript compiler error.
      'sonarjs/no-extra-arguments': ['off'],
      // Off: duplicate of no-fallthrough.
      'sonarjs/no-fallthrough': ['off'],
      // Off: duplicate of no-shadow-restricted-names.
      'sonarjs/no-globals-shadowing': ['off'],
      // Off: duplicate of @typescript-eslint/no-unnecessary-condition.
      'sonarjs/no-gratuitous-expressions': ['off'],
      // Off: duplicate of no-dupe-else-if and no-duplicate-case.
      'sonarjs/no-identical-conditions': ['off'],
      // Off: duplicate of no-undef (and a TypeScript compiler error).
      'sonarjs/no-implicit-global': ['off'],
      // Off: duplicate of no-invalid-regexp.
      'sonarjs/no-invalid-regexp': ['off'],
      // Off: duplicate of no-labels.
      'sonarjs/no-labels': ['off'],
      // Off: duplicate of no-misleading-character-class.
      'sonarjs/no-misleading-character-class': ['off'],
      // Off: duplicate of no-nested-ternary.
      'sonarjs/no-nested-conditional': ['off'],
      // Off: duplicate of no-param-reassign.
      'sonarjs/no-parameter-reassignment': ['off'],
      // Off: duplicate of no-new-wrappers and @typescript-eslint/no-wrapper-object-types.
      'sonarjs/no-primitive-wrappers': ['off'],
      // Off: duplicate of @typescript-eslint/no-unnecessary-boolean-literal-compare.
      'sonarjs/no-redundant-boolean': ['off'],
      // Off: duplicate of no-regex-spaces.
      'sonarjs/no-regex-spaces': ['off'],
      // Off: duplicate of vitest/no-disabled-tests.
      'sonarjs/no-skipped-tests': ['off'],
      // Off: duplicate of curly.
      'sonarjs/no-unenclosed-multiline-block': ['off'],
      // Off: duplicate of no-new (which reports any `new` used for side effects).
      'sonarjs/no-unthrown-error': ['off'],
      // Off: duplicate of @typescript-eslint/no-unused-vars (which honours the `_` prefix).
      'sonarjs/no-unused-vars': ['off'],
      // Off: duplicate of @typescript-eslint/no-confusing-void-expression.
      'sonarjs/no-use-of-empty-return-value': ['off'],
      // Off: duplicate of no-useless-catch.
      'sonarjs/no-useless-catch': ['off'],
      // Off: duplicate of @typescript-eslint/prefer-regexp-exec.
      'sonarjs/prefer-regexp-exec': ['off'],
      // Off: duplicate of no-warning-comments.
      'sonarjs/todo-tag': ['off'],
      // Off: duplicate of @typescript-eslint/no-unused-vars.
      'sonarjs/unused-import': ['off'],
      // Off: duplicate of no-const-assign.
      'sonarjs/updated-const-var': ['off'],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts'],
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
  {
    files: ['**/*.ts', '**/*.mts'],
    languageOptions: {
      // TS files run in the browser (and in Node: no DOM-only API in the sources).
      globals: {
        ...globals.browser,
        ...globals.es2027,
      },
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
    },
    rules: {
      // ---- Core rules already checked by the TypeScript compiler (typescript-eslint eslintRecommended) ----
      'constructor-super': ['off'],
      'getter-return': ['off'],
      'no-class-assign': ['off'],
      'no-const-assign': ['off'],
      'no-dupe-args': ['off'],
      'no-dupe-keys': ['off'],
      // Off: TypeScript `noFallthroughCasesInSwitch` covers it.
      'no-fallthrough': ['off'],
      'no-func-assign': ['off'],
      'no-import-assign': ['off'],
      'no-new-native-nonconstructor': ['off'],
      'no-obj-calls': ['off'],
      'no-setter-return': ['off'],
      'no-this-before-super': ['off'],
      'no-undef': ['off'],
      'no-unsafe-negation': ['off'],
      'no-with': ['off'],
      // Kept: TypeScript only greys out dead code, `allowUnreachableCode: false` would also block the dev loop.
      'no-unreachable': ['error'],

      // ---- Core rules useless in ES modules (always strict) ----
      'no-delete-var': ['off'],
      'no-implicit-globals': ['off'],
      'no-octal': ['off'],
      'no-octal-escape': ['off'],

      // ---- TypeScript rules ----
      '@typescript-eslint/adjacent-overload-signatures': ['error'],
      '@typescript-eslint/array-type': ['error'],
      '@typescript-eslint/await-thenable': ['error'],
      '@typescript-eslint/ban-ts-comment': ['error'],
      '@typescript-eslint/ban-tslint-comment': ['error'],
      '@typescript-eslint/class-literal-property-style': ['error'],
      // Replaced by the TS version.
      'class-methods-use-this': ['off'],
      '@typescript-eslint/class-methods-use-this': ['error'],
      '@typescript-eslint/consistent-generic-constructors': ['error'],
      '@typescript-eslint/consistent-indexed-object-style': ['error'],
      // Off: TypeScript `noImplicitReturns` covers it.
      '@typescript-eslint/consistent-return': ['off'],
      '@typescript-eslint/consistent-type-assertions': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['error'],
      '@typescript-eslint/consistent-type-exports': ['error'],
      '@typescript-eslint/consistent-type-imports': ['error'],
      // Replaced by the TS version.
      'default-param-last': ['off'],
      '@typescript-eslint/default-param-last': ['error'],
      // Replaced by the TS version.
      'dot-notation': ['off'],
      '@typescript-eslint/dot-notation': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/explicit-member-accessibility': ['error'],
      // Off: duplicate of explicit-function-return-type.
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      // Off: see core rule. If enabled, write `['error', 'always']` (ESLint 10 passes no default mode).
      '@typescript-eslint/init-declarations': ['off'],
      // Replaced by the TS version.
      'max-params': ['off'],
      // 7 = SonarQube default (S107).
      '@typescript-eslint/max-params': ['error', { max: 7 }],
      '@typescript-eslint/member-ordering': ['error'],
      // Custom: `foo(): void` style; pass members as callbacks through `() => api.foo()`.
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      // Custom: the most specific selector wins (see namingConventionSelectors).
      '@typescript-eslint/naming-convention': ['error', ...namingConventionSelectors],
      // Replaced by the TS version.
      'no-array-constructor': ['off'],
      '@typescript-eslint/no-array-constructor': ['error'],
      '@typescript-eslint/no-array-delete': ['error'],
      '@typescript-eslint/no-base-to-string': ['error'],
      // Off: no-non-null-assertion forbids every `!`.
      '@typescript-eslint/no-confusing-non-null-assertion': ['off'],
      '@typescript-eslint/no-confusing-void-expression': ['error'],
      '@typescript-eslint/no-deprecated': ['error'],
      // Replaced by the TS version.
      'no-dupe-class-members': ['off'],
      '@typescript-eslint/no-dupe-class-members': ['error'],
      '@typescript-eslint/no-duplicate-enum-values': ['error'],
      '@typescript-eslint/no-duplicate-type-constituents': ['error'],
      '@typescript-eslint/no-dynamic-delete': ['error'],
      // Replaced by the TS version.
      'no-empty-function': ['off'],
      '@typescript-eslint/no-empty-function': ['error'],
      // Deprecated: replaced by no-empty-object-type.
      '@typescript-eslint/no-empty-interface': ['off'],
      '@typescript-eslint/no-empty-object-type': ['error'],
      '@typescript-eslint/no-explicit-any': ['error'],
      // Off: no-non-null-assertion forbids every `!`.
      '@typescript-eslint/no-extra-non-null-assertion': ['off'],
      '@typescript-eslint/no-extraneous-class': ['error'],
      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/no-for-in-array': ['error'],
      '@typescript-eslint/no-generated-empty-object-type': ['error'],
      // Replaced by the TS version.
      'no-implied-eval': ['off'],
      '@typescript-eslint/no-implied-eval': ['error'],
      '@typescript-eslint/no-import-type-side-effects': ['error'],
      '@typescript-eslint/no-inferrable-types': ['error'],
      // Off: the core rule misreads `this:` parameters; the TS version is off by choice.
      'no-invalid-this': ['off'],
      '@typescript-eslint/no-invalid-this': ['off'],
      '@typescript-eslint/no-invalid-void-type': ['error'],
      // Deprecated: the core rule supports TypeScript.
      '@typescript-eslint/no-loop-func': ['off'],
      // Deprecated: the core rule supports TypeScript.
      '@typescript-eslint/no-loss-of-precision': ['off'],
      // Custom: named constants for every number but the obvious ones (specs and benchmarks excepted, see below).
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [-1, 0, 1, 2],
          ignoreDefaultValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
        },
      ],
      // Off: covered by sonarjs/void-use, which only allows `void` on promises.
      '@typescript-eslint/no-meaningless-void-operator': ['off'],
      '@typescript-eslint/no-misused-new': ['error'],
      '@typescript-eslint/no-misused-promises': ['error'],
      '@typescript-eslint/no-misused-spread': ['error'],
      '@typescript-eslint/no-mixed-enums': ['error'],
      '@typescript-eslint/no-namespace': ['error'],
      // Off: no-non-null-assertion forbids every `!`.
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['off'],
      '@typescript-eslint/no-non-null-asserted-optional-chain': ['off'],
      '@typescript-eslint/no-non-null-assertion': ['error'],
      // Replaced by the TS version (a type and a value may not share a name either).
      'no-redeclare': ['off'],
      '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: false }],
      '@typescript-eslint/no-redundant-type-constituents': ['error'],
      '@typescript-eslint/no-require-imports': ['error'],
      // Deprecated: use the core no-restricted-imports if needed.
      '@typescript-eslint/no-restricted-imports': ['off'],
      '@typescript-eslint/no-restricted-types': ['error'],
      // Replaced by the TS version.
      'no-shadow': ['off'],
      '@typescript-eslint/no-shadow': ['error'],
      // Off: no-this-alias forbids aliasing `this` at all.
      'consistent-this': ['off'],
      '@typescript-eslint/no-this-alias': ['error'],
      // Deprecated: replaced by consistent-type-definitions.
      '@typescript-eslint/no-type-alias': ['off'],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
      // `while (true)` is allowed.
      '@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: true }],
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': ['error'],
      '@typescript-eslint/no-unnecessary-qualifier': ['error'],
      '@typescript-eslint/no-unnecessary-template-expression': ['error'],
      '@typescript-eslint/no-unnecessary-type-arguments': ['error'],
      '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
      '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
      '@typescript-eslint/no-unnecessary-type-conversion': ['error'],
      '@typescript-eslint/no-unnecessary-type-parameters': ['error'],
      '@typescript-eslint/no-unsafe-argument': ['error'],
      '@typescript-eslint/no-unsafe-assignment': ['error'],
      '@typescript-eslint/no-unsafe-call': ['error'],
      '@typescript-eslint/no-unsafe-declaration-merging': ['error'],
      '@typescript-eslint/no-unsafe-enum-assignment': ['error'],
      '@typescript-eslint/no-unsafe-enum-comparison': ['error'],
      '@typescript-eslint/no-unsafe-function-type': ['error'],
      '@typescript-eslint/no-unsafe-member-access': ['error'],
      '@typescript-eslint/no-unsafe-return': ['error'],
      '@typescript-eslint/no-unsafe-type-assertion': ['error'],
      '@typescript-eslint/no-unsafe-unary-minus': ['error'],
      // Replaced by the TS version.
      'no-unused-expressions': ['off'],
      '@typescript-eslint/no-unused-expressions': ['error'],
      // Replaced by the TS version.
      'no-unused-private-class-members': ['off'],
      '@typescript-eslint/no-unused-private-class-members': ['error'],
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
      // Replaced by the TS version.
      'no-useless-constructor': ['off'],
      '@typescript-eslint/no-useless-constructor': ['error'],
      '@typescript-eslint/no-useless-default-assignment': ['error'],
      '@typescript-eslint/no-useless-empty-export': ['error'],
      // Deprecated: replaced by no-require-imports.
      '@typescript-eslint/no-var-requires': ['off'],
      '@typescript-eslint/no-wrapper-object-types': ['error'],
      // Off: asks for `x!`, forbidden by no-non-null-assertion.
      '@typescript-eslint/non-nullable-type-assertion-style': ['off'],
      // Replaced by the TS version.
      'no-throw-literal': ['off'],
      '@typescript-eslint/only-throw-error': ['error'],
      '@typescript-eslint/parameter-properties': ['error'],
      '@typescript-eslint/prefer-as-const': ['error'],
      // Replaced by the TS version.
      'prefer-destructuring': ['off'],
      '@typescript-eslint/prefer-destructuring': ['error'],
      '@typescript-eslint/prefer-enum-initializers': ['error'],
      '@typescript-eslint/prefer-find': ['error'],
      '@typescript-eslint/prefer-for-of': ['error'],
      '@typescript-eslint/prefer-function-type': ['error'],
      '@typescript-eslint/prefer-includes': ['error'],
      '@typescript-eslint/prefer-literal-enum-member': ['error'],
      '@typescript-eslint/prefer-namespace-keyword': ['error'],
      // Custom: `str || 'default'` stays allowed to also replace empty strings.
      '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true } }],
      '@typescript-eslint/prefer-optional-chain': ['error'],
      // Replaced by the TS version.
      'prefer-promise-reject-errors': ['off'],
      '@typescript-eslint/prefer-promise-reject-errors': ['error'],
      '@typescript-eslint/prefer-readonly': ['error'],
      // Custom: a utility never mutates its arguments; functions and DOM/runtime types (live objects) are exempt.
      '@typescript-eslint/prefer-readonly-parameter-types': [
        'error',
        {
          ignoreInferredTypes: true,
          treatMethodsAsReadonly: true,
          allow: [
            {
              from: 'lib',
              name: [
                'AbortSignal',
                'AddEventListenerOptions',
                'ArrayLike',
                'Element',
                'EventTarget',
                'HTMLElement',
                'IntersectionObserverEntry',
                'IntersectionObserverInit',
                'Iterable',
                'PointerEvent',
                'PromiseLike',
                'RegExp',
                'ResizeObserverEntry',
                'ResizeObserverOptions',
                'Storage',
                'SVGElement',
                'SVGGraphicsElement',
              ],
            },
          ],
        },
      ],
      '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
      '@typescript-eslint/prefer-regexp-exec': ['error'],
      '@typescript-eslint/prefer-return-this-type': ['error'],
      '@typescript-eslint/prefer-string-starts-ends-with': ['error'],
      // Deprecated: replaced by ban-ts-comment.
      '@typescript-eslint/prefer-ts-expect-error': ['off'],
      '@typescript-eslint/promise-function-async': ['error'],
      '@typescript-eslint/related-getter-setter-pairs': ['error'],
      '@typescript-eslint/require-array-sort-compare': ['error'],
      // Replaced by the TS version.
      'require-await': ['off'],
      '@typescript-eslint/require-await': ['error'],
      '@typescript-eslint/restrict-plus-operands': ['error'],
      '@typescript-eslint/restrict-template-expressions': ['error'],
      '@typescript-eslint/return-await': ['error'],
      // Deprecated: replaced by eslint-plugin-perfectionist.
      '@typescript-eslint/sort-type-constituents': ['off'],
      // Custom: only numbers must be compared explicitly (`count > 0`).
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        { allowNumber: false, allowNullableBoolean: true, allowNullableString: true },
      ],
      '@typescript-eslint/strict-void-return': ['error'],
      // Custom: a `default` case covers the remaining members.
      '@typescript-eslint/switch-exhaustiveness-check': ['error', { considerDefaultExhaustiveForUnions: true }],
      '@typescript-eslint/triple-slash-reference': ['error'],
      // Deprecated: no replacement.
      '@typescript-eslint/typedef': ['off'],
      '@typescript-eslint/unbound-method': ['error'],
      '@typescript-eslint/unified-signatures': ['error'],
      '@typescript-eslint/use-unknown-in-catch-callback-variable': ['error'],
    },
  },
  // ESLint directive comments: a rule is disabled one line at a time, with a reason.
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts'],
    plugins: {
      '@eslint-community/eslint-comments': eslintComments,
    },
    rules: {
      '@eslint-community/eslint-comments/disable-enable-pair': ['error'],
      '@eslint-community/eslint-comments/no-aggregating-enable': ['error'],
      '@eslint-community/eslint-comments/no-duplicate-disable': ['error'],
      // Off: no rule is locked yet; list here the rules that must never be disabled. TODO
      '@eslint-community/eslint-comments/no-restricted-disable': ['off'],
      '@eslint-community/eslint-comments/no-unlimited-disable': ['error'],
      // Deprecated: replaced by linterOptions.reportUnusedDisableDirectives.
      '@eslint-community/eslint-comments/no-unused-disable': ['off'],
      '@eslint-community/eslint-comments/no-unused-enable': ['error'],
      // Custom: only `eslint-disable-next-line`; no file-wide disable, no inline config, no `/* global */`.
      '@eslint-community/eslint-comments/no-use': ['error', { allow: ['eslint-disable-next-line'] }],
      // `// eslint-disable-next-line rule -- reason`.
      '@eslint-community/eslint-comments/require-description': ['error'],
    },
  },
  // Imports: module boundaries, dependencies and cycles.
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts'],
    plugins: {
      'import-x': importX,
    },
    settings: {
      'import-x/extensions': ['.ts', '.mts', '.js', '.mjs'],
      'import-x/parsers': { '@typescript-eslint/parser': ['.ts', '.mts'] },
      'import-x/resolver-next': [
        // The root tsconfig references every project.
        createTypeScriptImportResolver({ project: `${import.meta.dirname}/tsconfig.json` }),
      ],
    },
    rules: {
      // `import type { A }` on its own line, like consistent-type-imports.
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      // Off: TypeScript checks it.
      'import-x/default': ['off'],
      // Off: webpack only (builds use esbuild).
      'import-x/dynamic-import-chunkname': ['off'],
      'import-x/export': ['error'],
      // Off: non-standard.
      'import-x/exports-last': ['off'],
      // Custom: relative imports name the file with its extension (`./clamp.ts`), valid ESM everywhere.
      'import-x/extensions': ['error', 'always', { ignorePackages: true, checkTypeImports: true }],
      'import-x/first': ['error'],
      // Off: non-standard.
      'import-x/group-exports': ['off'],
      // Deprecated: replaced by import-x/first.
      'import-x/imports-first': ['off'],
      // Custom: a single-function file with many imports should be split.
      'import-x/max-dependencies': ['error', { max: 10 }],
      // Off: TypeScript checks it.
      'import-x/named': ['off'],
      // Off: TypeScript checks it.
      'import-x/namespace': ['off'],
      'import-x/newline-after-import': ['error'],
      'import-x/no-absolute-path': ['error'],
      'import-x/no-amd': ['error'],
      'import-x/no-anonymous-default-export': ['error'],
      'import-x/no-commonjs': ['error'],
      'import-x/no-cycle': ['error'],
      // Named exports only; tool configs are the exception.
      'import-x/no-default-export': ['error'],
      // Off: duplicate of @typescript-eslint/no-deprecated.
      'import-x/no-deprecated': ['off'],
      'import-x/no-duplicates': ['error'],
      'import-x/no-dynamic-require': ['error'],
      'import-x/no-empty-named-blocks': ['error'],
      // Custom: devDependencies only in specs, benchmarks and tool configs.
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.spec.ts', '**/testing/**', '**/*.bench.ts', '**/*.mjs', '**/*.mts'],
          optionalDependencies: false,
          peerDependencies: true,
          bundledDependencies: false,
        },
      ],
      'import-x/no-import-module-exports': ['error'],
      // Off: would flag every nested relative path (`./components/button/button.component`).
      'import-x/no-internal-modules': ['off'],
      'import-x/no-mutable-exports': ['error'],
      // Off: default exports are forbidden (no-default-export).
      'import-x/no-named-as-default': ['off'],
      // Off: TypeScript checks it.
      'import-x/no-named-as-default-member': ['off'],
      'import-x/no-named-default': ['error'],
      // Off: contradicts no-default-export.
      'import-x/no-named-export': ['off'],
      'import-x/no-namespace': ['error'],
      // Browser code; tool configs are the exception.
      'import-x/no-nodejs-modules': ['error'],
      'import-x/no-relative-packages': ['error'],
      // Off: modules import shared code from parent folders.
      'import-x/no-relative-parent-imports': ['off'],
      // Off: default exports are forbidden (no-default-export).
      'import-x/no-rename-default': ['off'],
      // Off: a single package, no module boundary to enforce.
      'import-x/no-restricted-paths': ['off'],
      'import-x/no-self-import': ['error'],
      'import-x/no-unassigned-import': ['error'],
      // Off: TypeScript checks it.
      'import-x/no-unresolved': ['off'],
      // Off: a no-op on ESLint 10 (no FileEnumerator API); knip reports unused files and exports instead.
      'import-x/no-unused-modules': ['off'],
      'import-x/no-useless-path-segments': ['error'],
      'import-x/no-webpack-loader-syntax': ['error'],
      // Custom: packages first, relative files last (`import type` included), never sorted alphabetically.
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'never',
        },
      ],
      // Off: contradicts no-default-export.
      'import-x/prefer-default-export': ['off'],
      // Off: needs a per-library list.
      'import-x/prefer-namespace-import': ['off'],
      // Off: every file is parsed as a module; it would flag a spec that imports nothing.
      'import-x/unambiguous': ['off'],
    },
  },
  // Tool configs (ESLint, Vite, commitlint…) run in Node and export a default config.
  {
    files: ['**/*.js', '**/*.mjs', '**/*.mts'],
    rules: {
      'import-x/no-anonymous-default-export': ['off'],
      'import-x/no-default-export': ['off'],
      'import-x/no-nodejs-modules': ['off'],
    },
  },
  // File and folder names: kebab-case, named after the function they export (`round-to-step.ts`).
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      // Off: local/export-matches-filename names every file after its export (no `utils.ts`).
      'check-file/filename-blocklist': ['off'],
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{js,mjs,ts,mts}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      // Off: files are grouped by feature, not by type.
      'check-file/folder-match-with-fex': ['off'],
      'check-file/folder-naming-convention': ['error', { '**/': 'KEBAB_CASE' }],
      // No `index.ts` barrels besides the entry points (see below).
      'check-file/no-index': ['error'],
    },
  },
  // Entry points: src/index.ts re-exports every folder, each folder's index.ts re-exports its public functions.
  {
    files: ['src/index.ts', 'src/*/index.ts'],
    rules: {
      'check-file/no-index': ['off'],
      'import-x/max-dependencies': ['off'],
    },
  },
  // Specs and benchmarks: Vitest globals.
  {
    files: ['**/*.spec.ts', '**/*.bench.ts'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
    plugins: {
      vitest,
    },
    // Type information lets valid-title accept a class as title (`describe(UserService, …)`).
    settings: {
      vitest: { typecheck: true },
    },
    rules: {
      // Replaced by the Vitest version (allows `expect(obj.method).toHaveBeenCalled()`).
      '@typescript-eslint/unbound-method': ['off'],
      // Off: a `describe` callback holds a whole suite.
      'sonarjs/max-lines-per-function': ['off'],

      // ---- Vitest ----
      // Custom: `.for` (typed, Vitest 2+) instead of `.each`.
      'vitest/consistent-each-for': ['error', { test: 'for', it: 'for', describe: 'for', suite: 'for' }],
      // Custom: specs are named `*.spec.ts`, benchmarks `*.bench.ts`.
      'vitest/consistent-test-filename': ['error', { pattern: String.raw`.*\.(spec|bench)\.ts$` }],
      // Custom: `it` everywhere.
      'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
      'vitest/consistent-vitest-vi': ['error'],
      'vitest/expect-expect': ['error'],
      'vitest/hoisted-apis-on-top': ['error'],
      'vitest/max-expects': ['error'],
      'vitest/max-nested-describe': ['error'],
      'vitest/no-alias-methods': ['error'],
      'vitest/no-commented-out-tests': ['error'],
      'vitest/no-conditional-expect': ['error'],
      'vitest/no-conditional-in-test': ['error'],
      'vitest/no-conditional-tests': ['error'],
      'vitest/no-disabled-tests': ['error'],
      // Deprecated: no replacement.
      'vitest/no-done-callback': ['off'],
      'vitest/no-duplicate-hooks': ['error'],
      'vitest/no-focused-tests': ['error'],
      // Off: test setup belongs in `beforeEach`.
      'vitest/no-hooks': ['off'],
      'vitest/no-identical-title': ['error'],
      'vitest/no-import-node-test': ['error'],
      // Vitest globals are enabled (see languageOptions above).
      'vitest/no-importing-vitest-globals': ['error'],
      'vitest/no-interpolation-in-snapshots': ['error'],
      'vitest/no-large-snapshots': ['error'],
      'vitest/no-mocks-import': ['error'],
      // Off: needs a list of forbidden matchers.
      'vitest/no-restricted-matchers': ['off'],
      // Off: needs a list of forbidden `vi` methods.
      'vitest/no-restricted-vi-methods': ['off'],
      'vitest/no-standalone-expect': ['error'],
      'vitest/no-test-prefixes': ['error'],
      'vitest/no-test-return-statement': ['error'],
      'vitest/no-unneeded-async-expect-function': ['error'],
      // Off: blank lines are left to the author, like the rest of the layout.
      'vitest/padding-around-after-all-blocks': ['off'],
      // Off: blank lines are left to the author, like the rest of the layout.
      'vitest/padding-around-after-each-blocks': ['off'],
      // Off: blank lines are left to the author, like the rest of the layout.
      'vitest/padding-around-all': ['off'],
      // Off: blank lines are left to the author, like the rest of the layout.
      'vitest/padding-around-before-all-blocks': ['off'],
      // Off: blank lines are left to the author, like the rest of the layout.
      'vitest/padding-around-before-each-blocks': ['off'],
      // Off: blank lines are left to the author, like the rest of the layout.
      'vitest/padding-around-describe-blocks': ['off'],
      // Off: blank lines are left to the author, like the rest of the layout.
      'vitest/padding-around-expect-groups': ['off'],
      // Off: blank lines are left to the author, like the rest of the layout.
      'vitest/padding-around-test-blocks': ['off'],
      // Off: its autofix turns `toHaveBeenCalledOnce()` into `toHaveBeenCalledExactlyOnceWith()`, which asserts no arguments.
      'vitest/prefer-called-exactly-once-with': ['off'],
      'vitest/prefer-called-once': ['error'],
      // Off: opposite of prefer-called-once.
      'vitest/prefer-called-times': ['off'],
      // Off: its autofix turns `toHaveBeenCalled()` into `toHaveBeenCalledWith()`, which asserts no arguments.
      'vitest/prefer-called-with': ['off'],
      'vitest/prefer-comparison-matcher': ['error'],
      // Off: its autofix rewrites the title on every save and fights valid-title in editors; both forms stay valid.
      'vitest/prefer-describe-function-title': ['off'],
      'vitest/prefer-each': ['error'],
      'vitest/prefer-equality-matcher': ['error'],
      // Off: requires `expect.assertions()` in every test; async tests use `await` instead.
      'vitest/prefer-expect-assertions': ['off'],
      'vitest/prefer-expect-resolves': ['error'],
      'vitest/prefer-expect-type-of': ['error'],
      'vitest/prefer-hooks-in-order': ['error'],
      'vitest/prefer-hooks-on-top': ['error'],
      'vitest/prefer-import-in-mock': ['error'],
      // Off: opposite of no-importing-vitest-globals.
      'vitest/prefer-importing-vitest-globals': ['off'],
      // Custom: `describe` titles are functions or classes (`clamp`, `RingBuffer`).
      'vitest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
      'vitest/prefer-mock-promise-shorthand': ['error'],
      'vitest/prefer-mock-return-shorthand': ['error'],
      'vitest/prefer-snapshot-hint': ['error'],
      'vitest/prefer-spy-on': ['error'],
      // Off: its autofix turns `toBeTruthy()` into `toBe(true)`, which fails on objects.
      'vitest/prefer-strict-boolean-matchers': ['off'],
      'vitest/prefer-strict-equal': ['error'],
      'vitest/prefer-to-be': ['error'],
      // Off: loosens `toBe(false)` into `toBeFalsy()`.
      'vitest/prefer-to-be-falsy': ['off'],
      'vitest/prefer-to-be-object': ['error'],
      // Off: loosens `toBe(true)` into `toBeTruthy()`.
      'vitest/prefer-to-be-truthy': ['off'],
      'vitest/prefer-to-contain': ['error'],
      'vitest/prefer-to-have-been-called-times': ['error'],
      'vitest/prefer-to-have-length': ['error'],
      'vitest/prefer-todo': ['error'],
      'vitest/prefer-vi-mocked': ['error'],
      'vitest/require-awaited-expect-poll': ['error'],
      'vitest/require-hook': ['error'],
      'vitest/require-local-test-context-for-concurrent-snapshots': ['error'],
      'vitest/require-mock-type-parameters': ['error'],
      // Off: the Vitest config sets the timeout.
      'vitest/require-test-timeout': ['off'],
      'vitest/require-to-throw-message': ['error'],
      'vitest/require-top-level-describe': ['error'],
      'vitest/unbound-method': ['error'],
      'vitest/valid-describe-callback': ['error'],
      'vitest/valid-expect': ['error'],
      'vitest/valid-expect-in-promise': ['error'],
      'vitest/valid-title': ['error'],
      // Custom: warn, unfinished placeholder tests are listed and block the CI with `--max-warnings 0`.
      'vitest/warn-todo': ['warn'],
    },
  },
  // Benchmarks: `bench` comes from the test context (Vitest 5); it is renamed `benchmark` because the Vitest
  // plugin would take it for the legacy `bench` test function (and autofix it into `it`).
  {
    files: ['benchmarks/**/*.bench.ts'],
    rules: {
      // Custom: a benchmark asserts through `benchmark.compare()`.
      'vitest/expect-expect': ['error', { assertFunctionNames: ['expect', 'benchmark.compare'] }],
      // Custom: benchmarks import the package by its name, resolved to its build output (dist/).
      'import-x/no-extraneous-dependencies': ['off'],
    },
  },
  // Specs, their helpers (testing/ folders) and benchmarks: literal test data, local fixtures.
  {
    files: ['**/*.spec.ts', '**/testing/**', '**/*.bench.ts'],
    rules: {
      // Off: test tables are made of literal numbers and repeated strings.
      '@typescript-eslint/no-magic-numbers': ['off'],
      'sonarjs/no-duplicate-string': ['off'],
      // Off: fixtures are plain mutable objects.
      '@typescript-eslint/prefer-readonly-parameter-types': ['off'],
    },
  },
  ...jsdocConfig,
  ...regexpConfig,
  ...unicornConfig,
  ...localConfig,
  // ESLint configs list every rule explicitly and repeat the same file globs.
  {
    files: ['eslint.config.mjs', 'eslint/*.mjs'],
    rules: {
      'import-x/max-dependencies': ['off'],
      'sonarjs/max-lines': ['off'],
      'sonarjs/no-duplicate-string': ['off'],
    },
  },
]);

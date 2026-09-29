// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// typescript-eslint with type information: every rule listed, the strictest settings. The heaviest block (it
// builds the TypeScript program), and the one that catches the most bugs.

import globals from 'globals';
import tsEslint from 'typescript-eslint';
import { TYPESCRIPT_FILES } from './files.mjs';
import { namingConventionSelectors } from './naming.mjs';

/**
 * TypeScript rules with type information.
 *
 * @param tsconfigRootDirectory - Folder of the tsconfig files, usually `import.meta.dirname` of the ESLint config.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function typescriptBlock(tsconfigRootDirectory) {
  return [
    {
      name: 'typescript',
      files: TYPESCRIPT_FILES,
      languageOptions: {
        // TS files run in the browser (and in Node: no DOM-only API in the sources).
        globals: {
          ...globals.browser,
          ...globals.es2027,
        },
        parser: tsEslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: tsconfigRootDirectory,
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
  ];
}

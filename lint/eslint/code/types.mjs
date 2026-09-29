// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Types: any, unsafe values, assertions, enums, interfaces, void and null: the type safety of TypeScript.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Types rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function typesBlock() {
  return [
    {
      name: 'code/types',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-prototype-builtins': ['error'],
        'valid-typeof': ['error'],
        'no-implicit-coercion': ['error'],
        'no-new-wrappers': ['error'],
        'no-undefined': ['off'],
        // `void promise;` marks a promise as intentionally not awaited.
        'no-void': ['error', { allowAsStatement: true }],
        // ---- SonarJS ----
        'sonarjs/class-prototype': ['error'],
        'sonarjs/max-union-size': ['error'],
        'sonarjs/no-return-type-any': ['error'],
        // Off: duplicate of @typescript-eslint/no-deprecated.
        'sonarjs/deprecation': ['off'],
        // Off: duplicate of no-new-wrappers and @typescript-eslint/no-wrapper-object-types.
        'sonarjs/no-primitive-wrappers': ['off'],
        'sonarjs/argument-type': ['error'],
        'sonarjs/arguments-order': ['error'],
        'sonarjs/arguments-usage': ['off'],
        'sonarjs/function-return-type': ['error'],
        'sonarjs/no-undefined-argument': ['error'],
        'sonarjs/no-undefined-assignment': ['off'],
        'sonarjs/no-useless-intersection': ['error'],
        'sonarjs/null-dereference': ['error'],
        'sonarjs/prefer-type-guard': ['error'],
        'sonarjs/public-static-readonly': ['error'],
        'sonarjs/redundant-type-aliases': ['error'],
        'sonarjs/use-type-alias': ['error'],
        'sonarjs/void-use': ['error'],
        // ---- Unicorn ----
        'unicorn/no-deprecated-css-features': ['off'],
        'unicorn/no-exports-in-scripts': ['error'],
        // Custom: `null` only where an API requires it (prototypes, JSON); specs and configs are exempt below.
        'unicorn/no-null': ['error'],
        'unicorn/no-typeof-undefined': ['error'],
        'unicorn/no-unknown-css-annotations': ['off'],
        'unicorn/no-unknown-pseudo-selectors': ['off'],
        'unicorn/no-unsafe-buffer-conversion': ['error'],
        'unicorn/no-unsafe-property-key': ['error'],
        'unicorn/no-useless-coercion': ['error'],
        'unicorn/no-useless-undefined': ['error'],
        'unicorn/prefer-abort-signal-any': ['error'],
        'unicorn/prefer-native-coercion-functions': ['error'],
        'unicorn/prefer-prototype-methods': ['error'],
        // Off: ES2025+ API, the library targets ES2024.
        'unicorn/prefer-temporal-conversion': ['off'],
        'unicorn/prefer-type-literal-last': ['error'],
      },
    },
    {
      name: 'code/types/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/adjacent-overload-signatures': ['error'],
        '@typescript-eslint/consistent-generic-constructors': ['error'],
        '@typescript-eslint/consistent-type-assertions': ['error'],
        '@typescript-eslint/consistent-type-definitions': ['error'],
        '@typescript-eslint/consistent-type-exports': ['error'],
        '@typescript-eslint/consistent-type-imports': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        // Off: duplicate of explicit-function-return-type.
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        // Custom: `foo(): void` style; pass members as callbacks through `() => api.foo()`.
        '@typescript-eslint/method-signature-style': ['error', 'method'],
        // Off: no-non-null-assertion forbids every `!`.
        '@typescript-eslint/no-confusing-non-null-assertion': ['off'],
        '@typescript-eslint/no-confusing-void-expression': ['error'],
        '@typescript-eslint/no-deprecated': ['error'],
        '@typescript-eslint/no-duplicate-enum-values': ['error'],
        '@typescript-eslint/no-duplicate-type-constituents': ['error'],
        // Deprecated: replaced by no-empty-object-type.
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/no-empty-object-type': ['error'],
        '@typescript-eslint/no-explicit-any': ['error'],
        // Off: no-non-null-assertion forbids every `!`.
        '@typescript-eslint/no-extra-non-null-assertion': ['off'],
        '@typescript-eslint/no-generated-empty-object-type': ['error'],
        '@typescript-eslint/no-import-type-side-effects': ['error'],
        '@typescript-eslint/no-inferrable-types': ['error'],
        '@typescript-eslint/no-invalid-void-type': ['error'],
        // Off: covered by sonarjs/void-use, which only allows `void` on promises.
        '@typescript-eslint/no-meaningless-void-operator': ['off'],
        '@typescript-eslint/no-mixed-enums': ['error'],
        // Off: no-non-null-assertion forbids every `!`.
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['off'],
        '@typescript-eslint/no-non-null-asserted-optional-chain': ['off'],
        '@typescript-eslint/no-non-null-assertion': ['error'],
        '@typescript-eslint/no-redundant-type-constituents': ['error'],
        '@typescript-eslint/no-restricted-types': ['error'],
        // Deprecated: replaced by consistent-type-definitions.
        '@typescript-eslint/no-type-alias': ['off'],
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
        '@typescript-eslint/no-unsafe-function-type': ['error'],
        '@typescript-eslint/no-unsafe-member-access': ['error'],
        '@typescript-eslint/no-unsafe-return': ['error'],
        '@typescript-eslint/no-unsafe-type-assertion': ['error'],
        '@typescript-eslint/no-wrapper-object-types': ['error'],
        // Off: asks for `x!`, forbidden by no-non-null-assertion.
        '@typescript-eslint/non-nullable-type-assertion-style': ['off'],
        '@typescript-eslint/prefer-enum-initializers': ['error'],
        '@typescript-eslint/prefer-function-type': ['error'],
        '@typescript-eslint/prefer-literal-enum-member': ['error'],
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
        '@typescript-eslint/prefer-return-this-type': ['error'],
        '@typescript-eslint/strict-void-return': ['error'],
        // Deprecated: no replacement.
        '@typescript-eslint/typedef': ['off'],
        '@typescript-eslint/unified-signatures': ['error'],
      },
    },
  ];
}

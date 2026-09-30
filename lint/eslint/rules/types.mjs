// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Types: any, unsafe values, assertions, enums, interfaces, void and null: the type safety of TypeScript.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
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
      name: 'rules/types',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-prototype-builtins': ['error'],
        'valid-typeof': ['error'],
        'no-implicit-coercion': ['error'],
        'no-new-wrappers': ['error'],
        'no-undefined': ['off'],
        // `void promise;` marks a promise as intentionally not awaited.
        'no-void': ['warn', { allowAsStatement: true }],
        // ---- SonarJS ----
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/class-prototype': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/max-union-size': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-return-type-any': ['off'],
        // Off: duplicate of @typescript-eslint/no-deprecated.
        'sonarjs/deprecation': ['off'],
        // Off: duplicate of no-new-wrappers and @typescript-eslint/no-wrapper-object-types.
        'sonarjs/no-primitive-wrappers': ['off'],
        'sonarjs/argument-type': ['warn'],
        'sonarjs/arguments-order': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/arguments-usage': ['off'],
        'sonarjs/function-return-type': ['warn'],
        'sonarjs/no-undefined-argument': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-undefined-assignment': ['off'],
        'sonarjs/no-useless-intersection': ['error'],
        'sonarjs/null-dereference': ['error'],
        'sonarjs/prefer-type-guard': ['warn'],
        'sonarjs/public-static-readonly': ['warn'],
        'sonarjs/redundant-type-aliases': ['warn'],
        'sonarjs/use-type-alias': ['warn'],
        // Sonar way; replaces the core @typescript-eslint/no-meaningless-void-operator, like SonarQube.
        'sonarjs/void-use': ['warn'],
      },
    },
    {
      name: 'rules/types/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/adjacent-overload-signatures': ['info'],
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
        // Warn: a deprecated API may have no replacement yet.
        '@typescript-eslint/no-deprecated': ['warn'],
        '@typescript-eslint/no-duplicate-enum-values': ['error'],
        '@typescript-eslint/no-duplicate-type-constituents': ['error'],
        // Deprecated: replaced by no-empty-object-type.
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/no-empty-object-type': ['warn'],
        // Warn: an `any` is justified where it is written (off in a library: rules/library). Using an `any` value
        // stays an error (no-unsafe-*).
        '@typescript-eslint/no-explicit-any': ['warn'],
        // Off: no-non-null-assertion forbids every `!`.
        '@typescript-eslint/no-extra-non-null-assertion': ['off'],
        '@typescript-eslint/no-generated-empty-object-type': ['error'],
        '@typescript-eslint/no-import-type-side-effects': ['error'],
        '@typescript-eslint/no-inferrable-types': ['error'],
        // Warn: a `void` in a union or a generic is justified where it is written (off in a library: rules/library).
        '@typescript-eslint/no-invalid-void-type': ['warn'],
        // Off: replaced by sonarjs/void-use, like SonarQube.
        '@typescript-eslint/no-meaningless-void-operator': ['off'],
        '@typescript-eslint/no-mixed-enums': ['error'],
        // Off: no-non-null-assertion forbids every `!`.
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['off'],
        '@typescript-eslint/no-non-null-asserted-optional-chain': ['off'],
        // Warn: a value the types cannot prove present.
        '@typescript-eslint/no-non-null-assertion': ['warn'],
        '@typescript-eslint/no-redundant-type-constituents': ['info'],
        '@typescript-eslint/no-restricted-types': ['error'],
        // Deprecated: replaced by consistent-type-definitions.
        '@typescript-eslint/no-type-alias': ['off'],
        '@typescript-eslint/no-unnecessary-type-arguments': ['error'],
        '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
        '@typescript-eslint/no-unnecessary-type-constraint': ['info'],
        '@typescript-eslint/no-unnecessary-type-conversion': ['info'],
        '@typescript-eslint/no-unnecessary-type-parameters': ['error'],
        // Using an `any` value breaks the typing: an error, never disabled.
        '@typescript-eslint/no-unsafe-argument': ['error'],
        // Using an `any` value breaks the typing: an error, never disabled.
        '@typescript-eslint/no-unsafe-assignment': ['error'],
        // Using an `any` value breaks the typing: an error, never disabled.
        '@typescript-eslint/no-unsafe-call': ['error'],
        '@typescript-eslint/no-unsafe-declaration-merging': ['error'],
        '@typescript-eslint/no-unsafe-enum-assignment': ['error'],
        // Warn: generic or external code sometimes needs it.
        '@typescript-eslint/no-unsafe-function-type': ['warn'],
        // Using an `any` value breaks the typing: an error, never disabled.
        '@typescript-eslint/no-unsafe-member-access': ['error'],
        // Using an `any` value breaks the typing: an error, never disabled.
        '@typescript-eslint/no-unsafe-return': ['error'],
        // Warn: narrowing an external type sometimes needs an assertion.
        '@typescript-eslint/no-unsafe-type-assertion': ['warn'],
        '@typescript-eslint/no-wrapper-object-types': ['error'],
        // Off: asks for `x!`, forbidden by no-non-null-assertion.
        '@typescript-eslint/non-nullable-type-assertion-style': ['off'],
        '@typescript-eslint/prefer-enum-initializers': ['info'],
        '@typescript-eslint/prefer-function-type': ['error'],
        '@typescript-eslint/prefer-literal-enum-member': ['info'],
        '@typescript-eslint/prefer-readonly': ['error'],
        // Custom: a utility never mutates its arguments; functions and DOM/runtime types (live objects) are exempt.
        // Warn: external types (DOM, libraries) are not deeply readonly.
        '@typescript-eslint/prefer-readonly-parameter-types': [
          'warn',
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
        '@typescript-eslint/unified-signatures': ['info'],
      },
    },
  ];
}

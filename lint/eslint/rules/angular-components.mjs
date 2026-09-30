// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Angular (angular-eslint): components, directives, pipes and services, every TypeScript rule listed, plus the
// TypeScript rules Angular code needs differently. Templates are in angular-templates.

import angular from 'angular-eslint';
import { namingConventionSelectors } from './naming.mjs';

// angular-eslint is typed with typescript-eslint types, which ESLint's own types reject; it works at runtime.
const angularPlugin = /** @type {import('eslint').ESLint.Plugin} */ (/** @type {unknown} */ (angular.tsPlugin));

/**
 * Angular rules for TypeScript files, with inline templates extracted for the template blocks.
 *
 * @param {string} prefix - Selector prefix of the project, such as `app` or `ds` (`ds-button`, `[dsTooltip]`).
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function angularComponentsBlock(prefix) {
  return [
    {
      name: 'rules/angular-components/typescript-adjustments',
      files: ['**/*.ts'],
      rules: {
        // Off: Angular fields initialise in order (`inject()` first), conflicting with its default order.
        '@typescript-eslint/member-ordering': ['off'],
        // Custom: decorators are capitalised calls (\`@Component()\`), not constructors.
        'new-cap': ['warn', { capIsNew: false }],
        // Custom: the shared naming, plus PascalCase readonly properties (an enum exposed to a template) and
        // PascalCase stores (\`export const UsersStore = signalStore(…)\` is used like a class).
        // Warn: external names (JSON keys, HTTP headers) keep their spelling.
        '@typescript-eslint/naming-convention': [
          'warn',
          ...namingConventionSelectors,
          { selector: 'variable', filter: { regex: 'Store$', match: true }, format: ['PascalCase'] },
          {
            selector: 'classProperty',
            modifiers: ['readonly'],
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
        ],
        // Angular classes are decorated (`@Component`, `@Injectable`…).
        '@typescript-eslint/no-extraneous-class': ['warn', { allowWithDecorator: true }],
      },
    },
    {
      name: 'rules/angular-components',
      files: ['**/*.ts'],
      processor: angular.processInlineTemplates,
      plugins: {
        '@angular-eslint': angularPlugin,
      },
      rules: {
        '@angular-eslint/component-class-suffix': ['warn'],
        // Small components may stay inline; past 3 lines, template and styles go to their own files.
        '@angular-eslint/component-max-inline-declarations': ['info'],
        '@angular-eslint/component-selector': ['warn', { type: 'element', prefix, style: 'kebab-case' }],
        '@angular-eslint/computed-must-return': ['error'],
        '@angular-eslint/consistent-component-styles': ['error'],
        '@angular-eslint/contextual-decorator': ['error'],
        '@angular-eslint/contextual-lifecycle': ['error'],
        '@angular-eslint/directive-class-suffix': ['warn'],
        '@angular-eslint/directive-selector': ['warn', { type: 'attribute', prefix, style: 'camelCase' }],
        '@angular-eslint/inject-at-top': ['error'],
        '@angular-eslint/no-async-lifecycle-method': ['error'],
        '@angular-eslint/no-attribute-decorator': ['error'],
        // Warn: a developer-preview API may be used knowingly; it may still change before it is stable.
        '@angular-eslint/no-developer-preview': ['warn'],
        '@angular-eslint/no-duplicates-in-metadata-arrays': ['error'],
        '@angular-eslint/no-empty-lifecycle-method': ['info'],
        '@angular-eslint/no-experimental': ['error'],
        '@angular-eslint/no-forward-ref': ['warn'],
        '@angular-eslint/no-implicit-take-until-destroyed': ['error'],
        // Off: no input prefix to forbid (the rule does nothing without a list).
        '@angular-eslint/no-input-prefix': ['off'],
        '@angular-eslint/no-input-rename': ['error'],
        '@angular-eslint/no-inputs-metadata-property': ['warn'],
        '@angular-eslint/no-lifecycle-call': ['error'],
        '@angular-eslint/no-output-native': ['error'],
        '@angular-eslint/no-output-on-prefix': ['warn'],
        '@angular-eslint/no-output-rename': ['error'],
        '@angular-eslint/no-outputs-metadata-property': ['warn'],
        '@angular-eslint/no-pipe-impure': ['warn'],
        '@angular-eslint/no-queries-metadata-property': ['warn'],
        '@angular-eslint/no-uncalled-signals': ['error'],
        // Off: pipe names are internal to the workspace; enable it in a library shared with other teams.
        '@angular-eslint/pipe-prefix': ['off'],
        '@angular-eslint/prefer-host-metadata-property': ['info'],
        '@angular-eslint/prefer-inject': ['info'],
        // Custom: OnPush is the default since Angular 22, writing it is noise.
        '@angular-eslint/prefer-on-push-component-change-detection': ['error', { allowExplicitOnPush: false }],
        '@angular-eslint/prefer-output-emitter-ref': ['info'],
        '@angular-eslint/prefer-output-readonly': ['info'],
        '@angular-eslint/prefer-service-decorator': ['error'],
        // Custom: more accurate with type information (the typescript block enables it).
        '@angular-eslint/prefer-signal-model': ['error', { useTypeChecking: true }],
        // Custom: more accurate with type information (the typescript block enables it).
        '@angular-eslint/prefer-signals': ['error', { useTypeChecking: true }],
        '@angular-eslint/prefer-standalone': ['info'],
        '@angular-eslint/reactive-context-must-read-signal': ['error', { checkResources: true }],
        '@angular-eslint/relative-url-prefix': ['info'],
        '@angular-eslint/require-lifecycle-on-prototype': ['error'],
        // Off: the texts are translated with Transloco, not @angular/localize.
        '@angular-eslint/require-localize-metadata': ['off'],
        // Off: the texts are translated with Transloco, not @angular/localize.
        '@angular-eslint/runtime-localize': ['off'],
        '@angular-eslint/sort-keys-in-type-decorator': ['error'],
        '@angular-eslint/sort-lifecycle-methods': ['error'],
        '@angular-eslint/use-component-selector': ['warn'],
        '@angular-eslint/use-component-view-encapsulation': ['warn'],
        // Off: root services use @Service (prefer-service-decorator); a bare @Injectable() is component-scoped.
        '@angular-eslint/use-injectable-provided-in': ['off'],
        '@angular-eslint/use-lifecycle-interface': ['error'],
        '@angular-eslint/use-pipe-transform-interface': ['error'],
      },
    },
    {
      name: 'rules/angular-components/specs',
      files: ['**/*.spec.ts'],
      rules: {
        // Off: Angular types `fixture.nativeElement` and `debugElement` as `any`.
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unsafe-call': ['off'],
        '@typescript-eslint/no-unsafe-member-access': ['off'],
        '@typescript-eslint/no-unsafe-type-assertion': ['off'],
      },
    },
  ];
}

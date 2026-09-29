// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Angular (angular-eslint): components, directives, pipes and services, every TypeScript rule listed, plus the
// TypeScript rules Angular code needs differently. Templates, accessibility and i18n are separate blocks.

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
export default function angularBlock(prefix) {
  return [
    {
      name: 'angular/typescript-adjustments',
      files: ['**/*.ts'],
      rules: {
        // Off: Angular fields initialise in order (`inject()` first), conflicting with its default order.
        '@typescript-eslint/member-ordering': ['off'],
        // Custom: Angular imports without extension (the bundler resolves \`.ts\`).
        'import-x/extensions': ['error', 'never'],
        // Custom: decorators are capitalised calls (\`@Component()\`), not constructors.
        'new-cap': ['error', { capIsNew: false }],
        // Custom: the shared naming, plus PascalCase readonly properties (an enum exposed to a template) and
        // PascalCase stores (\`export const UsersStore = signalStore(…)\` is used like a class).
        '@typescript-eslint/naming-convention': [
          'error',
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
        '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      },
    },
    {
      name: 'angular',
      files: ['**/*.ts'],
      processor: angular.processInlineTemplates,
      plugins: {
        '@angular-eslint': angularPlugin,
      },
      rules: {
        '@angular-eslint/component-class-suffix': ['error'],
        // Small components may stay inline; past 3 lines, template and styles go to their own files.
        '@angular-eslint/component-max-inline-declarations': ['error'],
        '@angular-eslint/component-selector': ['error', { type: 'element', prefix, style: 'kebab-case' }],
        '@angular-eslint/computed-must-return': ['error'],
        '@angular-eslint/consistent-component-styles': ['error'],
        '@angular-eslint/contextual-decorator': ['error'],
        '@angular-eslint/contextual-lifecycle': ['error'],
        '@angular-eslint/directive-class-suffix': ['error'],
        '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix, style: 'camelCase' }],
        '@angular-eslint/inject-at-top': ['error'],
        '@angular-eslint/no-async-lifecycle-method': ['error'],
        '@angular-eslint/no-attribute-decorator': ['error'],
        // Custom: warn, developer-preview APIs may still change before they are stable.
        '@angular-eslint/no-developer-preview': ['warn'],
        '@angular-eslint/no-duplicates-in-metadata-arrays': ['error'],
        '@angular-eslint/no-empty-lifecycle-method': ['error'],
        '@angular-eslint/no-experimental': ['error'],
        '@angular-eslint/no-forward-ref': ['error'],
        '@angular-eslint/no-implicit-take-until-destroyed': ['error'],
        // Off: no input prefix to forbid (the rule does nothing without a list).
        '@angular-eslint/no-input-prefix': ['off'],
        '@angular-eslint/no-input-rename': ['error'],
        '@angular-eslint/no-inputs-metadata-property': ['error'],
        '@angular-eslint/no-lifecycle-call': ['error'],
        '@angular-eslint/no-output-native': ['error'],
        '@angular-eslint/no-output-on-prefix': ['error'],
        '@angular-eslint/no-output-rename': ['error'],
        '@angular-eslint/no-outputs-metadata-property': ['error'],
        '@angular-eslint/no-pipe-impure': ['error'],
        '@angular-eslint/no-queries-metadata-property': ['error'],
        '@angular-eslint/no-uncalled-signals': ['error'],
        // Off: pipe names are internal to the workspace; enable it in a library shared with other teams.
        '@angular-eslint/pipe-prefix': ['off'],
        '@angular-eslint/prefer-host-metadata-property': ['error'],
        '@angular-eslint/prefer-inject': ['error'],
        // Custom: OnPush is the default since Angular 22, writing it is noise.
        '@angular-eslint/prefer-on-push-component-change-detection': ['error', { allowExplicitOnPush: false }],
        '@angular-eslint/prefer-output-emitter-ref': ['error'],
        '@angular-eslint/prefer-output-readonly': ['error'],
        '@angular-eslint/prefer-service-decorator': ['error'],
        // Custom: more accurate with type information (the typescript block enables it).
        '@angular-eslint/prefer-signal-model': ['error', { useTypeChecking: true }],
        // Custom: more accurate with type information (the typescript block enables it).
        '@angular-eslint/prefer-signals': ['error', { useTypeChecking: true }],
        '@angular-eslint/prefer-standalone': ['error'],
        '@angular-eslint/reactive-context-must-read-signal': ['error', { checkResources: true }],
        '@angular-eslint/relative-url-prefix': ['error'],
        '@angular-eslint/require-lifecycle-on-prototype': ['error'],
        // Off: see the angular-i18n block.
        '@angular-eslint/require-localize-metadata': ['off'],
        // Off: see the angular-i18n block.
        '@angular-eslint/runtime-localize': ['off'],
        '@angular-eslint/sort-keys-in-type-decorator': ['error'],
        '@angular-eslint/sort-lifecycle-methods': ['error'],
        '@angular-eslint/use-component-selector': ['error'],
        '@angular-eslint/use-component-view-encapsulation': ['error'],
        // Off: root services use @Service (prefer-service-decorator); a bare @Injectable() is component-scoped.
        '@angular-eslint/use-injectable-provided-in': ['off'],
        '@angular-eslint/use-lifecycle-interface': ['error'],
        '@angular-eslint/use-pipe-transform-interface': ['error'],
      },
    },
    {
      name: 'angular/specs',
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

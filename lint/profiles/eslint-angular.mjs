// Profiles for Angular: a library of features (design system, features, stores, back-end access) and an
// application built on it. Both get the core, Angular, templates, NgRx signal stores, the atomic design
// architecture and the security rules; an application also locks the unsafe rules and checks browser support.
// Accessibility, i18n, Storybook and RxJS are chosen per project.

import angularAccessibilityBlock from '../eslint/angular-accessibility.mjs';
import angularI18nBlock from '../eslint/angular-i18n.mjs';
import angularTemplateBlock from '../eslint/angular-template.mjs';
import angularBlock from '../eslint/angular.mjs';
import appBlock from '../eslint/app.mjs';
import architectureBlock from '../eslint/architecture.mjs';
import compatBlock from '../eslint/compat.mjs';
import ngrxSignalsBlock from '../eslint/ngrx-signals.mjs';
import rxjsBlock from '../eslint/rxjs.mjs';
import securityBlock from '../eslint/security.mjs';
import storybookBlock from '../eslint/storybook.mjs';
import coreProfile from './eslint-core.mjs';

/**
 * @typedef {object} AngularOptions
 * @property {string} tsconfigRootDirectory - Folder of the root `tsconfig.json`, usually `import.meta.dirname`.
 * @property {string[]} developmentDependencyFiles - Globs of the files allowed to import devDependencies.
 * @property {string} prefix - Selector prefix of the project, such as `ds` or `app`.
 * @property {boolean} isAccessible - Whether the templates must meet WCAG (angular-accessibility block).
 * @property {boolean} isTranslated - Whether the texts are translated with @angular/localize (angular-i18n block).
 * @property {boolean} usesRxjs - Whether the code still uses observables (rxjs block).
 * @property {string | undefined} storybookPackageDirectory - Folder of the package.json listing the Storybook
 * addons, or `undefined` without Storybook.
 */

/**
 * The blocks shared by an Angular library and an Angular application.
 *
 * @param {AngularOptions} options - The project and its choices.
 * @returns {import('eslint').Linter.Config[]} The configs.
 */
function angularProfile(options) {
  return [
    ...coreProfile(options),
    ...securityBlock(),
    ...angularBlock(options.prefix),
    ...angularTemplateBlock(),
    ...(options.isAccessible ? angularAccessibilityBlock() : []),
    ...(options.isTranslated ? angularI18nBlock() : []),
    ...ngrxSignalsBlock(),
    ...(options.usesRxjs ? rxjsBlock() : []),
    ...architectureBlock(`${options.tsconfigRootDirectory}/tsconfig.json`),
    ...(options.storybookPackageDirectory === undefined ? [] : storybookBlock(options.storybookPackageDirectory)),
  ];
}

/**
 * Lints an Angular library of features: design system components, features, stores, back-end access.
 *
 * @param {AngularOptions} options - The project and its choices.
 * @returns {import('eslint').Linter.Config[]} The configs, to spread in `defineConfig([…])`.
 */
export function angularLibraryProfile(options) {
  return angularProfile(options);
}

/**
 * @typedef {object} AngularAppOptions
 * @property {string[]} browsers - The supported browsers, as a browserslist query.
 * @property {string[]} polyfills - The APIs polyfilled by the application.
 */

/**
 * Lints an Angular application: the library rules, the unsafe rules locked, the browser support checked.
 *
 * @param {AngularOptions & AngularAppOptions} options - The project and its choices.
 * @returns {import('eslint').Linter.Config[]} The configs, to spread in `defineConfig([…])`.
 */
export function angularAppProfile(options) {
  return [...angularProfile(options), ...appBlock(), ...compatBlock(options.browsers, options.polyfills)];
}

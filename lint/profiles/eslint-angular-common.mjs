// Profile part shared by an Angular library and an Angular application: the core, Angular (TypeScript and
// templates), NgRx signal stores and the atomic design architecture; accessibility, i18n, RxJS and Storybook
// are chosen per project.

import angularI18nBlock from '../eslint/frameworks/angular-i18n.mjs';
import angularBlock from '../eslint/frameworks/angular.mjs';
import ngrxSignalsBlock from '../eslint/frameworks/ngrx-signals.mjs';
import rxjsBlock from '../eslint/frameworks/rxjs.mjs';
import storybookBlock from '../eslint/frameworks/storybook.mjs';
import architectureBlock from '../eslint/project/architecture.mjs';
import angularAccessibilityBlock from '../eslint/templates/angular-accessibility.mjs';
import angularI18nTemplatesBlock from '../eslint/templates/angular-i18n.mjs';
import angularTemplateBlock from '../eslint/templates/angular-template.mjs';
import coreProfile from './eslint-core.mjs';

/**
 * @typedef {object} AngularOptions
 * @property {string} tsconfigRootDirectory - Folder of the root `tsconfig.json`, usually `import.meta.dirname`.
 * @property {string[]} developmentDependencyFiles - Globs of the files allowed to import devDependencies.
 * @property {string} prefix - Selector prefix of the project, such as `ds` or `app`.
 * @property {boolean} isAccessible - Whether the templates must meet WCAG (templates/angular-accessibility).
 * @property {boolean} isTranslated - Whether the texts are translated with @angular/localize (angular-i18n blocks).
 * @property {boolean} usesRxjs - Whether the code still uses observables (frameworks/rxjs).
 * @property {string | undefined} storybookPackageDirectory - Folder of the package.json listing the Storybook
 * addons, or `undefined` without Storybook.
 */

/**
 * The blocks shared by an Angular library and an Angular application.
 *
 * @param {AngularOptions} options - The project and its choices.
 * @returns {import('eslint').Linter.Config[]} The configs.
 */
export default function angularCommonProfile(options) {
  return [
    ...coreProfile(options),
    // TypeScript of Angular.
    ...angularBlock(options.prefix),
    ...(options.isTranslated ? angularI18nBlock() : []),
    ...ngrxSignalsBlock(),
    ...(options.usesRxjs ? rxjsBlock() : []),
    // HTML templates.
    ...angularTemplateBlock(),
    ...(options.isAccessible ? angularAccessibilityBlock() : []),
    ...(options.isTranslated ? angularI18nTemplatesBlock() : []),
    // Architecture and stories.
    ...architectureBlock(`${options.tsconfigRootDirectory}/tsconfig.json`),
    ...(options.storybookPackageDirectory === undefined ? [] : storybookBlock(options.storybookPackageDirectory)),
  ];
}

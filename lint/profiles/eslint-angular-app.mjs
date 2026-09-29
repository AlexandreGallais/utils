// Profile: an Angular application (a program): the library rules, the unsafe rules locked (no escape hatch in
// application code) and the browser support checked.

import appBlock from '../eslint/project/app.mjs';
import compatBlock from '../eslint/project/compat.mjs';
import angularCommonProfile from './eslint-angular-common.mjs';

/**
 * @typedef {object} AngularAppOptions
 * @property {string[]} browsers - The supported browsers, as a browserslist query.
 * @property {string[]} polyfills - The APIs polyfilled by the application.
 */

/**
 * Lints an Angular application.
 *
 * @param {import('./eslint-angular-common.mjs').AngularOptions & AngularAppOptions} options - The project and its choices.
 * @returns {import('eslint').Linter.Config[]} The configs, to spread in `defineConfig([…])`.
 */
export default function angularAppProfile(options) {
  return [...angularCommonProfile(options), ...appBlock(), ...compatBlock(options.browsers, options.polyfills)];
}

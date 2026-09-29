// Profile: an Angular library of features (design system components, features, stores, back-end access).

import angularCommonProfile from './eslint-angular-common.mjs';

/**
 * Lints an Angular library of features.
 *
 * @param {import('./eslint-angular-common.mjs').AngularOptions} options - The project and its choices.
 * @returns {import('eslint').Linter.Config[]} The configs, to spread in `defineConfig([…])`.
 */
export default function angularLibraryProfile(options) {
  return angularCommonProfile(options);
}

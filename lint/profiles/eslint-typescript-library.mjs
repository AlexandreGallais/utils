// Profile: a TypeScript library without UI framework (utilities, an SVG library built by Vite): the core, the
// JSDoc of the public API and the security rules for browser code.

import jsdocBlock from '../eslint/jsdoc.mjs';
import securityBlock from '../eslint/security.mjs';
import coreProfile from './eslint-core.mjs';

/**
 * @typedef {object} TypescriptLibraryOptions
 * @property {string} tsconfigRootDirectory - Folder of the root `tsconfig.json`, usually `import.meta.dirname`.
 * @property {string[]} developmentDependencyFiles - Globs of the files allowed to import devDependencies.
 * @property {string[]} apiFiles - Globs of the documented public sources (JSDoc required).
 * @property {string[]} ignoredApiFiles - Globs excluded from `apiFiles` (specs, test helpers).
 */

/**
 * Lints a TypeScript library.
 *
 * @param {TypescriptLibraryOptions} options - Paths of the project.
 * @returns {import('eslint').Linter.Config[]} The configs, to spread in `defineConfig([…])`.
 */
export default function typescriptLibraryProfile(options) {
  return [...coreProfile(options), ...securityBlock(), ...jsdocBlock(options.apiFiles, options.ignoredApiFiles)];
}

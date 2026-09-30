// The start of every project preset (typescript-browser, angular-library, angular-app): the configs of the
// workspace root (Node mode), then the browser mode, the one export per file and, for a library, the
// relaxations of a generic API, on the project's sources.

import browserBlock from '../rules/browser.mjs';
import exportsBlock from '../rules/exports.mjs';
import libraryBlock from '../rules/library.mjs';

/**
 * @typedef {object} ProjectOptions
 * @property {import('eslint').Linter.Config[]} rootConfig - The configs of the workspace root: the default export
 *   of its eslint.config.mjs, built by the typescript-node preset.
 * @property {string[]} sourceFiles - Globs of the project's sources, relative to its eslint.config.mjs, such as
 *   `['src/**\/*.ts']`: browser mode, one exported function or class per file.
 * @property {string[]} developmentDependencyFiles - Globs of the sources never shipped, which may import
 *   devDependencies, such as `['**\/*.spec.ts', '**\/*.stories.ts']`.
 */

/**
 * The root configs, then the browser mode of the project's sources.
 *
 * @param {ProjectOptions} options - The project.
 * @param {boolean} isLibrary - Whether the project is a library: its generic API may write `any` and `void`.
 * @returns {import('eslint').Linter.Config[]} The configs.
 */
export default function projectRules(options, isLibrary) {
  const { rootConfig, sourceFiles, developmentDependencyFiles } = options;
  return [
    ...rootConfig,
    ...browserBlock(sourceFiles, developmentDependencyFiles),
    ...exportsBlock(sourceFiles),
    ...(isLibrary ? libraryBlock(sourceFiles) : []),
  ];
}

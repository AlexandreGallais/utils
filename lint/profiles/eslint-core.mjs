// Profile core: the blocks every TypeScript project gets (JavaScript, TypeScript, imports, names, SonarJS,
// Unicorn, regexp, Vitest, Prettier, disable comments, tool configs). The order matters: a later block overrides
// an earlier one.

import baseBlock from '../eslint/base.mjs';
import commentsBlock from '../eslint/comments.mjs';
import importsBlock from '../eslint/imports.mjs';
import namingBlock from '../eslint/naming.mjs';
import prettierBlock from '../eslint/prettier.mjs';
import regexpBlock from '../eslint/regexp.mjs';
import sonarBlock from '../eslint/sonar.mjs';
import toolingBlock from '../eslint/tooling.mjs';
import typescriptBlock from '../eslint/typescript.mjs';
import unicornBlock from '../eslint/unicorn.mjs';
import vitestBlock from '../eslint/vitest.mjs';

/**
 * @typedef {object} CoreOptions
 * @property {string} tsconfigRootDirectory - Folder of the root `tsconfig.json`, usually `import.meta.dirname`.
 * @property {string[]} developmentDependencyFiles - Globs of the files allowed to import devDependencies.
 */

/**
 * The blocks shared by every profile.
 *
 * @param {CoreOptions} options - Paths of the project.
 * @returns {import('eslint').Linter.Config[]} The configs, to spread in `defineConfig([…])`.
 */
export default function coreProfile(options) {
  const { tsconfigRootDirectory, developmentDependencyFiles } = options;
  return [
    ...prettierBlock(),
    ...sonarBlock(),
    ...baseBlock(),
    ...typescriptBlock(tsconfigRootDirectory),
    ...commentsBlock(),
    ...importsBlock(tsconfigRootDirectory, developmentDependencyFiles),
    ...toolingBlock(),
    ...namingBlock(),
    ...vitestBlock(),
    ...regexpBlock(),
    ...unicornBlock(),
  ];
}

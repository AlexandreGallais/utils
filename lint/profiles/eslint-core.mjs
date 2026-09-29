// Profile core: the blocks every TypeScript project gets. Set-up first (parsers, globals), then one block per
// concept of code/ (each with the rules of ESLint, typescript-eslint, SonarJS and Unicorn on its subject), then
// the plugin blocks (imports, file names, regexp, disable comments), Node tooling and tests. The order matters:
// a later block overrides an earlier one.

import arraysBlock from '../eslint/code/arrays.mjs';
import asyncBlock from '../eslint/code/async.mjs';
import browserApisBlock from '../eslint/code/browser-apis.mjs';
import classesBlock from '../eslint/code/classes.mjs';
import commentsBlock from '../eslint/code/comments.mjs';
import complexityBlock from '../eslint/code/complexity.mjs';
import conditionsBlock from '../eslint/code/conditions.mjs';
import deadCodeBlock from '../eslint/code/dead-code.mjs';
import errorsBlock from '../eslint/code/errors.mjs';
import eslintDirectivesBlock from '../eslint/code/eslint-directives.mjs';
import fileNamesBlock from '../eslint/code/file-names.mjs';
import formattingBlock from '../eslint/code/formatting.mjs';
import functionsBlock from '../eslint/code/functions.mjs';
import importsBlock from '../eslint/code/imports.mjs';
import loopsBlock from '../eslint/code/loops.mjs';
import modernSyntaxBlock from '../eslint/code/modern-syntax.mjs';
import modulesBlock from '../eslint/code/modules.mjs';
import namingBlock from '../eslint/code/naming.mjs';
import nodeApisBlock from '../eslint/code/node-apis.mjs';
import numbersBlock from '../eslint/code/numbers.mjs';
import objectsAndCollectionsBlock from '../eslint/code/objects-and-collections.mjs';
import otherFrameworksBlock from '../eslint/code/other-frameworks.mjs';
import prettierBlock from '../eslint/code/prettier.mjs';
import regexpBlock from '../eslint/code/regexp.mjs';
import regularExpressionsBlock from '../eslint/code/regular-expressions.mjs';
import securityBlock from '../eslint/code/security.mjs';
import stringsBlock from '../eslint/code/strings.mjs';
import testCodeBlock from '../eslint/code/test-code.mjs';
import typesBlock from '../eslint/code/types.mjs';
import variablesBlock from '../eslint/code/variables.mjs';
import toolingBlock from '../eslint/node/tooling.mjs';
import javascriptSetupBlock from '../eslint/setup/javascript.mjs';
import typescriptSetupBlock from '../eslint/setup/typescript.mjs';
import vitestBlock from '../eslint/tests/vitest.mjs';

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
    ...javascriptSetupBlock(),
    ...typescriptSetupBlock(tsconfigRootDirectory),
    // Code, by concept.
    ...conditionsBlock(),
    ...loopsBlock(),
    ...functionsBlock(),
    ...classesBlock(),
    ...objectsAndCollectionsBlock(),
    ...arraysBlock(),
    ...stringsBlock(),
    ...regularExpressionsBlock(),
    ...numbersBlock(),
    ...typesBlock(),
    ...variablesBlock(),
    ...asyncBlock(),
    ...errorsBlock(),
    ...modulesBlock(),
    ...namingBlock(),
    ...commentsBlock(),
    ...complexityBlock(),
    ...deadCodeBlock(),
    ...securityBlock(),
    ...browserApisBlock(),
    ...nodeApisBlock(),
    ...testCodeBlock(),
    ...modernSyntaxBlock(),
    ...formattingBlock(),
    ...otherFrameworksBlock(),
    // Code, by plugin.
    ...eslintDirectivesBlock(),
    ...importsBlock(tsconfigRootDirectory, developmentDependencyFiles),
    ...fileNamesBlock(),
    ...regexpBlock(),
    // Node tool configs and scripts, then tests.
    ...toolingBlock(),
    ...vitestBlock(),
  ];
}

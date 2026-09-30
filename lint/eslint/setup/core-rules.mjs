// The rules every JavaScript and TypeScript project gets, in order: Prettier first (the blocks after it set the
// rules they need again), the parsers, one block per concept of rules/ (ESLint, typescript-eslint and SonarJS),
// then the imports, the file names, the disable comments, the Node tool configs and the test code. Every
// preset starts with it.

import arraysBlock from '../rules/arrays.mjs';
import asyncBlock from '../rules/async.mjs';
import browserApisBlock from '../rules/browser-apis.mjs';
import classesBlock from '../rules/classes.mjs';
import commentsBlock from '../rules/comments.mjs';
import complexityBlock from '../rules/complexity.mjs';
import conditionsBlock from '../rules/conditions.mjs';
import disableCommentsBlock from '../rules/disable-comments.mjs';
import deadCodeBlock from '../rules/dead-code.mjs';
import errorsBlock from '../rules/errors.mjs';
import fileNamesBlock from '../rules/file-names.mjs';
import formattingBlock from '../rules/formatting.mjs';
import functionsBlock from '../rules/functions.mjs';
import importsBlock from '../rules/imports.mjs';
import loopsBlock from '../rules/loops.mjs';
import modernSyntaxBlock from '../rules/modern-syntax.mjs';
import modulesBlock from '../rules/modules.mjs';
import namingBlock from '../rules/naming.mjs';
import nodeApisBlock from '../rules/node-apis.mjs';
import numbersBlock from '../rules/numbers.mjs';
import objectsAndCollectionsBlock from '../rules/objects-and-collections.mjs';
import otherFrameworksBlock from '../rules/other-frameworks.mjs';
import regularExpressionsBlock from '../rules/regular-expressions.mjs';
import securityBlock from '../rules/security.mjs';
import stringsBlock from '../rules/strings.mjs';
import testCodeBlock from '../rules/test-code.mjs';
import typesBlock from '../rules/types.mjs';
import variablesBlock from '../rules/variables.mjs';
import javascriptSetupBlock from './javascript.mjs';
import typescriptSetupBlock from './typescript.mjs';

/**
 * The rules shared by every preset, without the Node or browser mode.
 *
 * @param {string} tsconfigRootDirectory - Folder of the root `tsconfig.json`, usually `import.meta.dirname`.
 * @returns {import('eslint').Linter.Config[]} The configs.
 */
export default function coreRules(tsconfigRootDirectory) {
  return [
    ...formattingBlock(),
    ...javascriptSetupBlock(),
    ...typescriptSetupBlock(tsconfigRootDirectory),
    ...arraysBlock(),
    ...asyncBlock(),
    ...browserApisBlock(),
    ...classesBlock(),
    ...commentsBlock(),
    ...complexityBlock(),
    ...conditionsBlock(),
    ...deadCodeBlock(),
    ...errorsBlock(),
    ...functionsBlock(),
    ...loopsBlock(),
    ...modernSyntaxBlock(),
    ...modulesBlock(),
    ...namingBlock(),
    ...nodeApisBlock(),
    ...numbersBlock(),
    ...objectsAndCollectionsBlock(),
    ...otherFrameworksBlock(),
    ...regularExpressionsBlock(),
    ...securityBlock(),
    ...stringsBlock(),
    ...typesBlock(),
    ...variablesBlock(),
    ...importsBlock(tsconfigRootDirectory),
    ...fileNamesBlock(),
    ...disableCommentsBlock(),
    ...testCodeBlock(),
  ];
}

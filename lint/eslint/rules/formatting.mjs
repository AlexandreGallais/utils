// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Formatting: Prettier formats the code (eslint-plugin-prettier reports unformatted code, eslint-config-prettier
// turns off the layout rules that would conflict), plus the few layout rules outside Prettier. Spread it first:
// the blocks after it set the rules they need again.

import sonarjs from 'eslint-plugin-sonarjs';
import prettier from 'eslint-plugin-prettier/recommended';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Formatting rules, Prettier included.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function formattingBlock() {
  return [
    {
      name: 'rules/formatting/prettier',
      files: CODE_FILES,
      extends: [prettier],
      rules: {
        'prettier/prettier': ['error'],
      },
    },
    {
      name: 'rules/formatting',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-irregular-whitespace': ['error'],
        'no-unexpected-multiline': ['error'],
        // ---- SonarJS ----
        // Off: duplicate of curly.
        'sonarjs/no-unenclosed-multiline-block': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-redundant-parentheses': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-tab': ['off'],
      },
    },
  ];
}

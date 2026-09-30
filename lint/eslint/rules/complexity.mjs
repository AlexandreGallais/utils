// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Complexity: Size and complexity limits: lines, statements, nesting, cognitive complexity.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Complexity rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function complexityBlock() {
  return [
    {
      name: 'rules/complexity',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        // Off: replaced by sonarjs/cognitive-complexity, like SonarQube.
        complexity: ['off'],
        // Off: replaced by sonarjs/nested-control-flow, like SonarQube.
        'max-depth': ['off'],
        // Off: replaced by sonarjs/max-lines, like SonarQube.
        'max-lines': ['off'],
        // Off: no SonarQube equivalent.
        'max-statements': ['off'],
        // ---- SonarJS ----
        // Custom: outside Sonar way; replaces the core max-lines, like SonarQube.
        // Warn: a size limit: a justified exception (a data table, a state machine) may pass.
        'sonarjs/max-lines': ['warn', { maximum: 200 }],
        // Custom: outside Sonar way; replaces the core max-depth, like SonarQube.
        // Warn: a size limit: a justified exception (a data table, a state machine) may pass.
        'sonarjs/nested-control-flow': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/expression-complexity': ['off'],
        // Sonar way; replaces the core complexity, like SonarQube.
        // Warn: a size limit: a justified exception (a data table, a state machine) may pass.
        'sonarjs/cognitive-complexity': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/cyclomatic-complexity': ['off'],
      },
    },
  ];
}

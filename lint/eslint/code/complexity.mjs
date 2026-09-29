// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Complexity: Size and complexity limits: lines, statements, nesting, cognitive complexity.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Complexity rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function complexityBlock() {
  return [
    {
      name: 'code/complexity',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        // Off: replaced by sonarjs/cognitive-complexity (15), like SonarQube.
        complexity: ['off'],
        // Off: replaced by sonarjs/nested-control-flow (3), like SonarQube.
        'max-depth': ['off'],
        // Off: replaced by sonarjs/max-lines (1000), like SonarQube.
        'max-lines': ['off'],
        // Off: no SonarQube equivalent.
        'max-statements': ['off'],
        // ---- SonarJS ----
        // Custom: size limits, off in the preset; one function per file keeps files and functions short.
        'sonarjs/max-lines': ['error', { maximum: 200 }],
        'sonarjs/nested-control-flow': ['error'],
        'sonarjs/expression-complexity': ['error'],
        'sonarjs/cognitive-complexity': ['error'],
        'sonarjs/cyclomatic-complexity': ['off'],
        // ---- Unicorn ----
        'unicorn/no-redundant-nested-style-rules': ['off'],
      },
    },
  ];
}

// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Dead code: Unused, unreachable, useless, empty or duplicated code.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Dead code rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function deadCodeBlock() {
  return [
    {
      name: 'code/dead-code',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-debugger': ['error'],
        'no-empty-pattern': ['error'],
        'no-self-assign': ['error'],
        'no-unreachable': ['error'],
        'no-useless-assignment': ['error'],
        'no-empty': ['error'],
        'no-lone-blocks': ['error'],
        'no-unused-expressions': ['error'],
        // ---- SonarJS ----
        // Off: duplicate of no-useless-assignment.
        'sonarjs/no-dead-store': ['off'],
        // Off: duplicate of @typescript-eslint/no-duplicate-type-constituents.
        'sonarjs/no-duplicate-in-composite': ['off'],
        'sonarjs/no-redundant-jump': ['error'],
        'sonarjs/no-redundant-optional': ['error'],
        // ---- Unicorn ----
        'unicorn/no-empty-file': ['error'],
        'unicorn/no-unnecessary-fetch-options': ['error'],
        // Custom.
        'unicorn/no-unused-properties': ['error'],
        'unicorn/no-useless-fallback-in-spread': ['error'],
        'unicorn/no-useless-recursion': ['error'],
        'unicorn/no-useless-spread': ['error'],
      },
    },
    {
      name: 'code/dead-code/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        // Kept: TypeScript only greys out dead code, `allowUnreachableCode: false` would also block the dev loop.
        'no-unreachable': ['error'],
        '@typescript-eslint/no-unnecessary-qualifier': ['error'],
        // Replaced by the TS version.
        'no-unused-expressions': ['off'],
        '@typescript-eslint/no-unused-expressions': ['error'],
      },
    },
  ];
}

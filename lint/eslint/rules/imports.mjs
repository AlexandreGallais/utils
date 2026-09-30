// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Imports (eslint-plugin-import-x): module boundaries, declared dependencies, cycles, order. import-x/no-cycle
// is the costliest rule of the block: it follows every import.

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importX from 'eslint-plugin-import-x';
import { CODE_FILES } from '../setup/files.mjs';
import local from './local/plugin.mjs';

/**
 * Import rules.
 *
 * @param tsconfigRootDirectory - Folder of the root `tsconfig.json`, which references every project.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function importsBlock(tsconfigRootDirectory) {
  return [
    {
      name: 'rules/imports',
      files: CODE_FILES,
      plugins: {
        'import-x': importX,
        local,
      },
      settings: {
        'import-x/extensions': ['.ts', '.mts', '.js', '.mjs'],
        'import-x/parsers': { '@typescript-eslint/parser': ['.ts', '.mts'] },
        'import-x/resolver-next': [
          // The root tsconfig references every project.
          createTypeScriptImportResolver({ project: `${tsconfigRootDirectory}/tsconfig.json` }),
        ],
      },
      rules: {
        // `import type { A }` on its own line, like consistent-type-imports.
        'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        // Off: TypeScript checks it.
        'import-x/default': ['off'],
        // Off: webpack only (builds use esbuild).
        'import-x/dynamic-import-chunkname': ['off'],
        'import-x/export': ['error'],
        // Off: non-standard.
        'import-x/exports-last': ['off'],
        // Custom: no extension in relative imports (`./format-count`): the bundler resolves it.
        'import-x/extensions': ['error', 'never', { ignorePackages: true, checkTypeImports: true }],
        'import-x/first': ['error'],
        // Off: non-standard.
        'import-x/group-exports': ['off'],
        // Deprecated: replaced by import-x/first.
        'import-x/imports-first': ['off'],
        // Custom: a single-function file with many imports should be split.
        // Off: an index.ts re-exports a whole folder; max-lines already bounds the size of a file.
        'import-x/max-dependencies': ['off'],
        // Off: TypeScript checks it.
        'import-x/named': ['off'],
        // Off: TypeScript checks it.
        'import-x/namespace': ['off'],
        'import-x/newline-after-import': ['error'],
        'import-x/no-absolute-path': ['error'],
        'import-x/no-amd': ['warn'],
        'import-x/no-anonymous-default-export': ['warn'],
        'import-x/no-commonjs': ['warn'],
        'import-x/no-cycle': ['error'],
        // Named exports only; tool configs are the exception.
        'import-x/no-default-export': ['warn'],
        // Off: duplicate of @typescript-eslint/no-deprecated.
        'import-x/no-deprecated': ['off'],
        'import-x/no-duplicates': ['error'],
        'import-x/no-dynamic-require': ['warn'],
        'import-x/no-empty-named-blocks': ['error'],
        // Custom: no devDependency by default; rules/node allows them in tools, rules/browser in the specs and stories.
        'import-x/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: false,
            optionalDependencies: false,
            peerDependencies: true,
            bundledDependencies: false,
          },
        ],
        'import-x/no-import-module-exports': ['error'],
        // Off: would flag every nested relative path (`./components/button/button.component`).
        'import-x/no-internal-modules': ['off'],
        'import-x/no-mutable-exports': ['warn'],
        // Off: default exports are forbidden (no-default-export).
        'import-x/no-named-as-default': ['off'],
        // Off: TypeScript checks it.
        'import-x/no-named-as-default-member': ['off'],
        'import-x/no-named-default': ['warn'],
        // Off: contradicts no-default-export.
        'import-x/no-named-export': ['off'],
        'import-x/no-namespace': ['error'],
        // Browser code; tool configs are the exception.
        'import-x/no-nodejs-modules': ['warn'],
        'import-x/no-relative-packages': ['error'],
        // Off: modules import shared code from parent folders.
        'import-x/no-relative-parent-imports': ['off'],
        // Off: default exports are forbidden (no-default-export).
        'import-x/no-rename-default': ['off'],
        // Off: a single package, no module boundary to enforce.
        'import-x/no-restricted-paths': ['off'],
        'import-x/no-self-import': ['error'],
        'import-x/no-unassigned-import': ['warn'],
        // Off: TypeScript checks it.
        'import-x/no-unresolved': ['off'],
        // Off: a no-op on ESLint 10 (no FileEnumerator API); knip reports unused files and exports instead.
        'import-x/no-unused-modules': ['off'],
        'import-x/no-useless-path-segments': ['error'],
        'import-x/no-webpack-loader-syntax': ['error'],
        // Custom: a relative import names a neighbour file or a folder (its index.ts), never a file of another folder.
        'local/import-folders': ['error', { mode: 'require' }],
        // Custom: packages first, relative files last (`import type` included), never sorted alphabetically.
        'import-x/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
            'newlines-between': 'never',
          },
        ],
        // Off: contradicts no-default-export.
        'import-x/prefer-default-export': ['off'],
        // Off: needs a per-library list.
        'import-x/prefer-namespace-import': ['off'],
        // Off: every file is parsed as a module; it would flag a spec that imports nothing.
        'import-x/unambiguous': ['off'],
      },
    },
  ];
}

// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Imports (eslint-plugin-import-x): module boundaries, declared dependencies, cycles, order. import-x/no-cycle
// is the costliest rule of the block: it follows every import.

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importX from 'eslint-plugin-import-x';
import { CODE_FILES } from './files.mjs';

/**
 * Import rules.
 *
 * @param tsconfigRootDirectory - Folder of the root `tsconfig.json`, which references every project.
 * @param developmentDependencyFiles - Globs of the files allowed to import devDependencies (specs, stories, tool configs).
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function importsBlock(tsconfigRootDirectory, developmentDependencyFiles) {
  return [
    {
      name: 'imports',
      files: CODE_FILES,
      plugins: {
        'import-x': importX,
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
        // Custom: relative imports name the file with its extension (`./clamp.ts`), valid ESM everywhere.
        'import-x/extensions': ['error', 'always', { ignorePackages: true, checkTypeImports: true }],
        'import-x/first': ['error'],
        // Off: non-standard.
        'import-x/group-exports': ['off'],
        // Deprecated: replaced by import-x/first.
        'import-x/imports-first': ['off'],
        // Custom: a single-function file with many imports should be split.
        'import-x/max-dependencies': ['error', { max: 10 }],
        // Off: TypeScript checks it.
        'import-x/named': ['off'],
        // Off: TypeScript checks it.
        'import-x/namespace': ['off'],
        'import-x/newline-after-import': ['error'],
        'import-x/no-absolute-path': ['error'],
        'import-x/no-amd': ['error'],
        'import-x/no-anonymous-default-export': ['error'],
        'import-x/no-commonjs': ['error'],
        'import-x/no-cycle': ['error'],
        // Named exports only; tool configs are the exception.
        'import-x/no-default-export': ['error'],
        // Off: duplicate of @typescript-eslint/no-deprecated.
        'import-x/no-deprecated': ['off'],
        'import-x/no-duplicates': ['error'],
        'import-x/no-dynamic-require': ['error'],
        'import-x/no-empty-named-blocks': ['error'],
        // Custom: devDependencies only in specs, benchmarks and tool configs.
        'import-x/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: developmentDependencyFiles,
            optionalDependencies: false,
            peerDependencies: true,
            bundledDependencies: false,
          },
        ],
        'import-x/no-import-module-exports': ['error'],
        // Off: would flag every nested relative path (`./components/button/button.component`).
        'import-x/no-internal-modules': ['off'],
        'import-x/no-mutable-exports': ['error'],
        // Off: default exports are forbidden (no-default-export).
        'import-x/no-named-as-default': ['off'],
        // Off: TypeScript checks it.
        'import-x/no-named-as-default-member': ['off'],
        'import-x/no-named-default': ['error'],
        // Off: contradicts no-default-export.
        'import-x/no-named-export': ['off'],
        'import-x/no-namespace': ['error'],
        // Browser code; tool configs are the exception.
        'import-x/no-nodejs-modules': ['error'],
        'import-x/no-relative-packages': ['error'],
        // Off: modules import shared code from parent folders.
        'import-x/no-relative-parent-imports': ['off'],
        // Off: default exports are forbidden (no-default-export).
        'import-x/no-rename-default': ['off'],
        // Off: a single package, no module boundary to enforce.
        'import-x/no-restricted-paths': ['off'],
        'import-x/no-self-import': ['error'],
        'import-x/no-unassigned-import': ['error'],
        // Off: TypeScript checks it.
        'import-x/no-unresolved': ['off'],
        // Off: a no-op on ESLint 10 (no FileEnumerator API); knip reports unused files and exports instead.
        'import-x/no-unused-modules': ['off'],
        'import-x/no-useless-path-segments': ['error'],
        'import-x/no-webpack-loader-syntax': ['error'],
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

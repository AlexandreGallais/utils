// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// File globs shared by the blocks: change them here to lint other extensions.

/** Every JavaScript and TypeScript file: sources, specs, tool configs, scripts. */
export const CODE_FILES = ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts'];

/** TypeScript files, linted with type information. */
export const TYPESCRIPT_FILES = ['**/*.ts', '**/*.mts'];

/** Node tool configs and scripts (ESLint, Vite, VitePress configs, build scripts). */
export const NODE_FILES = ['**/*.js', '**/*.mjs', '**/*.mts'];

/** Specs and benchmarks, run by Vitest. */
export const TEST_FILES = ['**/*.spec.ts', '**/*.bench.ts'];

/** Test code: specs, their helpers (`testing/` folders) and benchmarks. */
export const TEST_CODE_FILES = ['**/*.spec.ts', '**/testing/**', '**/*.bench.ts'];

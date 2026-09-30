// Example: the root eslint.config.mjs of a workspace (an Angular workspace with its shell and libraries, or a
// TypeScript workspace): every rule, in Node mode, for the tool configs and scripts. Copy it to the root as
// eslint.config.mjs, with lint/ next to it, and import './lint/index.mjs' instead of the path below. Each
// project imports it from its own eslint.config.mjs.

import { defineConfig, globalIgnores } from 'eslint/config';
import { typescriptNodePreset } from '../index.mjs';

export default defineConfig([
  globalIgnores(['**/node_modules/', '**/dist/', '**/coverage/', '.angular/', '**/storybook-static/']),
  ...typescriptNodePreset({
    tsconfigRootDirectory: import.meta.dirname,
    overrides: [],
  }),
]);

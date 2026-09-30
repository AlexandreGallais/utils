// Example: the eslint.config.mjs of an Angular application (a program: the shell), in projects/shell/. It imports
// the root config and adds the Angular application preset. In the project, import '../../eslint.config.mjs' and
// '../../lint/index.mjs' instead of the paths below.

import { defineConfig } from 'eslint/config';
import { angularAppPreset } from '../index.mjs';
import rootConfig from './workspace-root.eslint.config.mjs';

export default defineConfig(
  angularAppPreset({
    rootConfig,
    // The sources: browser mode, one exported function or class per file.
    sourceFiles: ['src/**/*.ts'],
    // The sources never shipped, which may import devDependencies.
    developmentDependencyFiles: ['**/*.spec.ts'],
    prefix: 'app',
    overrides: [],
  }),
);

// The SCSS of this repository (the example design system), linted with the SCSS preset of lint/. In an Angular
// project, this file sits next to eslint.config.mjs; `pnpm lint:css` runs it.

import { scssPreset } from './lint/stylelint/index.mjs';

export default {
  ...scssPreset({ overrides: [] }),
  ignoreFiles: ['**/node_modules/**', 'dist/**', 'coverage/**', 'docs/.vitepress/**'],
};

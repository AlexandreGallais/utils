// Example: the stylelint.config.mjs of an Angular project (its SCSS). Copy it next to the project's
// eslint.config.mjs, and import './lint/stylelint/index.mjs' (or '../../lint/stylelint/index.mjs' in a project
// folder) instead of the path below.

import { scssPreset } from '../stylelint/index.mjs';

export default scssPreset({ overrides: [] });

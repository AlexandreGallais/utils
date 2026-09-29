// Styles of a design system library, linted with the profile of lint/profiles/.

import stylelintProfile, { DESIGN_SYSTEM_LAYERS } from '../../lint/profiles/stylelint.mjs';

export default stylelintProfile({
  tokenFiles: ['**/tokens/**'],
  layerNames: DESIGN_SYSTEM_LAYERS,
  isAccessible: true,
  usesLogicalProperties: false,
});

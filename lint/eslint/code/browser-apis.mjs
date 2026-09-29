// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Browser: DOM, events, CSS-in-JS, web APIs and the console.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Browser rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function browserApisBlock() {
  return [
    {
      name: 'code/browser-apis',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-alert': ['error'],
        'no-console': ['error'],
        // ---- SonarJS ----
        'sonarjs/no-table-as-layout': ['error'],
        'sonarjs/object-alt-content': ['error'],
        'sonarjs/table-header': ['error'],
        'sonarjs/table-header-reference': ['error'],
        // ---- Unicorn ----
        'unicorn/better-dom-traversing': ['error'],
        'unicorn/no-blob-to-file': ['error'],
        'unicorn/no-canvas-to-image': ['error'],
        'unicorn/no-console-spaces': ['error'],
        'unicorn/no-duplicate-css-selectors': ['off'],
        'unicorn/no-duplicate-font-family-names': ['off'],
        'unicorn/no-immediate-mutation': ['error'],
        'unicorn/no-incorrect-query-selector': ['error'],
        'unicorn/no-invalid-fetch-options': ['error'],
        'unicorn/no-invalid-file-input-accept': ['off'],
        'unicorn/no-invalid-media-features': ['off'],
        'unicorn/no-invalid-remove-event-listener': ['error'],
        'unicorn/no-late-current-target-access': ['error'],
        'unicorn/no-late-event-control': ['error'],
        'unicorn/no-missing-local-resource': ['off'],
        'unicorn/no-selector-as-dom-name': ['error'],
        'unicorn/no-transition-all': ['error'],
        'unicorn/prefer-add-event-listener': ['error'],
        'unicorn/prefer-add-event-listener-options': ['error'],
        'unicorn/prefer-blob-reading-methods': ['error'],
        'unicorn/prefer-classlist-toggle': ['error'],
        'unicorn/prefer-dom-node-append': ['error'],
        'unicorn/prefer-dom-node-html-methods': ['error'],
        'unicorn/prefer-dom-node-remove': ['error'],
        'unicorn/prefer-event-target': ['error'],
        'unicorn/prefer-explicit-viewport-units': ['off'],
        'unicorn/prefer-https': ['error'],
        'unicorn/prefer-media-feature-range-syntax': ['off'],
        'unicorn/prefer-modern-dom-apis': ['error'],
        'unicorn/prefer-observer-apis': ['error'],
        'unicorn/prefer-path2d': ['error'],
        'unicorn/prefer-query-selector': ['error'],
        'unicorn/prefer-response-static-json': ['error'],
        'unicorn/prefer-url-can-parse': ['error'],
        'unicorn/prefer-url-href': ['error'],
        'unicorn/relative-url-style': ['error'],
        'unicorn/require-css-escape': ['error'],
        'unicorn/require-passive-events': ['error'],
      },
    },
  ];
}

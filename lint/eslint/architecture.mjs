// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Architecture (eslint-plugin-boundaries): which folder may import which, for an atomic design system and its
// features. A layer imports only the layers below it: an atom never imports a molecule, only stores reach the
// back end through data-access, and nothing imports a page.
//
//   pages → templates → organisms → molecules → atoms
//     ↓          (stores and data-access are used by pages and stores only)
//   stores → data-access
//   anyone may use utils (pure functions) and models (shared types)

import boundaries from 'eslint-plugin-boundaries';
import { CODE_FILES } from './files.mjs';

/** The layers, by folder name, from the lowest to the highest. */
export const ATOMIC_ELEMENTS = [
  { type: 'util', pattern: '**/utils/*' },
  { type: 'model', pattern: '**/models/*' },
  { type: 'data-access', pattern: '**/data-access/*' },
  { type: 'store', pattern: '**/stores/*' },
  { type: 'atom', pattern: '**/atoms/*' },
  { type: 'molecule', pattern: '**/molecules/*' },
  { type: 'organism', pattern: '**/organisms/*' },
  { type: 'template', pattern: '**/templates/*' },
  { type: 'page', pattern: '**/pages/*' },
];

/**
 * Builds the policy of a layer: what it may import.
 *
 * @param {string} type - The importing layer.
 * @param {string[]} allowed - The layers it may import (utils and models are always allowed).
 * @returns {object} The policy for boundaries/dependencies.
 */
function allow(type, allowed) {
  return {
    from: { element: { type } },
    allow: { to: { element: { types: { anyOf: [type, 'util', 'model', ...allowed] } } } },
  };
}

/**
 * Atomic design and feature layers.
 *
 * @param {string} tsconfigPath - Path of the tsconfig.json used to resolve imports.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function architectureBlock(tsconfigPath) {
  return [
    {
      name: 'architecture',
      files: CODE_FILES,
      plugins: {
        boundaries,
      },
      settings: {
        'boundaries/elements': ATOMIC_ELEMENTS,
        'import/resolver': { typescript: { project: tsconfigPath } },
      },
      rules: {
        'boundaries/dependencies': [
          'error',
          {
            default: 'disallow',
            // Custom: packages are checked too, so that only data-access may reach the back end.
            checkAllOrigins: true,
            policies: [
              // Packages (Angular, NgRx…) are allowed; the last matching policy wins, so the ban below applies.
              { allow: { to: { module: { origin: 'external' } } } },
              { allow: { to: { module: { origin: 'core' } } } },
              allow('util', []),
              allow('model', []),
              allow('data-access', []),
              allow('store', ['data-access']),
              allow('atom', []),
              allow('molecule', ['atom']),
              allow('organism', ['molecule', 'atom']),
              allow('template', ['organism', 'molecule', 'atom']),
              allow('page', ['template', 'organism', 'molecule', 'atom', 'store']),
              {
                // Only data-access talks to the back end.
                from: { element: { type: '!data-access' } },
                // `@angular/common/http` is the package `@angular/common`, path `http`.
                disallow: { to: { module: { origin: 'external', source: '@angular/common', internalPath: 'http' } } },
              },
            ],
          },
        ],
        // Off: files outside the layers (configs, the app shell) import freely.
        'boundaries/no-ignored-dependencies': ['off'],
        // Imports that cannot be resolved are reported by import-x/no-unresolved.
        'boundaries/no-unknown-dependencies': ['off'],
        // Off: files outside the layers are allowed.
        'boundaries/no-unknown-files': ['off'],
        // Deprecated: replaced by boundaries/dependencies.
        'boundaries/element-types': ['off'],
        'boundaries/entry-point': ['off'],
        'boundaries/external': ['off'],
        'boundaries/no-ignored': ['off'],
        'boundaries/no-private': ['off'],
        'boundaries/no-unknown': ['off'],
      },
    },
  ];
}

// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// NgRx signal stores (@ngrx/signals): every rule of @ngrx/eslint-plugin listed; the rules for @ngrx/store,
// effects and component-store are off (use this block with @ngrx/signals only).

import ngrx from '@ngrx/eslint-plugin';

// The plugin is typed with typescript-eslint types, which ESLint's own types reject; it works at runtime.
const ngrxPlugin = /** @type {import('eslint').ESLint.Plugin} */ (/** @type {unknown} */ (ngrx));

/**
 * NgRx signal store rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function ngrxSignalsBlock() {
  return [
    {
      name: 'frameworks/ngrx-signals',
      files: ['**/*.ts'],
      plugins: {
        '@ngrx': ngrxPlugin,
      },
      rules: {
        // Off: @ngrx/component-store only.
        '@ngrx/avoid-combining-component-store-selectors': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/avoid-combining-selectors': ['off'],
        // Off: @ngrx/effects only.
        '@ngrx/avoid-cyclic-effects': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/avoid-dispatching-multiple-actions-sequentially': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/avoid-duplicate-actions-in-reducer': ['off'],
        // Off: @ngrx/component-store only.
        '@ngrx/avoid-mapping-component-store-selectors': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/avoid-mapping-selectors': ['off'],
        '@ngrx/enforce-type-call': ['error'],
        // Off: @ngrx/store only.
        '@ngrx/good-action-hygiene': ['off'],
        // Off: @ngrx/effects only.
        '@ngrx/no-dispatch-in-effects': ['off'],
        // Off: @ngrx/effects only.
        '@ngrx/no-effects-in-providers': ['off'],
        // Off: @ngrx/effects only.
        '@ngrx/no-multiple-actions-in-effects': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/no-multiple-global-stores': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/no-reducer-in-key-names': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/no-store-subscription': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/no-typed-global-store': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/on-function-explicit-return-type': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/prefer-action-creator': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/prefer-action-creator-in-dispatch': ['off'],
        // Off: @ngrx/effects only.
        '@ngrx/prefer-action-creator-in-of-type': ['off'],
        // Off: @ngrx/operators only.
        '@ngrx/prefer-concat-latest-from': ['off'],
        // Off: @ngrx/effects only.
        '@ngrx/prefer-effect-callback-in-block-statement': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/prefer-inline-action-props': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/prefer-one-generic-in-create-for-feature-selector': ['off'],
        // The state is changed through the store methods, never from outside.
        '@ngrx/prefer-protected-state': ['error'],
        // Off: @ngrx/store only.
        '@ngrx/prefer-selector-in-select': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/prefix-selectors-with-select': ['off'],
        // Off: @ngrx/component-store only.
        '@ngrx/require-super-ondestroy': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/select-style': ['off'],
        '@ngrx/signal-state-no-arrays-at-root-level': ['error'],
        '@ngrx/signal-store-feature-should-use-generic-type': ['error'],
        // Off: @ngrx/component-store only.
        '@ngrx/updater-explicit-return-type': ['off'],
        // Off: @ngrx/store only.
        '@ngrx/use-consistent-global-store-name': ['off'],
        // Off: @ngrx/effects only.
        '@ngrx/use-effects-lifecycle-interface': ['off'],
        '@ngrx/with-state-no-arrays-at-root-level': ['error'],
      },
    },
    {
      name: 'frameworks/ngrx-signals/features',
      files: ['**/*store*/**/with*.ts'],
      rules: {
        // Off: the type returned by `signalStoreFeature()` is too complex to write by hand.
        '@typescript-eslint/explicit-function-return-type': ['off'],
      },
    },
  ];
}

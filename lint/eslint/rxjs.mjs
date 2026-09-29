// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// RxJS (eslint-plugin-rxjs-x): leaks, lost errors, nested subscriptions, unsafe operators. For Angular code that
// still uses observables (HttpClient, router events); every rule listed, with type information.

import rxjsX from 'eslint-plugin-rxjs-x';

// The plugin is typed with typescript-eslint types, which ESLint's own types reject; it works at runtime.
const rxjs = /** @type {import('eslint').ESLint.Plugin} */ (/** @type {unknown} */ (rxjsX));

/**
 * RxJS rules, for TypeScript files linted with type information.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function rxjsBlock() {
  return [
    {
      name: 'rxjs',
      files: ['**/*.ts'],
      plugins: {
        'rxjs-x': rxjs,
      },
      rules: {
        // Off: needs a project list of banned observables.
        'rxjs-x/ban-observables': ['off'],
        // Off: needs a project list of banned operators.
        'rxjs-x/ban-operators': ['off'],
        // Off: naming style; neither `$` suffix nor its absence is enforced.
        'rxjs-x/finnish': ['off'],
        // Off: `of` is the standard name.
        'rxjs-x/just': ['off'],
        'rxjs-x/no-async-subscribe': ['error'],
        'rxjs-x/no-connectable': ['error'],
        'rxjs-x/no-create': ['error'],
        // Off: @ngrx/effects only.
        'rxjs-x/no-cyclic-action': ['off'],
        // Off: explicit generics sometimes document the type.
        'rxjs-x/no-explicit-generics': ['off'],
        // Subjects stay private; expose `asObservable()`.
        'rxjs-x/no-exposed-subjects': ['error'],
        // Off: naming style (see finnish).
        'rxjs-x/no-finnish': ['off'],
        'rxjs-x/no-floating-observables': ['error'],
        'rxjs-x/no-ignored-default-value': ['error'],
        'rxjs-x/no-ignored-error': ['error'],
        'rxjs-x/no-ignored-notifier': ['error'],
        'rxjs-x/no-ignored-replay-buffer': ['error'],
        // Custom: an empty `subscribe()` hides that nothing handles the values.
        'rxjs-x/no-ignored-subscribe': ['error'],
        // Off: `takeUntilDestroyed()` makes keeping the subscription useless in Angular.
        'rxjs-x/no-ignored-subscription': ['off'],
        'rxjs-x/no-ignored-takewhile-value': ['error'],
        'rxjs-x/no-implicit-any-catch': ['error'],
        'rxjs-x/no-index': ['error'],
        'rxjs-x/no-internal': ['error'],
        'rxjs-x/no-misused-observables': ['error'],
        'rxjs-x/no-nested-subscribe': ['error'],
        'rxjs-x/no-redundant-notify': ['error'],
        'rxjs-x/no-sharereplay': ['error'],
        'rxjs-x/no-sharereplay-before-takeuntil': ['error'],
        'rxjs-x/no-subclass': ['error'],
        'rxjs-x/no-subject-unsubscribe': ['error'],
        // Custom: `BehaviorSubject.value` reads a state outside the stream; use a signal for a current value.
        'rxjs-x/no-subject-value': ['error'],
        // Off: `subscribe(handler)` is the usual form.
        'rxjs-x/no-subscribe-handlers': ['off'],
        'rxjs-x/no-subscribe-in-pipe': ['error'],
        'rxjs-x/no-topromise': ['error'],
        'rxjs-x/no-unbound-methods': ['error'],
        'rxjs-x/no-unnecessary-collection': ['error'],
        // Custom: `catchError` placed after the effect would end the stream.
        'rxjs-x/no-unsafe-catch': ['error'],
        // Custom: `first()` in an effect-like stream completes it after one value.
        'rxjs-x/no-unsafe-first': ['error'],
        'rxjs-x/no-unsafe-subject-next': ['error'],
        // Off: @ngrx/effects only.
        'rxjs-x/no-unsafe-switchmap': ['off'],
        // Custom: `takeUntilDestroyed` must also be last.
        'rxjs-x/no-unsafe-takeuntil': ['error', { alias: ['takeUntilDestroyed'] }],
        'rxjs-x/prefer-observer': ['error'],
        'rxjs-x/prefer-root-operators': ['error'],
        // Off: naming style.
        'rxjs-x/suffix-subjects': ['off'],
        'rxjs-x/throw-error': ['error'],
      },
    },
  ];
}

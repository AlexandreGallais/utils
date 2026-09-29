import type { CleanupStack } from './cleanup-stack.ts';

/**
 * Creates a stack of cleanups to release at once, in reverse order of creation, like `DisposableStack`:
 * one `dispose` in `ngOnDestroy` or in the cleanup of an effect instead of one field per listener.
 *
 * @returns An empty stack.
 * @example
 * const cleanups = createCleanupStack();
 * cleanups.add(listen(window, 'resize', onResize, {}));
 * cleanups.add(observeResize(host, onHostResize, {}));
 * destroyRef.onDestroy(() => cleanups.dispose());
 */
export function createCleanupStack(): CleanupStack {
  let cleanups: (() => void)[] = [];
  return {
    add(cleanup: () => void): void {
      cleanups.push(cleanup);
    },
    dispose(): void {
      const pending = cleanups.toReversed();
      cleanups = [];
      const errors = pending.map((cleanup) => runCatching(cleanup)).filter((result) => result !== undefined);
      if (errors.length > 0) {
        throw new AggregateError(
          errors.map(({ error }) => error),
          `${errors.length} cleanup(s) failed`,
        );
      }
    },
  };
}

/**
 * Runs a cleanup, returning its error instead of throwing it so that the other cleanups still run.
 *
 * @param cleanup - The cleanup to run.
 * @returns The error thrown, boxed so that a thrown `undefined` is kept; `undefined` on success.
 */
function runCatching(cleanup: () => void): { readonly error: unknown } | undefined {
  try {
    cleanup();
  } catch (error) {
    return { error };
  }
  return undefined;
}

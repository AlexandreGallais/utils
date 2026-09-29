import type { LatestRunner } from './latest-runner.ts';

/**
 * Wraps an async task so that each new call cancels the previous one, like RxJS `switchMap`: a search
 * field querying at each keystroke, a detail panel loading the selected item. The superseded run gets its
 * `AbortSignal` aborted (pass it to `fetch`) and its promise rejects, so a slow old response can never
 * overwrite a newer one.
 *
 * @template TArguments - Arguments of the task.
 * @template TResult - Result of the task.
 * @param task - The async work, called with an `AbortSignal` then the arguments of `run`.
 * @returns A runner with `run` and `cancel`.
 * @example
 * const search = createLatestRunner(async (signal, query: string) => (await fetch(`/api?q=${query}`, { signal })).json());
 * effect(() => {
 *   search.run(query()).then(results.set, () => undefined); // stale runs reject: ignore them
 * });
 */
export function createLatestRunner<TArguments extends unknown[], TResult>(
  task: (signal: AbortSignal, ...taskArguments: TArguments) => Promise<TResult>,
): LatestRunner<TArguments, TResult> {
  let controller: AbortController | undefined;

  function cancel(): void {
    controller?.abort(new DOMException('Superseded by a newer run', 'AbortError'));
    controller = undefined;
  }

  return {
    async run(...taskArguments: TArguments): Promise<TResult> {
      cancel();
      const current = new AbortController();
      controller = current;
      const result = await task(current.signal, ...taskArguments);
      // A task that ignores its signal still resolves: drop its result if it was superseded meanwhile.
      current.signal.throwIfAborted();
      // Not aborted: no newer run started, this run is the current one.
      controller = undefined;
      return result;
    },
    cancel,
  };
}

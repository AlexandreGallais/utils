/** `scheduler.yield()` (Chromium 129+), when the runtime has it. */
interface YieldingScheduler {
  yield(): Promise<void>;
}

/**
 * Gives the main thread back to the browser for a moment, so it can render and handle input, then resumes.
 * Await it between slices of a long task. Uses `scheduler.yield()` when available (the continuation keeps
 * its priority), a `setTimeout(0)` otherwise.
 *
 * @returns A promise resolved once the browser had a chance to run other tasks.
 * @example
 * for (const [index, row] of rows.entries()) {
 *   render(row);
 *   if (index % 100 === 99) {
 *     await yieldToMain();
 *   }
 * }
 */
export async function yieldToMain(): Promise<void> {
  const scheduler: unknown = Reflect.get(globalThis, 'scheduler');
  if (hasYield(scheduler)) {
    return scheduler.yield();
  }
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
}

/**
 * Checks whether a value is a scheduler with a `yield` method.
 *
 * @param scheduler - The global `scheduler`, if any.
 * @returns `true` when `scheduler.yield` is a function.
 */
function hasYield(scheduler: unknown): scheduler is YieldingScheduler {
  return typeof scheduler === 'object' && scheduler !== null && typeof Reflect.get(scheduler, 'yield') === 'function';
}

/**
 * A list of cleanups run together, created by `createCleanupStack`: listeners, observers, timers and
 * subscriptions set up by one component or effect.
 */
export interface CleanupStack {
  /**
   * Registers a cleanup.
   *
   * @param cleanup - A function releasing a resource, such as the result of `listen`.
   */
  add(cleanup: () => void): void;

  /**
   * Runs every registered cleanup, the last added first, and empties the stack, which can be filled again.
   *
   * @throws {AggregateError} When cleanups threw: every cleanup still ran.
   */
  dispose(): void;
}

/**
 * Runs an async task where only the latest call counts, created by `createLatestRunner`.
 *
 * @template TArguments - Arguments of the task.
 * @template TResult - Result of the task.
 */
export interface LatestRunner<TArguments extends unknown[], TResult> {
  /**
   * Starts the task, cancelling the previous run if it is still pending.
   *
   * @param taskArguments - Arguments passed to the task after the signal.
   * @returns The result of this run.
   * @rejects {DOMException} An `AbortError` when a newer run or `cancel` supersedes this one.
   */
  run(...taskArguments: TArguments): Promise<TResult>;

  /** Cancels the pending run, if any: its promise rejects with an `AbortError`. */
  cancel(): void;
}

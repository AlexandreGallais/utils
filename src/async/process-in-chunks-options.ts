/** A function returning the current time, in milliseconds. */
type TimeSource = () => number;

/** Settings of `processInChunks`: slice duration, cancellation and time source. */
export interface ProcessInChunksOptions {
  /** Time spent processing before giving the main thread back, in milliseconds (half a 60 Hz frame by default). */
  readonly budgetMs?: number;
  /** Cancels the processing between two items. */
  readonly signal?: AbortSignal;
  /** Time source, `performance.now` by default; replace it in tests. */
  readonly now?: TimeSource;
}

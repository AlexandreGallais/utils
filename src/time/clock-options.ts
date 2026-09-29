/** A function returning the current time, in milliseconds. */
type TimeSource = () => number;

/** Settings of a `Clock`: tick source, period and time source. */
export interface ClockOptions {
  /**
   * Tick source: `'frame'` ticks once per animation frame (`requestAnimationFrame`, for rendering),
   * `'interval'` every `intervalMs` (`setInterval`, for logic, also in the background).
   */
  readonly mode?: 'frame' | 'interval';
  /** Period of the `'interval'` mode, in milliseconds. */
  readonly intervalMs?: number;
  /** Time source, `performance.now` by default; replace it in tests. */
  readonly now?: TimeSource;
}

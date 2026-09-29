/** One tick of a `Clock`, shared by every subscriber of that tick. */
export interface ClockTick {
  /** Real time of the tick (`performance.now()` by default): pass it to `isBlinkOn` for synchronized blinking. */
  readonly timestamp: number;
  /** Simulated time since the previous tick: the real delta times `timeScale`, `0` while paused. */
  readonly deltaMs: number;
  /** Simulated time since the clock first started: the sum of the `deltaMs`. */
  readonly elapsedMs: number;
  /** Number of ticks since the clock first started, from 1. */
  readonly frame: number;
}

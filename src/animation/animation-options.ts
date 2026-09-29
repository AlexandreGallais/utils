import type { ClockTick } from '../time/clock-tick.ts';
import type { EasingFunction } from './easing-function.ts';

/** Called at each frame of an animation. */
type FrameCallback = (progress: number, elapsedMs: number, tick: ClockTick) => void;

/** Called when an animation ends. */
type CompleteCallback = () => void;

/** Duration, curve and callbacks of `startAnimation`. */
export interface AnimationOptions {
  /** Length of the animation in milliseconds of simulated time; `Infinity` for an endless animation. */
  readonly durationMs: number;
  /** Curve applied to the progress; `linear` when omitted. */
  readonly easing?: EasingFunction;
  /** Called at each tick with the eased progress (0 to 1), the elapsed time and the tick. */
  readonly onFrame: FrameCallback;
  /** Called once when the animation reaches its end (not when it is stopped before). */
  readonly onComplete?: CompleteCallback;
}

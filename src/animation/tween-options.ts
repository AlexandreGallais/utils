import type { EasingFunction } from './easing-function.ts';

/** Receives the animated value. */
type ValueCallback = (value: number) => void;

/** Called when the tween ends. */
type CompleteCallback = () => void;

/** Values, duration, curve and callbacks of `startTween`. */
export interface TweenOptions {
  /** Value at the start. */
  readonly from: number;
  /** Value at the end. */
  readonly to: number;
  /** Length of the tween in milliseconds of simulated time. */
  readonly durationMs: number;
  /** Curve of the movement; `easeOutQuad` when omitted. */
  readonly easing?: EasingFunction;
  /** Called at each tick with the current value. */
  readonly onUpdate: ValueCallback;
  /** Called once when the value reaches `to`. */
  readonly onComplete?: CompleteCallback;
}

import { lerp } from '../math';
import type { TickSource } from '../time';
import { easeOutQuad } from './ease-out-quad';
import { startAnimation } from './start-animation';
import type { EasingFunction } from './easing-function';

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
  readonly easing?: EasingFunction | null;
  /** Called at each tick with the current value. */
  readonly onUpdate: ValueCallback;
  /** Called once when the value reaches `to`. */
  readonly onComplete?: CompleteCallback | null;
}

/**
 * Animates a number from one value to another on a shared clock: a position, an opacity, a needle angle.
 * The movement eases out by default, like most UI transitions; the last update gives exactly `to`.
 *
 * @param clock - The tick source, such as the application's `Clock`.
 * @param options - Start and end values, duration, easing curve and callbacks.
 * @returns A function that stops the tween where it is.
 * @example
 * startTween(clock, {
 *   from: 0,
 *   to: 120,
 *   durationMs: 300,
 *   onUpdate: (x) => symbol.setAttribute('transform', `translate(${x} 0)`),
 * });
 */
export function startTween(clock: TickSource, options: TweenOptions): () => void {
  const { from, to, durationMs, onUpdate, onComplete } = options;
  const easing = options.easing ?? easeOutQuad;
  return startAnimation(clock, {
    durationMs,
    easing,
    onFrame: (progress) => {
      onUpdate(progress >= 1 ? to : lerp(from, to, progress));
    },
    ...(onComplete && { onComplete }),
  });
}

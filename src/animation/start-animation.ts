import type { ClockTick, TickSource } from '../time';
import { linear } from './linear';
import type { EasingFunction } from './easing-function';

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

/**
 * Runs an animation on a shared clock: `onFrame` receives the eased progress and the elapsed time at every
 * tick, until the duration is reached. Time is the clock's simulated time, so pausing or scaling the clock
 * pauses or speeds up every animation with it. The first frame, at progress 0, comes with the next tick.
 *
 * @param clock - The tick source, such as the application's `Clock`.
 * @param options - Duration, easing curve and callbacks.
 * @returns A function that stops the animation where it is (`onComplete` is then not called).
 * @example
 * const stop = startAnimation(clock, {
 *   durationMs: 400,
 *   easing: easeOutCubic,
 *   onFrame: (progress) => {
 *     panel.style.opacity = String(progress);
 *   },
 * });
 */
export function startAnimation(clock: TickSource, options: AnimationOptions): () => void {
  const { durationMs, easing = linear, onFrame, onComplete } = options;
  let elapsedMs = 0;
  let isRunning = true;
  const unsubscribe = clock.subscribe((tick: ClockTick) => {
    elapsedMs = Math.min(elapsedMs + tick.deltaMs, durationMs);
    const isFinished = elapsedMs >= durationMs;
    const progress = Number.isFinite(durationMs) && durationMs > 0 ? elapsedMs / durationMs : Number(isFinished);
    onFrame(easing(progress), elapsedMs, tick);
    if (!isFinished) {
      return;
    }

    stop();
    onComplete?.();
  });
  function stop(): void {
    if (!isRunning) {
      return;
    }

    isRunning = false;
    unsubscribe();
  }
  return stop;
}

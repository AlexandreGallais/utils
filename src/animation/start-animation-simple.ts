import type { TickSource } from '../time';
import { startAnimation } from './start-animation';

/**
 * Runs a callback at each tick of a clock with the progress of an animation, like `startAnimation`.
 *
 * @param clock - The tick source, such as a `Clock`.
 * @param durationMs - Length of the animation, in milliseconds.
 * @param onFrame - Called at each tick with the progress, from 0 to 1.
 * @returns A function that stops the animation.
 * @simple Linear progress, no completion callback.
 * @example
 * startAnimationSimple(clock, 500, (progress) => bar.setAttribute('width', String(progress * 100)));
 */
export function startAnimationSimple(
  clock: TickSource,
  durationMs: number,
  onFrame: (progress: number) => void,
): () => void {
  return startAnimation(clock, { durationMs, onFrame });
}

import { getSyncedAnimationDelay } from './get-synced-animation-delay';

/**
 * Computes the negative CSS `animation-delay` that puts an animation in phase with the others, like `getSyncedAnimationDelay`.
 *
 * @param periodMs - Duration of one cycle of the animation, in milliseconds.
 * @returns The delay, in milliseconds, in ]-periodMs, 0].
 * @simple `performance.now()` as the clock.
 * @example
 * element.style.animationDelay = `${getSyncedAnimationDelaySimple(1000)}ms`;
 */
export function getSyncedAnimationDelaySimple(periodMs: number): number {
  return getSyncedAnimationDelay(periodMs, performance.now());
}

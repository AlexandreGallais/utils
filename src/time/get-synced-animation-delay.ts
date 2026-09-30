import { getAnimationPhase } from './get-animation-phase';

/**
 * Computes the negative `animation-delay` that puts a CSS animation in phase with every other one of the
 * same period, whenever it starts. CSS animations run on the document timeline (the origin of
 * `performance.now()`): a delay of minus the time elapsed in the current cycle makes an element that appears
 * later blink together with the ones already on screen.
 *
 * @param periodMs - Duration of the CSS animation, in milliseconds; a positive number.
 * @param nowMs - Current time on the document timeline, in milliseconds.
 * @returns The delay in milliseconds, in ]-periodMs, 0].
 * @throws {RangeError} When `periodMs` is not a positive finite number.
 * @example
 * // .alarm { animation: blink 1s steps(1) infinite; }
 * alarm.style.animationDelay = `${getSyncedAnimationDelay(1000, performance.now())}ms`;
 */
export function getSyncedAnimationDelay(periodMs: number, nowMs: number): number {
  // `0 -` turns a `-0` into `0`.
  return 0 - getAnimationPhase(nowMs, periodMs) * periodMs;
}

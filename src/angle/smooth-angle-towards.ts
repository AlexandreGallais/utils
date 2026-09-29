import { smoothTowards } from '../math/smooth-towards.ts';
import { angleDifference } from './angle-difference.ts';
import { normalizeAngle } from './normalize-angle.ts';

/**
 * Smooths an angle towards a target like `smoothTowards`, but along the shortest way around the circle: a
 * compass needle going from 350° to 10° turns 20° through north instead of 340° backwards. Frame-rate
 * independent.
 *
 * @param current - The displayed angle, in degrees.
 * @param target - The measured angle, in degrees.
 * @param deltaMs - Time since the previous update.
 * @param timeConstantMs - Smoothing time: ~63 % of the gap is covered after this delay; `0` jumps to the
 * target.
 * @returns The new angle, in [0, 360[.
 * @example
 * needle = smoothAngleTowards(needle, heading, tick.deltaMs, 200);
 * smoothAngleTowards(350, 10, 100, 0); // 10
 */
export function smoothAngleTowards(current: number, target: number, deltaMs: number, timeConstantMs: number): number {
  return normalizeAngle(current + smoothTowards(0, angleDifference(current, target), deltaMs, timeConstantMs));
}

import { wrap } from '../math';

/** A full turn, in degrees. */
const FULL_TURN = 360;

/**
 * Brings an angle into [0, 360[ degrees, like a compass heading.
 *
 * @param degrees - Angle in degrees, of any sign and magnitude.
 * @returns The equivalent angle in [0, 360[.
 * @example
 * normalizeAngle(-90); // 270
 * normalizeAngle(720); // 0
 */
export function normalizeAngle(degrees: number): number {
  return wrap(degrees, 0, FULL_TURN);
}

import { wrap } from '../math';

/** Half a turn, in degrees: the unit conversion factor between degrees and π radians. */
const HALF_TURN = 180;

/**
 * Computes the shortest signed rotation from one angle to another, in [-180, 180[ degrees.
 * A positive result means an increasing angle (clockwise for a heading).
 *
 * @param from - Starting angle, in degrees (any value, not necessarily normalized). Defaults to `0`.
 * @param to - Target angle, in degrees (any value, not necessarily normalized). Defaults to `0`.
 * @returns The rotation to apply to `from` to reach `to` by the shortest path, in degrees.
 * @example
 * angleDifference(350, 10); // 20, not -340
 * angleDifference(10, 350); // -20
 */
export function angleDifference(from?: number | null, to?: number | null): number {
  const resolvedFrom = from ?? 0;
  const resolvedTo = to ?? 0;
  return wrap(resolvedTo - resolvedFrom, -HALF_TURN, HALF_TURN);
}

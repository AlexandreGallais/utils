import { normalizeAngle } from './normalize-angle.ts';

/** Half a turn, in degrees. */
const HALF_TURN = 180;
/** Degrees per radian. */
const DEGREES_PER_RADIAN = HALF_TURN / Math.PI;
/** Shortest resultant, relative to the number of angles, below which the angles cancel each other out. */
const MIN_RESULTANT = 1e-9;

/**
 * Averages angles on the circle (circular mean): the mean of 350° and 10° is 0°, not 180°. Averages
 * wind directions or noisy headings, where `mean` fails across north.
 *
 * @param angles - The angles, in degrees.
 * @returns The mean angle, in [0, 360[; `NaN` for an empty list or angles that cancel out (0° and 180°).
 * @example
 * meanAngle([350, 10]); // 0
 * meanAngle([80, 90, 100]); // 90
 */
export function meanAngle(angles: Iterable<number>): number {
  let sumSin = 0;
  let sumCos = 0;
  let count = 0;
  for (const angle of angles) {
    const radians = angle / DEGREES_PER_RADIAN;
    sumSin += Math.sin(radians);
    sumCos += Math.cos(radians);
    count += 1;
  }
  return count === 0 || Math.hypot(sumSin, sumCos) <= MIN_RESULTANT * count
    ? NaN
    : normalizeAngle(Math.atan2(sumSin, sumCos) * DEGREES_PER_RADIAN);
}

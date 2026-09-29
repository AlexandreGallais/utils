/** Half a turn, in degrees: the unit conversion factor between degrees and π radians. */
const HALF_TURN = 180;

// Multiplying by a precomputed factor is cheaper than dividing at each call.
const RADIANS_TO_DEGREES = HALF_TURN / Math.PI;

/**
 * Converts an angle from radians to degrees.
 *
 * @param radians - Angle in radians.
 * @returns The same angle in degrees.
 * @example
 * radiansToDegrees(Math.PI / 2); // 90
 */
export function radiansToDegrees(radians: number): number {
  return radians * RADIANS_TO_DEGREES;
}

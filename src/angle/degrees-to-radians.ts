/** Half a turn, in degrees: the unit conversion factor between degrees and π radians. */
const HALF_TURN = 180;

// Multiplying by a precomputed factor is cheaper than dividing at each call.
const DEGREES_TO_RADIANS = Math.PI / HALF_TURN;

/**
 * Converts an angle from degrees to radians.
 *
 * @param degrees - Angle in degrees.
 * @returns The same angle in radians.
 * @example
 * degreesToRadians(180); // Math.PI
 */
export function degreesToRadians(degrees: number): number {
  return degrees * DEGREES_TO_RADIANS;
}

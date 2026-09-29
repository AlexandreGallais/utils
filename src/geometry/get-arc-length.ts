/** Half a turn, in degrees. */
const HALF_TURN = 180;

/**
 * Computes the length of a circular arc, such as the `stroke-dasharray` of a round gauge track drawn with
 * `createArcPath`.
 *
 * @param radius - Distance from the center to the arc, in user units.
 * @param startAngle - Angle where the arc starts, in degrees.
 * @param endAngle - Angle where the arc ends, in degrees.
 * @returns The length along the arc, always positive.
 * @example
 * getArcLength(40, -135, 135); // 188.49… (three quarters of a turn)
 */
export function getArcLength(radius: number, startAngle: number, endAngle: number): number {
  return (Math.abs(endAngle - startAngle) * Math.PI * radius) / HALF_TURN;
}

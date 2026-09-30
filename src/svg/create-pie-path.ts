import type { Point } from '../geometry';
import { createArcPath } from './create-arc-path';
import { createCirclePath } from './create-circle-path';
import { formatCoordinate } from './internal';

/** A full turn, in degrees. */
const FULL_TURN = 360;

/**
 * Builds the `d` attribute of a pie slice (a "camembert" portion) joined to the center: a pie chart part, a
 * sweep sector of a radar, a remaining-time disk. Angles follow the library convention (0° up, clockwise);
 * a sweep of 360° or more gives the full disk.
 *
 * @param center - The point every slice joins, in user units.
 * @param radius - Distance from the center to the outer arc, in user units.
 * @param startAngle - Angle where the slice starts, in degrees.
 * @param endAngle - Angle where the slice ends, in degrees.
 * @returns The closed path data; `''` for an empty slice.
 * @example
 * createPiePath({ x: 50, y: 50 }, 40, 0, 90); // quarter from 12 o'clock to 3 o'clock
 * createPiePath({ x: 50, y: 50 }, 40, 0, 360); // full disk
 */
export function createPiePath(center: Point, radius: number, startAngle: number, endAngle: number): string {
  const sweep = Math.abs(endAngle - startAngle);
  if (sweep >= FULL_TURN) {
    return createCirclePath(center, radius);
  }
  if (sweep === 0) {
    return '';
  }
  // The arc starts with `M x y`: move to the center first, then draw a line to the start of the arc.
  const arc = createArcPath(center, radius, startAngle, endAngle).replace(/^M /v, 'L ');
  return `M ${formatCoordinate(center.x)} ${formatCoordinate(center.y)} ${arc} Z`;
}

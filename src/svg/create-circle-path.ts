import type { Point } from '../geometry';
import { createArcPath } from './create-arc-path';

/** A full turn, in degrees. */
const FULL_TURN = 360;

/**
 * Builds the `d` attribute of a circle, for shapes that must be a `<path>` (a symbol made of paths only, a
 * path morphed by an animation, a clip path).
 *
 * @param center - The middle point, in user units.
 * @param radius - Distance from the center to the outline, in user units.
 * @returns The closed path data, drawn clockwise from the top.
 * @example
 * createCirclePath({ x: 10, y: 10 }, 5); // 'M 10 5 A 5 5 0 1 1 10 15 A 5 5 0 1 1 10 5 Z'
 */
export function createCirclePath(center: Point, radius: number): string {
  return `${createArcPath(center, radius, 0, FULL_TURN)} Z`;
}

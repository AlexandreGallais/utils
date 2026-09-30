import type { Point } from '../geometry';
import { createArcPath } from './create-arc-path';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/** A full turn, in degrees. */
const FULL_TURN = 360;

/**
 * Builds the `d` attribute of a circle, for shapes that must be a `<path>` (a symbol made of paths only, a
 * path morphed by an animation, a clip path).
 *
 * @param center - The middle point, in user units. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param radius - Distance from the center to the outline, in user units. Defaults to `0`.
 * @returns The closed path data, drawn clockwise from the top.
 * @example
 * createCirclePath({ x: 10, y: 10 }, 5); // 'M 10 5 A 5 5 0 1 1 10 15 A 5 5 0 1 1 10 5 Z'
 */
export function createCirclePath(center?: Point | null, radius?: number | null): string {
  const resolvedCenter = center ?? ORIGIN;
  const resolvedRadius = radius ?? 0;
  return `${createArcPath(resolvedCenter, resolvedRadius, 0, FULL_TURN)} Z`;
}

import type { Point } from '../geometry';
import { createRegularPolygonPoints } from './create-regular-polygon-points';

/**
 * Computes the vertices of a regular polygon like `createRegularPolygonPoints`, the first vertex pointing up.
 *
 * @param center - The middle point, in user units.
 * @param radius - Distance from the center to each vertex.
 * @param sides - Number of sides.
 * @returns The vertices, clockwise.
 * @throws {RangeError} When `sides` is not an integer of at least 3.
 * @simple No rotation: the first vertex points up.
 * @example
 * triangle.setAttribute('points', formatPoints(createRegularPolygonPointsSimple({ x: 10, y: 10 }, 8, 3)));
 */
export function createRegularPolygonPointsSimple(center: Point, radius: number, sides: number): Point[] {
  return createRegularPolygonPoints(center, radius, sides, 0);
}

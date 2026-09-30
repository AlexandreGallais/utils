import { polarToCartesian } from '../geometry';
import type { Point } from '../geometry';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

const FULL_TURN = 360;
const MIN_SIDES = 3;

/**
 * Computes the vertices of a regular polygon: a triangle pointer, a diamond marker, a hexagon symbol. The
 * first vertex is at `rotation` (library convention: 0° up, clockwise), the others follow clockwise.
 *
 * @param center - Point the shape is drawn around. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param radius - Distance from the center to each vertex.
 * @param sides - Number of sides, an integer of at least 3.
 * @param rotation - Angle of the first vertex, in degrees. Defaults to `0`.
 * @returns The vertices; pass them to `formatPoints` or `createPolylinePath(points, true)`.
 * @throws {RangeError} When `sides` is not an integer of at least 3.
 * @example
 * // triangle pointing down, for a marker above a bar
 * marker.setAttribute('points', formatPoints(createRegularPolygonPoints({ x: 10, y: 10 }, 6, 3, 180)));
 */
export function createRegularPolygonPoints(
  center: Point | null | undefined,
  radius: number,
  sides: number,
  rotation?: number | null,
): Point[] {
  const resolvedCenter = center ?? ORIGIN;
  const resolvedRotation = rotation ?? 0;
  if (!Number.isSafeInteger(sides) || sides < MIN_SIDES) {
    throw new RangeError(`sides must be an integer of at least ${MIN_SIDES}, got ${sides}`);
  }
  const angleStep = FULL_TURN / sides;
  return Array.from({ length: sides }, (_, index) =>
    polarToCartesian(resolvedCenter, radius, resolvedRotation + index * angleStep),
  );
}

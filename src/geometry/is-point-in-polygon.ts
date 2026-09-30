import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Checks whether a point is inside a polygon (even-odd ray casting), to hit-test a clicked zone of a
 * synoptic, a sector or any irregular shape. Works for concave polygons; for a self-intersecting one,
 * overlapping parts count as outside, like the SVG `fill-rule="evenodd"`.
 *
 * @param point - The tested position, in the coordinates of the polygon. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param vertices - The corners of the polygon, in order, without repeating the first one at the end. Defaults to `[]`.
 * @returns `true` inside; for a point exactly on an edge, the result depends on the edge.
 * @example
 * isPointInPolygon({ x: 5, y: 5 }, [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]); // true
 */
export function isPointInPolygon(point?: Point | null, vertices?: readonly Point[] | null): boolean {
  const resolvedPoint = point ?? ORIGIN;
  const resolvedVertices = vertices ?? [];
  const [last] = resolvedVertices.slice(-1);
  if (last === undefined) {
    return false;
  }
  let isInside = false;
  let previous = last;
  // Each edge crossing the horizontal line of the point on its right flips inside and outside.
  for (const current of resolvedVertices) {
    if (current.y > resolvedPoint.y !== previous.y > resolvedPoint.y) {
      const crossingX =
        current.x + ((resolvedPoint.y - current.y) * (previous.x - current.x)) / (previous.y - current.y);
      if (resolvedPoint.x < crossingX) {
        isInside = !isInside;
      }
    }
    previous = current;
  }
  return isInside;
}

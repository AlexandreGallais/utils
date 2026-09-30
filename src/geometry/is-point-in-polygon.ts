import type { Point } from './point';

/**
 * Checks whether a point is inside a polygon (even-odd ray casting), to hit-test a clicked zone of a
 * synoptic, a sector or any irregular shape. Works for concave polygons; for a self-intersecting one,
 * overlapping parts count as outside, like the SVG `fill-rule="evenodd"`.
 *
 * @param point - The tested position, in the coordinates of the polygon.
 * @param vertices - The corners of the polygon, in order, without repeating the first one at the end.
 * @returns `true` inside; for a point exactly on an edge, the result depends on the edge.
 * @example
 * isPointInPolygon({ x: 5, y: 5 }, [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]); // true
 */
export function isPointInPolygon(point: Point, vertices: readonly Point[]): boolean {
  const [last] = vertices.slice(-1);
  if (last === undefined) {
    return false;
  }
  let isInside = false;
  let previous = last;
  // Each edge crossing the horizontal line of the point on its right flips inside and outside.
  for (const current of vertices) {
    if (current.y > point.y !== previous.y > point.y) {
      const crossingX = current.x + ((point.y - current.y) * (previous.x - current.x)) / (previous.y - current.y);
      if (point.x < crossingX) {
        isInside = !isInside;
      }
    }
    previous = current;
  }
  return isInside;
}

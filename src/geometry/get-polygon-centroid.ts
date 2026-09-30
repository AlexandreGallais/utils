import type { Point } from './point';

/** `6·A = 3·(2·A)`: the factor between the doubled area and the denominator of the centroid. */
const CENTROID_FACTOR = 3;

/**
 * Computes the center of mass of a simple polygon, where to put the label of a zone or the handle of a
 * shape. For a convex polygon it is inside; for a concave one it may fall outside.
 *
 * @param vertices - The corners, in order, without repeating the first one at the end. Defaults to `[]`.
 * @returns The centroid; the average of the vertices when the polygon has no area (a segment, a point);
 * `undefined` without vertex.
 * @example
 * getPolygonCentroid([{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 0, y: 6 }]); // { x: 2, y: 2 }
 */
export function getPolygonCentroid(vertices?: readonly Point[] | null): Point | undefined {
  const resolvedVertices = vertices ?? [];
  const [last] = resolvedVertices.slice(-1);
  if (last === undefined) {
    return undefined;
  }
  let previous = last;
  let doubleArea = 0;
  let sumX = 0;
  let sumY = 0;
  let averageX = 0;
  let averageY = 0;
  for (const current of resolvedVertices) {
    const cross = previous.x * current.y - current.x * previous.y;
    doubleArea += cross;
    sumX += (previous.x + current.x) * cross;
    sumY += (previous.y + current.y) * cross;
    averageX += current.x / resolvedVertices.length;
    averageY += current.y / resolvedVertices.length;
    previous = current;
  }
  // The centroid is Σ(xᵢ + xᵢ₊₁)·crossᵢ / (6·A), with 2·A = Σ crossᵢ.
  return doubleArea === 0
    ? { x: averageX, y: averageY }
    : { x: sumX / (CENTROID_FACTOR * doubleArea), y: sumY / (CENTROID_FACTOR * doubleArea) };
}

import type { Point } from './point';

/**
 * Computes the area of a simple polygon (shoelace formula): the surface of a zone of a synoptic, a tank
 * cross-section, a coverage sector.
 *
 * @param vertices - The corners, in order, without repeating the first one at the end.
 * @returns The area, always positive; `0` below three vertices.
 * @example
 * getPolygonArea([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }]); // 6
 */
export function getPolygonArea(vertices: readonly Point[]): number {
  const [last] = vertices.slice(-1);
  if (last === undefined) {
    return 0;
  }
  let previous = last;
  let doubleArea = 0;
  for (const current of vertices) {
    doubleArea += previous.x * current.y - current.x * previous.y;
    previous = current;
  }
  return Math.abs(doubleArea) / 2;
}

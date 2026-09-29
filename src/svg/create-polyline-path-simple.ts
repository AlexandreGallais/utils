import type { Point } from '../geometry/point.ts';
import { createPolylinePath } from './create-polyline-path.ts';

/**
 * Builds the `d` attribute of an open broken line like `createPolylinePath`.
 *
 * @param points - The vertices, in drawing order.
 * @returns The path data; `''` without point.
 * @simple Open line (not closed).
 * @example
 * createPolylinePathSimple([{ x: 0, y: 10 }, { x: 5, y: 0 }]); // 'M 0 10 L 5 0'
 */
export function createPolylinePathSimple(points: Iterable<Point>): string {
  return createPolylinePath(points, false);
}

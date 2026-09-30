import type { Point } from '../geometry';
import { createSmoothPath } from './create-smooth-path';

/**
 * Builds the `d` attribute of a smooth curve through points like `createSmoothPath`.
 *
 * @param points - The points the curve goes through, in order.
 * @returns The path data; `''` without point.
 * @simple Tension of 1 (a standard Catmull-Rom curve).
 * @example
 * curve.setAttribute('d', createSmoothPathSimple(points));
 */
export function createSmoothPathSimple(points: readonly Point[]): string {
  return createSmoothPath(points, 1);
}

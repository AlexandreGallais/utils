import type { Point } from '../geometry/point.ts';
import { createStepPath } from './create-step-path.ts';

/**
 * Builds the `d` attribute of a staircase line like `createStepPath`, each value held until the next point.
 *
 * @param points - The vertices, sorted by ascending `x`.
 * @returns The path data; `''` without point.
 * @simple Step after each point (a sampled state).
 * @example
 * createStepPathSimple([{ x: 0, y: 10 }, { x: 5, y: 0 }]); // 'M 0 10 H 5 V 0'
 */
export function createStepPathSimple(points: Iterable<Point>): string {
  return createStepPath(points, 'after');
}

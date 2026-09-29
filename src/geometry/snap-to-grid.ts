import { roundToStep } from '../math/round-to-step.ts';
import type { Point } from './point.ts';

/**
 * Moves a point to the nearest intersection of a grid, to align shapes dragged in an editor or a synoptic,
 * without floating-point noise (`0.30000000000000004`).
 *
 * @param point - The free position.
 * @param gridSize - Spacing of the grid lines, strictly positive.
 * @param origin - A grid intersection, when the grid does not go through `(0, 0)`.
 * @returns The snapped position.
 * @throws {RangeError} When `gridSize` is not a positive finite number.
 * @example
 * snapToGrid({ x: 23, y: 38 }, 10, { x: 0, y: 0 }); // { x: 20, y: 40 }
 * snapToGrid({ x: 23, y: 38 }, 10, { x: 5, y: 5 }); // { x: 25, y: 35 }
 */
export function snapToGrid(point: Point, gridSize: number, origin: Point): Point {
  if (!Number.isFinite(gridSize) || gridSize <= 0) {
    throw new RangeError(`gridSize must be a positive finite number, got ${gridSize}`);
  }
  const { x: originX, y: originY } = origin;
  return {
    x: roundToStep(point.x - originX, gridSize) + originX,
    y: roundToStep(point.y - originY, gridSize) + originY,
  };
}

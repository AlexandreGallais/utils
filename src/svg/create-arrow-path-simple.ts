import type { Point } from '../geometry/point.ts';
import { createArrowPath } from './create-arrow-path.ts';

/**
 * Builds the `d` attribute of an arrow like `createArrowPath`, with a head as wide as it is long.
 *
 * @param from - Tail of the arrow.
 * @param to - Tip of the arrow.
 * @param headLength - Length and width of the head.
 * @returns The path data; `''` for an arrow of zero length.
 * @simple Head width equal to its length.
 * @example
 * createArrowPathSimple({ x: 0, y: 0 }, { x: 10, y: 0 }, 4); // 'M 0 0 L 6 0 M 6 -2 L 10 0 L 6 2 Z'
 */
export function createArrowPathSimple(from: Point, to: Point, headLength: number): string {
  return createArrowPath(from, to, headLength, headLength);
}

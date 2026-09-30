import type { Anchor } from './anchor';
import type { Point } from './point';
import type { Rect } from './rect';

/** Middle of a side. */
const MIDDLE = 0.5;

/** Position of each anchor along each axis: 0 at the left or top, 0.5 in the middle, 1 at the right or bottom. */
const ANCHOR_FACTORS: Readonly<Record<Anchor, readonly [x: number, y: number]>> = {
  'top-left': [0, 0],
  top: [MIDDLE, 0],
  'top-right': [1, 0],
  left: [0, MIDDLE],
  center: [MIDDLE, MIDDLE],
  right: [1, MIDDLE],
  'bottom-left': [0, 1],
  bottom: [MIDDLE, 1],
  'bottom-right': [1, 1],
};

/**
 * Finds a reference point of a box: a corner, the middle of a side or the center.
 *
 * @param rect - The box.
 * @param anchor - Which point, such as `'top-right'` or `'center'`. Defaults to `'center'`.
 * @returns The coordinates of that point.
 * @example
 * getAnchorPoint({ x: 10, y: 20, width: 100, height: 50 }, 'top-right'); // { x: 110, y: 20 }
 * getAnchorPoint({ x: 10, y: 20, width: 100, height: 50 }, 'bottom'); // { x: 60, y: 70 }
 */
export function getAnchorPoint(rect: Rect, anchor?: Anchor | null): Point {
  const resolvedAnchor = anchor ?? 'center';
  const [factorX, factorY] = ANCHOR_FACTORS[resolvedAnchor];
  return { x: rect.x + rect.width * factorX, y: rect.y + rect.height * factorY };
}

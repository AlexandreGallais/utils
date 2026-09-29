import { getMatrixRotation } from '../../geometry/get-matrix-rotation.ts';
import { isMatrixFlipped } from '../../geometry/is-matrix-flipped.ts';
import { transformRect } from '../../geometry/transform-rect.ts';
import { createFakeSvgElementIn } from './fake-svg-element.ts';
import type { FakeSvgElementInGroup } from './fake-svg-element.ts';

/** A parent group that is moved, rotated by 30°, scaled by 2 and mirrored: the worst case for visual helpers. */
const TWISTED_PARENT = { a: 1.7320508075688772, b: 1, c: 0.5, d: -0.8660254037844386, e: 50, f: 20 };

/**
 * Creates a 20 × 10 fake element in the twisted parent.
 *
 * @param transform - Its `transform` attribute.
 * @returns The fake element.
 */
export function createTwistedElement(transform: string): FakeSvgElementInGroup {
  return createFakeSvgElementIn(TWISTED_PARENT, transform, { x: 0, y: 0, width: 20, height: 10 });
}

/**
 * Rounds to 2 decimals, far below a pixel but above the rounding of the 6-decimal `transform` attribute.
 *
 * @param value - A screen measure.
 * @returns The rounded value, without `-0`.
 */
function round(value: number): number {
  return Math.round(value * 100) / 100 + 0;
}

/**
 * Tells whether two screen points are the same within a thousandth of a pixel.
 *
 * @param a - A first point.
 * @param b - A second point.
 * @returns `true` when they coincide.
 */
export function isSamePoint(a: { x: number; y: number }, b: { x: number; y: number }): boolean {
  return Math.hypot(a.x - b.x, a.y - b.y) < 1e-3;
}

/**
 * Describes how a fake element looks on screen, rounded to hide float noise.
 *
 * @param element - The fake element.
 * @returns Its screen box, screen rotation and mirroring.
 */
export function describeOnScreen(element: FakeSvgElementInGroup): {
  center: { x: number; y: number };
  width: number;
  height: number;
  rotation: number;
  isFlipped: boolean;
} {
  const matrix = element.getScreenCTM();
  const box = transformRect(element.getBBox(), matrix);
  return {
    center: { x: round(box.x + box.width / 2), y: round(box.y + box.height / 2) },
    width: round(box.width),
    height: round(box.height),
    rotation: round(getMatrixRotation(matrix)) % 360,
    isFlipped: isMatrixFlipped(matrix),
  };
}

import { scaleRect } from './scale-rect.ts';
import type { Rect } from './rect.ts';

/**
 * Scales a rectangle like `scaleRect`, uniformly around its center: a bar that shrinks with a value.
 *
 * @param rect - The rectangle to scale.
 * @param scale - The factor: 0.5 halves the width and the height.
 * @returns The scaled rectangle.
 * @simple Same factor on both axes, around the center.
 * @example
 * scaleRectSimple({ x: 0, y: 0, width: 10, height: 10 }, 0.5); // { x: 2.5, y: 2.5, width: 5, height: 5 }
 */
export function scaleRectSimple(rect: Rect, scale: number): Rect {
  return scaleRect(rect, scale, scale, 'center');
}

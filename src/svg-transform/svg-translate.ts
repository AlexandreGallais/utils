import { createMatrix, createOrder, inOwnAxes } from './internal';
import type { SvgTransformOrder } from './svg-transform-order';

/**
 * An order of `applySvgTransforms` that moves the element along its own axes, in its own units: turned by
 * 90°, "to the right" goes down on screen. After `svgRotateTo(0)` and `svgFlip(false)`, its axes are those of
 * the screen.
 *
 * @param dx - The distance along its width.
 * @param dy - The distance along its height.
 * @returns The order, to change with `set(dx, dy)`.
 * @example
 * const position = svgTranslate(0, 0);
 * applySvgTransforms(train, [position]);
 * position.set(10, 0); // 10 units forward, where the train points
 */
export function svgTranslate(dx: number, dy: number): SvgTransformOrder<[dx: number, dy: number]> {
  return createOrder([dx, dy], (element, screen, x, y) => inOwnAxes(screen, createMatrix(element).translate(x, y)));
}

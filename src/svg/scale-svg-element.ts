import type { Anchor } from './anchor';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { changeOnScreen, createMatrix } from './internal';

/**
 * Enlarges or shrinks an SVG element on screen around one of its anchors, whatever its rotation and groups:
 * with `'bottom'`, it grows upwards.
 *
 * @param element - A rendered SVG element.
 * @param scaleX - The horizontal factor, as seen: `2` doubles the width.
 * @param scaleY - The vertical factor, as seen. Defaults to `scaleX`.
 * @param anchor - The point of its visible box that stays in place. Defaults to `'center'`.
 * @param transform - A transform of the list to set instead of adding one, to repeat the call without piling
 * transforms up.
 * @returns The transform holding the change, in the `transform` list of the element.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * scaleSvgElement(tank, 1, 1.5, 'bottom'); // 50 % taller, from its base
 */
export function scaleSvgElement(
  element: SVGGraphicsElement,
  scaleX: number,
  scaleY = scaleX,
  anchor: Anchor = 'center',
  transform?: SVGTransform,
): SVGTransform {
  return changeOnScreen(
    element,
    (screen) => {
      const { x, y } = getSvgAnchorPoint(element, anchor);
      return createMatrix(element, [scaleX, 0, 0, scaleY, x * (1 - scaleX), y * (1 - scaleY)]).multiply(screen);
    },
    transform,
  );
}

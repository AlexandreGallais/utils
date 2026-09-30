import type { Anchor } from './anchor';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { changeOnScreen, createMatrix } from './internal';

/**
 * Turns an SVG element clockwise on screen, around one of its anchors, whatever its groups.
 *
 * @param element - A rendered SVG element.
 * @param angleDegrees - The rotation, in degrees.
 * @param anchor - The point of its visible box that stays in place. Defaults to `'center'`.
 * @param transform - A transform of the list to set instead of adding one, to repeat the call without piling
 * transforms up.
 * @returns The transform holding the change, in the `transform` list of the element.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * rotateSvgElement(flag, 15, 'bottom'); // leans 15° around its foot
 */
export function rotateSvgElement(
  element: SVGGraphicsElement,
  angleDegrees: number,
  anchor: Anchor = 'center',
  transform?: SVGTransform,
): SVGTransform {
  return changeOnScreen(
    element,
    (screen) => {
      const { x, y } = getSvgAnchorPoint(element, anchor);
      return createMatrix(element).translate(x, y).rotate(angleDegrees).translate(-x, -y).multiply(screen);
    },
    transform,
  );
}

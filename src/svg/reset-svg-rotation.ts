import { changeOnScreen, createMatrix, getBBoxCenter } from './internal';

const HALF_TURN = 180;
const DEGREES_PER_RADIAN = HALF_TURN / Math.PI;

/**
 * Straightens an SVG element on screen with a cancelling transform of its list, whatever its groups: its
 * center stays in place, its flip and size are kept. Transforms added after it apply to the upright element.
 *
 * @param element - A rendered SVG element.
 * @param transform - A transform of the list to set instead of adding one, to repeat the call without piling
 * transforms up.
 * @returns The transform holding the change, in the `transform` list of the element.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * resetSvgRotation(symbol);
 */
export function resetSvgRotation(element: SVGGraphicsElement, transform?: SVGTransform): SVGTransform {
  return changeOnScreen(
    element,
    (screen) => {
      const sign = screen.a * screen.d < screen.b * screen.c ? -1 : 1;
      const rotation = Math.atan2(sign * screen.b, sign * screen.a) * DEGREES_PER_RADIAN;
      const { x, y } = getBBoxCenter(element).matrixTransform(screen);
      return createMatrix(element).translate(x, y).rotate(-rotation).translate(-x, -y).multiply(screen);
    },
    transform,
  );
}

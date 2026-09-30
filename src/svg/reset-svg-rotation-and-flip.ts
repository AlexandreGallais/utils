import { changeOnScreen, createMatrix, getBBoxCenter } from './internal';

/**
 * Straightens and unmirrors an SVG element on screen with a cancelling transform of its list, whatever its
 * groups: its center stays in place, its size is kept. Transforms added after it apply to the upright element.
 *
 * @param element - A rendered SVG element.
 * @param transform - A transform of the list to set instead of adding one, to repeat the call without piling
 * transforms up.
 * @returns The transform holding the change, in the `transform` list of the element.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * resetSvgRotationAndFlip(symbol);
 * addSvgTransform(symbol).setRotate(45, center.x, center.y); // 45° from upright
 */
export function resetSvgRotationAndFlip(element: SVGGraphicsElement, transform?: SVGTransform): SVGTransform {
  return changeOnScreen(
    element,
    (screen) => {
      const scaleX = Math.hypot(screen.a, screen.b);
      const scaleY = Math.hypot(screen.c, screen.d);
      const center = getBBoxCenter(element);
      const { x, y } = center.matrixTransform(screen);
      return createMatrix(element, [scaleX, 0, 0, scaleY, x - scaleX * center.x, y - scaleY * center.y]);
    },
    transform,
  );
}

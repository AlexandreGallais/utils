import { changeOnScreen, createMatrix, getBBoxCenter } from './internal';

/**
 * Unmirrors an SVG element on screen with a cancelling transform of its list, whatever its groups: its center
 * stays in place, its rotation and size are kept.
 *
 * @param element - A rendered SVG element.
 * @param transform - A transform of the list to set instead of adding one, to repeat the call without piling
 * transforms up.
 * @returns The transform holding the change, in the `transform` list of the element.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * resetSvgFlip(label); // readable again
 */
export function resetSvgFlip(element: SVGGraphicsElement, transform?: SVGTransform): SVGTransform {
  return changeOnScreen(
    element,
    (screen) => {
      if (screen.a * screen.d >= screen.b * screen.c) {
        return screen;
      }
      const { x } = getBBoxCenter(element);
      return screen.multiply(createMatrix(element, [-1, 0, 0, 1, 2 * x, 0]));
    },
    transform,
  );
}

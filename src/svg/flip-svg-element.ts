import type { Anchor } from './anchor';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { changeOnScreen, createMatrix } from './internal';

/**
 * Mirrors an SVG element on screen around one of its anchors, whatever its rotation and groups.
 *
 * @param element - A rendered SVG element.
 * @param axis - `'horizontal'` swaps left and right as seen, `'vertical'` top and bottom. Defaults to
 * `'horizontal'`.
 * @param anchor - The point of its visible box that stays in place. Defaults to `'center'`.
 * @param transform - A transform of the list to set instead of adding one, to repeat the call without piling
 * transforms up.
 * @returns The transform holding the change, in the `transform` list of the element.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * flipSvgElement(valve); // faces the other way, same place
 */
export function flipSvgElement(
  element: SVGGraphicsElement,
  axis: 'horizontal' | 'vertical' = 'horizontal',
  anchor: Anchor = 'center',
  transform?: SVGTransform,
): SVGTransform {
  return changeOnScreen(
    element,
    (screen) => {
      const { x, y } = getSvgAnchorPoint(element, anchor);
      return createMatrix(element, axis === 'horizontal' ? [-1, 0, 0, 1, 2 * x, 0] : [1, 0, 0, -1, 0, 2 * y]).multiply(
        screen,
      );
    },
    transform,
  );
}

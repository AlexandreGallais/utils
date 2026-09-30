import type { Anchor } from './anchor';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { changeOnScreen, createMatrix } from './internal';

/**
 * Moves an SVG element so that one of its anchors lands on an anchor of another element, as seen on screen,
 * whatever groups and transforms each one is in: the top-right corner of a badge on the bottom-left corner
 * of a symbol.
 *
 * @param element - The element to move.
 * @param elementAnchor - Its point that must land on the other, such as `'top-right'`.
 * @param reference - The element to align with.
 * @param referenceAnchor - The point of `reference` to reach. Defaults to `'center'`.
 * @param transform - A transform of the list to set instead of adding one, to repeat the call without piling
 * transforms up.
 * @returns The transform holding the change, in the `transform` list of the element.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * placeSvgElement(badge, 'top-right', symbol, 'bottom-left');
 */
export function placeSvgElement(
  element: SVGGraphicsElement,
  elementAnchor: Anchor,
  reference: SVGGraphicsElement,
  referenceAnchor: Anchor = 'center',
  transform?: SVGTransform,
): SVGTransform {
  return changeOnScreen(
    element,
    (screen) => {
      const from = getSvgAnchorPoint(element, elementAnchor);
      const to = getSvgAnchorPoint(reference, referenceAnchor);
      return createMatrix(element)
        .translate(to.x - from.x, to.y - from.y)
        .multiply(screen);
    },
    transform,
  );
}

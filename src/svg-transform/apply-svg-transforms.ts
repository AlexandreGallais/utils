import { createMatrix, getOrderState, getOwnerSvg, getScreenMatrix } from './internal';
import type { SvgTransformOrder } from './svg-transform-order';

/**
 * Applies orders to an SVG element, in order, each on what the previous ones give: one transform per order
 * is added at the end of its `transform` list. Changing an order later with `set` updates its own transform
 * only, from what the element shows without it.
 *
 * @param element - A rendered SVG element.
 * @param orders - The orders, such as `svgRotateTo(0)`, `svgPlace(target)`, `svgRotate(0)`.
 * @throws {TypeError} When the element is not rendered or not inside an `<svg>`, or an order was not created
 * by an order function.
 * @example
 * const rotation = svgRotate(0);
 * applySvgTransforms(needle, [svgPlace(hub, 'center', 'bottom'), rotation]);
 * rotation.set(45); // at each frame: 45° more than its first position
 */
export function applySvgTransforms(element: SVGGraphicsElement, orders: readonly SvgTransformOrder<never>[]): void {
  const svg = getOwnerSvg(element);
  const steps = orders
    .map((order) => getOrderState(order))
    .map((state) => ({ state, transform: element.transform.baseVal.appendItem(svg.createSVGTransform()) }));

  for (const [index, { state, transform }] of steps.entries()) {
    const later = steps.slice(index + 1);
    state.update = (): void => {
      transform.setMatrix(createMatrix(element));
      let after = createMatrix(element);
      for (const next of later) {
        after = after.multiply(next.transform.matrix);
      }
      const screen = getScreenMatrix(element);
      const change = state.toChange(element, screen);
      transform.setMatrix(after.multiply(screen.inverse()).multiply(change).multiply(screen).multiply(after.inverse()));
    };
    state.update();
  }
}

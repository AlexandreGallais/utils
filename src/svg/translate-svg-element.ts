import { changeOnScreen } from './internal';

/**
 * Moves an SVG element along its own axes, in its own units: rotated by 90°, "to the right" goes down on
 * screen.
 *
 * @param element - A rendered SVG element.
 * @param dx - The distance along its horizontal axis.
 * @param dy - The distance along its vertical axis.
 * @param transform - A transform of the list to set instead of adding one, to repeat the call without piling
 * transforms up.
 * @returns The transform holding the change, in the `transform` list of the element.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * translateSvgElement(train, 10, 0); // 10 units forward, where the train points
 */
export function translateSvgElement(
  element: SVGGraphicsElement,
  dx: number,
  dy: number,
  transform?: SVGTransform,
): SVGTransform {
  return changeOnScreen(element, (screen) => screen.translate(dx, dy), transform);
}

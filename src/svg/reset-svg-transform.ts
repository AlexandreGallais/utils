/**
 * Empties the `transform` list of an SVG element: it is drawn as written, without any transform.
 *
 * @param element - The SVG element.
 * @example
 * resetSvgTransform(symbol);
 */
export function resetSvgTransform(element: SVGGraphicsElement): void {
  element.transform.baseVal.clear();
}

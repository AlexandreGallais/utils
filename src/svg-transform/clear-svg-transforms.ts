/**
 * Empties the `transform` list of an SVG element: it is drawn without any transform.
 *
 * @param element - The SVG element.
 * @example
 * clearSvgTransforms(symbol);
 */
export function clearSvgTransforms(element: SVGGraphicsElement): void {
  element.transform.baseVal.clear();
}

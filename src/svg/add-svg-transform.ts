import { appendTransform } from './internal';

/**
 * Appends a transform to the `transform` list of an SVG element and returns it, to change it later with an
 * absolute value (`setTranslate`, `setRotate`, `setScale`, `setMatrix`) without touching the others. The list
 * applies in order, the last transform first on the element.
 *
 * @param element - An element inside an `<svg>`.
 * @returns The new transform, the identity until set.
 * @throws {TypeError} When the element is not inside an `<svg>`.
 * @example
 * const position = addSvgTransform(needle);
 * const rotation = addSvgTransform(needle);
 * const hub = getSvgAnchorPointIn(hubElement, 'center', needle); // before rotating
 * position.setTranslate(0, 10);
 * rotation.setRotate(angle, hub.x, hub.y); // at every frame: only the rotation changes
 */
export function addSvgTransform(element: SVGGraphicsElement): SVGTransform {
  return appendTransform(element);
}

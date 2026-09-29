import { drawSvgLine } from './draw-svg-line.ts';

/**
 * Draws a straight line in a `<path>` between two elements, like `drawSvgLine`.
 *
 * @param path - The `<path>` whose `d` attribute is written.
 * @param from - The element where the line starts.
 * @param to - The element where the line ends.
 * @throws {TypeError} When an element is not rendered, or the path is flattened.
 * @simple From the center of `from` to the center of `to`.
 * @example
 * drawSvgLineSimple(link, nodeA, nodeB);
 */
export function drawSvgLineSimple(path: SVGGraphicsElement, from: SVGGraphicsElement, to: SVGGraphicsElement): void {
  drawSvgLine(path, from, 'center', to, 'center');
}

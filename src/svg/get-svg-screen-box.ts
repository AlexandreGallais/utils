import type { Rect } from '../geometry/rect.ts';
import { transformRect } from '../geometry/transform-rect.ts';
import { getLocalBox } from './internal/get-local-box.ts';
import { getScreenMatrix } from './internal/get-screen-matrix.ts';

/**
 * Measures the box an SVG element takes on screen, in pixels: the upright rectangle around what is seen,
 * whatever its rotation, flip and groups. The base of the visual placement functions: its 9 anchors are
 * what `placeSvgElement` and `getSvgAnchorPoint` use.
 *
 * @param element - A rendered SVG element.
 * @returns The visible box, in screen pixels.
 * @throws {TypeError} When the element is not rendered.
 * @example
 * getSvgScreenBox(symbol); // { x: 180, y: 92, width: 40, height: 40 }
 */
export function getSvgScreenBox(element: SVGGraphicsElement): Rect {
  return transformRect(getLocalBox(element), getScreenMatrix(element));
}

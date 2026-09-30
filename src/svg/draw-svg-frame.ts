import { invertMatrix, transformPoint } from '../geometry';
import { getSvgScreenBox } from './get-svg-screen-box';
import { createPolylinePath } from './create-polyline-path';
import { getScreenMatrix } from './internal';

/**
 * Draws a frame around what an element shows on screen, with a margin, in a `<path>`, whatever groups each
 * one is in: the selection box of a symbol, a highlight around an alarm. The frame is upright on screen.
 *
 * @param path - The `<path>` whose `d` attribute is written.
 * @param element - The element to frame.
 * @param padding - Margin around its visible box, in screen pixels. Defaults to `0`.
 * @throws {TypeError} When an element is not rendered, or the path is flattened.
 * @example
 * drawSvgFrame(selection, selectedSymbol, 4);
 */
export function drawSvgFrame(path: SVGGraphicsElement, element: SVGGraphicsElement, padding?: number | null): void {
  const resolvedPadding = padding ?? 0;
  const toPath = invertMatrix(getScreenMatrix(path));
  if (toPath === undefined) {
    throw new TypeError('The path is flattened: its coordinates cannot be computed');
  }
  const { x, y, width, height } = getSvgScreenBox(element);
  const left = x - resolvedPadding;
  const top = y - resolvedPadding;
  const right = x + width + resolvedPadding;
  const bottom = y + height + resolvedPadding;
  const corners = [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
  ].map((corner) => transformPoint(corner, toPath));
  path.setAttribute('d', createPolylinePath(corners, true));
}

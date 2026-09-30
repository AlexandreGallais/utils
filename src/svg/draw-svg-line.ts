import type { Anchor } from '../geometry';
import { createPolylinePath } from './create-polyline-path';
import { getSvgAnchorPointIn } from './get-svg-anchor-point-in';

/**
 * Draws a straight line in a `<path>` from an anchor of one element to an anchor of another, whatever
 * groups and transforms each one is in: a pipe between two symbols, a leader line from a label to its
 * target.
 *
 * @param path - The `<path>` whose `d` attribute is written.
 * @param from - The element where the line starts.
 * @param fromAnchor - The point of `from` where it starts, such as `'right'`. Defaults to `'center'`.
 * @param to - The element where the line ends.
 * @param toAnchor - The point of `to` where it ends, such as `'left'`. Defaults to `'center'`.
 * @throws {TypeError} When an element is not rendered, or the path is flattened.
 * @example
 * drawSvgLine(pipe, pump, 'right', tank, 'left');
 */
export function drawSvgLine(
  path: SVGGraphicsElement,
  from: SVGGraphicsElement,
  fromAnchor: Anchor | null | undefined,
  to: SVGGraphicsElement,
  toAnchor?: Anchor | null,
): void {
  const resolvedFromAnchor = fromAnchor ?? 'center';
  const resolvedToAnchor = toAnchor ?? 'center';
  const start = getSvgAnchorPointIn(from, resolvedFromAnchor, path);
  const end = getSvgAnchorPointIn(to, resolvedToAnchor, path);
  path.setAttribute('d', createPolylinePath([start, end], false));
}

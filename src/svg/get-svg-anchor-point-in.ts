import type { Anchor } from '../geometry/anchor.ts';
import { invertMatrix } from '../geometry/invert-matrix.ts';
import type { Point } from '../geometry/point.ts';
import { transformPoint } from '../geometry/transform-point.ts';
import { getSvgAnchorPoint } from './get-svg-anchor-point.ts';
import { getScreenMatrix } from './internal/get-screen-matrix.ts';

/**
 * Finds one of the 9 anchors of an SVG element, as seen on screen, in the coordinates of another element:
 * where to draw, in a path of one group, something centered on an element of another group.
 *
 * @param element - The element giving the point.
 * @param anchor - The point of its visible box, such as `'center'`.
 * @param target - The element whose coordinates are wanted, such as the `<path>` to draw in.
 * @returns The point, in the local coordinates of `target`.
 * @throws {TypeError} When an element is not rendered, or `target` is flattened.
 * @example
 * createArcPath(getSvgAnchorPointIn(hub, 'center', track), 40, -135, 135);
 */
export function getSvgAnchorPointIn(element: SVGGraphicsElement, anchor: Anchor, target: SVGGraphicsElement): Point {
  const toTarget = invertMatrix(getScreenMatrix(target));
  if (toTarget === undefined) {
    throw new TypeError('The target SVG element is flattened: its coordinates cannot be computed');
  }
  return transformPoint(getSvgAnchorPoint(element, anchor), toTarget);
}

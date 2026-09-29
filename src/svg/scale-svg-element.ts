import type { Anchor } from '../geometry/anchor.ts';
import { multiplyMatrices } from '../geometry/multiply-matrices.ts';
import { createScaleMatrix } from '../geometry/create-scale-matrix.ts';
import { getSvgAnchorPoint } from './get-svg-anchor-point.ts';
import { updateScreenMatrix } from './internal/update-screen-matrix.ts';

/**
 * Enlarges or shrinks an SVG element on screen, around one of its 9 anchors that stays in place, whatever
 * its rotation and groups.
 *
 * @param element - A rendered SVG element.
 * @param factor - The size multiplier: `2` doubles it, `0.5` halves it.
 * @param anchor - The point of its visible box that does not move, such as `'center'` or `'bottom-left'`.
 * @throws {TypeError} When the element is not rendered, a transform is flattened (including a factor of
 * `0`) or its `transform` attribute is invalid.
 * @example
 * scaleSvgElement(icon, 1.5, 'bottom'); // grows upwards from its base
 */
export function scaleSvgElement(element: SVGGraphicsElement, factor: number, anchor: Anchor): void {
  const pivot = getSvgAnchorPoint(element, anchor);
  updateScreenMatrix(element, (screen) => multiplyMatrices(createScaleMatrix(factor, factor, pivot), screen));
}

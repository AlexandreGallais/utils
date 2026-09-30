import type { Anchor } from '../geometry';
import { multiplyMatrices, createScaleMatrix } from '../geometry';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { updateScreenMatrix } from './internal';

/**
 * Enlarges or shrinks an SVG element on screen, around one of its 9 anchors that stays in place, whatever
 * its rotation and groups.
 *
 * @param element - A rendered SVG element.
 * @param factor - The size multiplier: `2` doubles it, `0.5` halves it. Defaults to `1`.
 * @param anchor - The point of its visible box that does not move, such as `'center'` or `'bottom-left'`. Defaults to
 * `'center'`.
 * @throws {TypeError} When the element is not rendered, a transform is flattened (including a factor of
 * `0`) or its `transform` attribute is invalid.
 * @example
 * scaleSvgElement(icon, 1.5, 'bottom'); // grows upwards from its base
 */
export function scaleSvgElement(element: SVGGraphicsElement, factor?: number | null, anchor?: Anchor | null): void {
  const resolvedFactor = factor ?? 1;
  const resolvedAnchor = anchor ?? 'center';
  const pivot = getSvgAnchorPoint(element, resolvedAnchor);
  updateScreenMatrix(element, (screen) =>
    multiplyMatrices(createScaleMatrix(resolvedFactor, resolvedFactor, pivot), screen),
  );
}

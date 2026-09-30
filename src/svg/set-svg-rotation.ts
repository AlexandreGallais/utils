import type { Anchor } from '../geometry';
import { getMatrixRotation, multiplyMatrices, createRotationMatrix } from '../geometry';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { updateScreenMatrix } from './internal';

/**
 * Orients an SVG element to an absolute angle on screen (0° upright), turning it around one of its 9
 * anchors that stays in place, whatever its groups: set it again at each frame without accumulating.
 *
 * @param element - A rendered SVG element.
 * @param angleDegrees - The wanted angle on screen, in degrees, clockwise from upright. Defaults to `0`.
 * @param anchor - The point of its visible box that does not move, such as `'center'` or `'bottom'`. Defaults to
 * `'center'`.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * setSvgRotation(arrow, windDirection, 'center');
 */
export function setSvgRotation(
  element: SVGGraphicsElement,
  angleDegrees?: number | null,
  anchor?: Anchor | null,
): void {
  const resolvedAngleDegrees = angleDegrees ?? 0;
  const resolvedAnchor = anchor ?? 'center';
  const pivot = getSvgAnchorPoint(element, resolvedAnchor);
  updateScreenMatrix(element, (screen) =>
    multiplyMatrices(createRotationMatrix(resolvedAngleDegrees - getMatrixRotation(screen), pivot), screen),
  );
}

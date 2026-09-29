import type { Anchor } from '../geometry/anchor.ts';
import { getMatrixRotation } from '../geometry/get-matrix-rotation.ts';
import { multiplyMatrices } from '../geometry/multiply-matrices.ts';
import { createRotationMatrix } from '../geometry/create-rotation-matrix.ts';
import { getSvgAnchorPoint } from './get-svg-anchor-point.ts';
import { updateScreenMatrix } from './internal/update-screen-matrix.ts';

/**
 * Orients an SVG element to an absolute angle on screen (0° upright), turning it around one of its 9
 * anchors that stays in place, whatever its groups: set it again at each frame without accumulating.
 *
 * @param element - A rendered SVG element.
 * @param angleDegrees - The wanted angle on screen, in degrees, clockwise from upright.
 * @param anchor - The point of its visible box that does not move, such as `'center'` or `'bottom'`.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * setSvgRotation(arrow, windDirection, 'center');
 */
export function setSvgRotation(element: SVGGraphicsElement, angleDegrees: number, anchor: Anchor): void {
  const pivot = getSvgAnchorPoint(element, anchor);
  updateScreenMatrix(element, (screen) =>
    multiplyMatrices(createRotationMatrix(angleDegrees - getMatrixRotation(screen), pivot), screen),
  );
}

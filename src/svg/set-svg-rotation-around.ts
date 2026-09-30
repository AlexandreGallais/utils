import type { Anchor } from '../geometry';
import { getMatrixRotation, multiplyMatrices, createRotationMatrix } from '../geometry';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { updateScreenMatrix } from './internal';

/**
 * Orients an SVG element to an absolute angle on screen, turning it around an anchor of another element,
 * whatever groups and transforms each one is in: a gauge needle pointing at the current value at every
 * frame, around a hub drawn in another group.
 *
 * @param element - The element to orient.
 * @param angleDegrees - The wanted angle on screen, in degrees, clockwise from upright.
 * @param pivot - The element giving the axis, such as the gauge hub.
 * @param pivotAnchor - The point of `pivot` used as axis, such as `'center'`.
 * @throws {TypeError} When an element is not rendered, a transform is flattened or a `transform` attribute
 * is invalid.
 * @example
 * setSvgRotationAround(needle, valueToAngle(speed, 0, 40, -135, 135, true), hub, 'center');
 */
export function setSvgRotationAround(
  element: SVGGraphicsElement,
  angleDegrees: number,
  pivot: SVGGraphicsElement,
  pivotAnchor: Anchor,
): void {
  const axis = getSvgAnchorPoint(pivot, pivotAnchor);
  updateScreenMatrix(element, (screen) =>
    multiplyMatrices(createRotationMatrix(angleDegrees - getMatrixRotation(screen), axis), screen),
  );
}

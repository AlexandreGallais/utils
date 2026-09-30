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
 * @param angleDegrees - The wanted angle on screen, in degrees, clockwise from upright. Defaults to `0`.
 * @param pivot - The element giving the axis, such as the gauge hub.
 * @param pivotAnchor - The point of `pivot` used as axis, such as `'center'`. Defaults to `'center'`.
 * @throws {TypeError} When an element is not rendered, a transform is flattened or a `transform` attribute
 * is invalid.
 * @example
 * setSvgRotationAround(needle, valueToAngle(speed, 0, 40, -135, 135, true), hub, 'center');
 */
export function setSvgRotationAround(
  element: SVGGraphicsElement,
  angleDegrees: number | null | undefined,
  pivot: SVGGraphicsElement,
  pivotAnchor?: Anchor | null,
): void {
  const resolvedAngleDegrees = angleDegrees ?? 0;
  const resolvedPivotAnchor = pivotAnchor ?? 'center';
  const axis = getSvgAnchorPoint(pivot, resolvedPivotAnchor);
  updateScreenMatrix(element, (screen) =>
    multiplyMatrices(createRotationMatrix(resolvedAngleDegrees - getMatrixRotation(screen), axis), screen),
  );
}

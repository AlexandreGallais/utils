import type { Anchor } from '../geometry';
import { multiplyMatrices, createRotationMatrix } from '../geometry';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { updateScreenMatrix } from './internal';

/**
 * Turns an SVG element by an angle, clockwise on screen, around an anchor of another element, whatever
 * groups and transforms each one is in: a pointer turning around the hub of a gauge drawn in another layer.
 *
 * @param element - The element to turn.
 * @param angleDegrees - The added rotation, in degrees, clockwise on screen. Defaults to `0`.
 * @param pivot - The element giving the axis, such as the gauge hub.
 * @param pivotAnchor - The point of `pivot` used as axis, such as `'center'`. Defaults to `'center'`.
 * @throws {TypeError} When an element is not rendered, a transform is flattened or a `transform` attribute
 * is invalid.
 * @example
 * rotateSvgElementAround(pointer, 15, hub, 'center'); // 15° more, around the hub
 */
export function rotateSvgElementAround(
  element: SVGGraphicsElement,
  angleDegrees: number | null | undefined,
  pivot: SVGGraphicsElement,
  pivotAnchor?: Anchor | null,
): void {
  const resolvedAngleDegrees = angleDegrees ?? 0;
  const resolvedPivotAnchor = pivotAnchor ?? 'center';
  const axis = getSvgAnchorPoint(pivot, resolvedPivotAnchor);
  updateScreenMatrix(element, (screen) => multiplyMatrices(createRotationMatrix(resolvedAngleDegrees, axis), screen));
}

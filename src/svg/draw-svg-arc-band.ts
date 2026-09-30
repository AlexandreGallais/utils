import { createRingSectorPath } from './create-ring-sector-path';
import { getSvgAnchorPointIn } from './get-svg-anchor-point-in';
import type { SvgArc } from './svg-arc';

/**
 * Draws a band along an arc in a `<path>`, as a filled shape centered on the radius, around the center of an
 * element, whatever groups each one is in: a colored zone of a gauge, a progress band. Style it with `fill`.
 *
 * @param path - The `<path>` whose `d` attribute is written.
 * @param arc - The center element, the radius of the middle of the band, the start angle and the opening.
 * @param thickness - Width of the band, in the coordinates of the path (half inside, half outside `radius`).
 * @throws {TypeError} When an element is not rendered, or the path is flattened.
 * @example
 * drawSvgArcBand(redZone, { center: hub, radius: 40, startAngle: 81, sweepAngle: 54 }, 6);
 */
export function drawSvgArcBand(path: SVGGraphicsElement, arc: SvgArc, thickness: number): void {
  const center = getSvgAnchorPointIn(arc.center, 'center', path);
  const half = thickness / 2;
  const endAngle = arc.startAngle + arc.sweepAngle;
  path.setAttribute('d', createRingSectorPath(center, arc.radius - half, arc.radius + half, arc.startAngle, endAngle));
}

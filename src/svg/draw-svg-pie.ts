import { createPiePath } from './create-pie-path';
import { getSvgAnchorPointIn } from './get-svg-anchor-point-in';
import type { SvgArc } from './svg-arc';

/**
 * Draws a pie slice joined to the center of an element in a `<path>`, whatever groups each one is in: a
 * sector of a radar, a remaining-time disk, a pie chart part. Style it with `fill`.
 *
 * @param path - The `<path>` whose `d` attribute is written.
 * @param arc - The center element, the radius, the start angle and the opening (360 for a full disk).
 * @throws {TypeError} When an element is not rendered, or the path is flattened.
 * @example
 * drawSvgPie(remaining, { center: clockFace, radius: 30, startAngle: 0, sweepAngle: 360 * ratio });
 */
export function drawSvgPie(path: SVGGraphicsElement, arc: SvgArc): void {
  const center = getSvgAnchorPointIn(arc.center, 'center', path);
  path.setAttribute('d', createPiePath(center, arc.radius, arc.startAngle, arc.startAngle + arc.sweepAngle));
}

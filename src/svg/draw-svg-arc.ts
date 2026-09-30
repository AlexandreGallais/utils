import { getSvgAnchorPointIn } from './get-svg-anchor-point-in';
import { createArcPath } from './internal';
import type { SvgArc } from './svg-arc';

/**
 * Draws an arc in a `<path>` around the center of an element, in any group: the track of a gauge around its
 * hub. Style it with `stroke`.
 *
 * @param path - The `<path>` to write.
 * @param arc - The center element, the radius, the start angle and the opening.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * drawSvgArc(track, { center: hub, radius: 40, startAngle: -135, sweepAngle: 270 });
 */
export function drawSvgArc(path: SVGGraphicsElement, arc: SvgArc): void {
  const center = getSvgAnchorPointIn(arc.center, 'center', path);
  path.setAttribute('d', createArcPath(center, arc.radius, arc.startAngle, arc.startAngle + arc.sweepAngle));
}

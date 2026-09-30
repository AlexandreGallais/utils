import { getSvgAnchorPointIn } from '../svg-transform';
import { createArcPath } from './internal';
import type { SvgArc } from './svg-arc';

/**
 * Creates the `d` of an arc around the center of an element, in any group: the track of a gauge around its
 * hub.
 *
 * @param target - The element in whose coordinates the path is written, such as the `<path>` that receives it.
 * @param arc - The center element, the radius, the start angle and the opening.
 * @returns The path data.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * track.setAttribute('d', createSvgArcPath(track, { center: hub, radius: 40, startAngle: -135, sweepAngle: 270 }));
 */
export function createSvgArcPath(target: SVGGraphicsElement, arc: SvgArc): string {
  const center = getSvgAnchorPointIn(arc.center, 'center', target);
  return createArcPath(center, arc.radius, arc.startAngle, arc.startAngle + arc.sweepAngle);
}

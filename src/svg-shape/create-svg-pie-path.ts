import { getSvgAnchorPointIn } from '../svg-transform';
import { createArcPath, formatPoint } from './internal';
import type { SvgArc } from './svg-arc';

const FULL_TURN = 360;

/**
 * Creates the `d` of a pie slice joined to the center of an element, in any group: a radar sector, a
 * remaining-time disk, to fill. A sweep of 360° gives the full disk.
 *
 * @param target - The element in whose coordinates the path is written, such as the `<path>` that receives it.
 * @param arc - The center element, the radius, the start angle and the opening.
 * @returns The closed path data.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * remaining.setAttribute('d', createSvgPiePath(remaining, { center: face, radius: 30, startAngle: 0, sweepAngle: 360 * ratio }));
 */
export function createSvgPiePath(target: SVGGraphicsElement, arc: SvgArc): string {
  const center = getSvgAnchorPointIn(arc.center, 'center', target);
  const arcPath = createArcPath(center, arc.radius, arc.startAngle, arc.startAngle + arc.sweepAngle);
  return Math.abs(arc.sweepAngle) >= FULL_TURN ? `${arcPath} Z` : `M ${formatPoint(center)} L${arcPath.slice(1)} Z`;
}

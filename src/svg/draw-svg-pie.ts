import { getSvgAnchorPointIn } from './get-svg-anchor-point-in';
import { createArcPath, formatPoint } from './internal';
import type { SvgArc } from './svg-arc';

const FULL_TURN = 360;

/**
 * Draws a pie slice joined to the center of an element, in a `<path>` of any group: a radar sector, a
 * remaining-time disk. A sweep of 360° gives the full disk. Style it with `fill`.
 *
 * @param path - The `<path>` to write.
 * @param arc - The center element, the radius, the start angle and the opening.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * drawSvgPie(remaining, { center: clockFace, radius: 30, startAngle: 0, sweepAngle: 360 * ratio });
 */
export function drawSvgPie(path: SVGGraphicsElement, arc: SvgArc): void {
  const center = getSvgAnchorPointIn(arc.center, 'center', path);
  const arcPath = createArcPath(center, arc.radius, arc.startAngle, arc.startAngle + arc.sweepAngle);
  path.setAttribute(
    'd',
    Math.abs(arc.sweepAngle) >= FULL_TURN ? `${arcPath} Z` : `M ${formatPoint(center)} L${arcPath.slice(1)} Z`,
  );
}

import { createArcPath } from './create-arc-path.ts';
import { getSvgAnchorPointIn } from './get-svg-anchor-point-in.ts';
import type { SvgArc } from './svg-arc.ts';

/**
 * Draws an arc in a `<path>` around the center of an element, whatever groups and transforms each one is
 * in: the track of a gauge around its hub. Style it with `stroke` and `stroke-width` (thicker or thinner
 * arc), without `fill`.
 *
 * @param path - The `<path>` whose `d` attribute is written.
 * @param arc - The center element, the radius, the start angle and the opening.
 * @throws {TypeError} When an element is not rendered, or the path is flattened.
 * @example
 * drawSvgArc(track, { center: hub, radius: 40, startAngle: -135, sweepAngle: 270 });
 */
export function drawSvgArc(path: SVGGraphicsElement, arc: SvgArc): void {
  const center = getSvgAnchorPointIn(arc.center, 'center', path);
  path.setAttribute('d', createArcPath(center, arc.radius, arc.startAngle, arc.startAngle + arc.sweepAngle));
}

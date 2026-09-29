import { polarToCartesian } from '../geometry/polar-to-cartesian.ts';
import type { ArcTick } from './arc-tick.ts';
import type { ArcTicksOptions } from './arc-ticks-options.ts';
import { generateScaleValues } from './internal/generate-scale-values.ts';
import { valueToAngle } from './value-to-angle.ts';

/**
 * Computes the graduations of a round gauge: major ticks every `majorStep`, shorter minor ticks every
 * `minorStep`, a minor tick falling on a major one dropped. Draw them one by one, or all at once with
 * `createTicksPath` (one `<path>` is much cheaper than hundreds of `<line>`).
 *
 * @param options - Center, angles, value range, steps and radii.
 * @returns The graduations, in increasing value order.
 * @throws {RangeError} When a step is not a positive finite number, or `max` is not greater than `min`.
 * @example
 * const ticks = createArcTicks({
 *   center: { x: 50, y: 50 }, startAngle: -135, endAngle: 135, min: 0, max: 30,
 *   majorStep: 10, minorStep: 2, innerRadius: 32, minorInnerRadius: 36, outerRadius: 40,
 * });
 * scale.setAttribute('d', createTicksPath(ticks));
 */
export function createArcTicks(options: ArcTicksOptions): ArcTick[] {
  const { center, startAngle, endAngle, min, max, innerRadius, outerRadius } = options;
  const minorInnerRadius = options.minorInnerRadius ?? innerRadius;
  return generateScaleValues(min, max, options.majorStep, options.minorStep).map(({ value, isMajor }) => {
    const angle = valueToAngle(value, min, max, startAngle, endAngle, true);
    return {
      value,
      angle,
      start: polarToCartesian(center, isMajor ? innerRadius : minorInnerRadius, angle),
      end: polarToCartesian(center, outerRadius, angle),
      isMajor,
    };
  });
}

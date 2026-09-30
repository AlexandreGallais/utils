import { polarToCartesian } from '../geometry';
import type { Point } from '../geometry';
import { generateScaleValues } from './internal';
import { valueToAngle } from './value-to-angle';

/** Geometry and scale of the graduations built by `createArcTicks`. */
export interface ArcTicksOptions {
  /** Center of the gauge. */
  readonly center: Point;
  /** Angle of `min`, in degrees (library convention: 0° up, clockwise). */
  readonly startAngle: number;
  /** Angle of `max`, in degrees. */
  readonly endAngle: number;
  /** Value at the start of the scale. */
  readonly min: number;
  /** Value at the end of the scale, greater than `min`. */
  readonly max: number;
  /** Interval between major graduations, from `min`. */
  readonly majorStep: number;
  /** Interval between minor graduations, from `min`; no minor graduation when omitted. */
  readonly minorStep?: number | null;
  /** Radius where major ticks start (towards the center). */
  readonly innerRadius: number;
  /** Radius where every tick ends (towards the outside). */
  readonly outerRadius: number;
  /** Radius where minor ticks start, so they are shorter; `innerRadius` when omitted. */
  readonly minorInnerRadius?: number | null;
}

/** A graduation of a round gauge, returned by `createArcTicks`. */
export interface ArcTick {
  /** Value of the graduation. */
  readonly value: number;
  /** Angle of the graduation, in degrees (library convention: 0° up, clockwise). */
  readonly angle: number;
  /** Inner end of the tick line. */
  readonly start: Point;
  /** Outer end of the tick line. */
  readonly end: Point;
  /** Whether the graduation is on a major step (longer tick, usually labelled). */
  readonly isMajor: boolean;
}

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

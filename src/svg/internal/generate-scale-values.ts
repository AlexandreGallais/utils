import { isNearlyEqual, roundToFractionDigits } from '../../math';

/** A graduation value of a scale. */
export interface ScaleValue {
  /** The value. */
  readonly value: number;
  /** Whether it is on a major step (labelled, longer tick). */
  readonly isMajor: boolean;
}

/** Relative tolerance that decides whether a minor value falls on a major one. */
const COINCIDENCE_TOLERANCE = 1e-9;

/** Decimals kept: removes float noise such as `0.30000000000000004`, keeps any realistic step. */
const NOISE_FRACTION_DIGITS = 10;

/**
 * Lists the graduations of a scale, from `min` to `max` included: major values every `majorStep` from `min`,
 * minor values every `minorStep` from `min`, minor values falling on a major one dropped. Float noise is
 * removed (`0.1 * 3` gives `0.3`).
 *
 * @internal
 * @param min - Start of the scale.
 * @param max - End of the scale, greater than `min`.
 * @param majorStep - Interval between major values, a positive number.
 * @param minorStep - Interval between minor values, a positive number; none when omitted.
 * @returns The values, in increasing order.
 * @throws {RangeError} When a step is not a positive finite number, or `max` is not greater than `min`.
 */
export function generateScaleValues(min: number, max: number, majorStep: number, minorStep?: number): ScaleValue[] {
  if (max <= min || !Number.isFinite(max - min)) {
    throw new RangeError(`max (${max}) must be a finite number greater than min (${min})`);
  }
  const majors = stepValues(min, max, majorStep);
  const minors = minorStep === undefined ? [] : stepValues(min, max, minorStep);
  const values: ScaleValue[] = majors.map((value) => ({ value, isMajor: true }));
  for (const value of minors) {
    if (majors.every((major) => !isNearlyEqual(major, value, COINCIDENCE_TOLERANCE))) {
      values.push({ value, isMajor: false });
    }
  }
  return values.toSorted((a, b) => a.value - b.value);
}

/**
 * Lists `min`, `min + step`, … up to `max`, without float noise.
 *
 * @param min - First value.
 * @param max - Last value allowed.
 * @param step - Interval, a positive finite number.
 * @returns The values of the step, `min` first.
 * @throws {RangeError} When `step` is not a positive finite number.
 */
function stepValues(min: number, max: number, step: number): number[] {
  if (!Number.isFinite(step) || step <= 0) {
    throw new RangeError(`step must be a positive finite number, got ${step}`);
  }
  const count = Math.floor((max - min) / step + COINCIDENCE_TOLERANCE);
  return Array.from({ length: count + 1 }, (_, index) =>
    roundToFractionDigits(min + index * step, NOISE_FRACTION_DIGITS),
  );
}

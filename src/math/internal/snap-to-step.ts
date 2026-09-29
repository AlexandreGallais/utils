import { roundToFractionDigits } from '../round-to-fraction-digits.ts';

/** Relative tolerance that snaps `value / step` to an integer: float noise, not a real fraction. */
const STEP_QUOTIENT_TOLERANCE = 1e-9;

/** Each decimal is one multiplication by ten. */
const DECIMAL_BASE = 10;

/** Highest number of decimals kept (the limit of `roundToFractionDigits`). */
const MAX_STEP_DECIMALS = 100;

/**
 * Snaps a number to a multiple of a step, correcting the float noise of the division and of the product.
 *
 * @internal
 * @param value - The number to snap.
 * @param step - The step, a positive finite number.
 * @param snap - Rounds the quotient: `Math.round`, `Math.floor` or `Math.ceil`.
 * @returns The snapped multiple, rounded to the number of decimals of `step`.
 * @throws {RangeError} When `step` is not a positive finite number.
 */
export function snapToStep(value: number, step: number, snap: (quotient: number) => number): number {
  if (!Number.isFinite(step) || step <= 0) {
    throw new RangeError(`step must be a positive finite number, got ${step}`);
  }
  let quotient = value / step;
  const nearest = Math.round(quotient);
  // 0.3 / 0.1 is 2.9999999999999996: snap it to 3 before flooring.
  if (Math.abs(quotient - nearest) <= STEP_QUOTIENT_TOLERANCE * Math.max(1, Math.abs(quotient))) {
    quotient = nearest;
  }
  return roundToFractionDigits(snap(quotient) * step, countStepDecimals(step));
}

/**
 * Counts the decimals of a step with arithmetic only (no string, no cache, ~4 ns): the step is multiplied by
 * 10 until it is an integer, float noise tolerated. `0.25` → 2, `1e-7` → 7, `0.1 + 0.2` → 1.
 *
 * @param step - A positive finite step.
 * @returns Its number of decimals, capped to 100.
 */
function countStepDecimals(step: number): number {
  let decimals = 0;
  let scaled = step;
  while (decimals < MAX_STEP_DECIMALS && Math.abs(scaled - Math.round(scaled)) > STEP_QUOTIENT_TOLERANCE * scaled) {
    scaled *= DECIMAL_BASE;
    decimals += 1;
  }
  return decimals;
}

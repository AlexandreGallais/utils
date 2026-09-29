import { invalidFractionDigitsError } from './invalid-fraction-digits-error.ts';

/** Highest value accepted by `Intl.NumberFormat` for `maximumFractionDigits`. */
const MAX_FRACTION_DIGITS = 100;

/**
 * Checks a number of fraction digits against the range accepted by `Intl.NumberFormat`.
 *
 * @internal
 * @param maxFractionDigits - The value to check.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 */
export function assertValidFractionDigits(maxFractionDigits: number): void {
  if (!Number.isSafeInteger(maxFractionDigits) || maxFractionDigits < 0 || maxFractionDigits > MAX_FRACTION_DIGITS) {
    throw invalidFractionDigitsError(maxFractionDigits);
  }
}

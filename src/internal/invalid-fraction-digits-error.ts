/** Highest value accepted by `Intl.NumberFormat` for `maximumFractionDigits`. */
const MAX_FRACTION_DIGITS = 100;

/**
 * Builds the error reported for an invalid number of fraction digits.
 *
 * @internal
 * @param maxFractionDigits - The rejected value.
 * @returns A `RangeError` naming the accepted range and the received value.
 */
export function invalidFractionDigitsError(maxFractionDigits: number): RangeError {
  return new RangeError(
    `maxFractionDigits must be an integer in [0, ${MAX_FRACTION_DIGITS}], got ${maxFractionDigits}`,
  );
}

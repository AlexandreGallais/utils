import { invalidFractionDigitsError } from './invalid-fraction-digits-error';

/** Highest value accepted by `Intl.NumberFormat` for `maximumFractionDigits`. */
const MAX_FRACTION_DIGITS = 100;

const DECIMAL_BASE = 10;

/**
 * `POWERS_OF_TEN[n] === 10 ** n`: a lookup is cheaper than a power in hot paths. `@__PURE__` lets bundlers
 * drop the table when nothing uses it.
 */
const POWERS_OF_TEN: readonly number[] = /* @__PURE__ */ Array.from(
  { length: MAX_FRACTION_DIGITS + 1 },
  (_, exponent) => DECIMAL_BASE ** exponent,
);

/**
 * Looks up the power of ten that scales a number to a given number of fraction digits. The lookup doubles as
 * the validation: any value other than an integer in [0, 100] misses the table.
 *
 * @internal
 * @param maxFractionDigits - Number of fraction digits.
 * @returns `10 ** maxFractionDigits`.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 */
export function getScaleFactor(maxFractionDigits: number): number {
  const factor = POWERS_OF_TEN[maxFractionDigits];
  if (factor === undefined) {
    throw invalidFractionDigitsError(maxFractionDigits);
  }
  return factor;
}

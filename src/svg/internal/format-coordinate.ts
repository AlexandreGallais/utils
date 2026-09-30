import { roundToFractionDigits } from '../../math';

/** A thousandth of a user unit is invisible, and keeps path strings short. */
const COORDINATE_FRACTION_DIGITS = 3;

/**
 * Formats a coordinate for an SVG attribute: rounded to 3 decimals, without trailing zeros or `-0`.
 *
 * @internal
 * @param value - A coordinate or a length.
 * @returns Its shortest text, such as `'12.346'`.
 */
export function formatCoordinate(value: number): string {
  return String(roundToFractionDigits(value, COORDINATE_FRACTION_DIGITS));
}

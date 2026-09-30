import { formatDecimal } from '../format';
import { roundToFractionDigits } from '../math';
import { normalizeAngle } from './normalize-angle';

/** Degrees in a full turn. */
const FULL_TURN = 360;
/** Integer digits of a heading, as read on a compass or a navigation display (`005°`). */
const INTEGER_DIGITS = 3;

/**
 * Formats a heading or a bearing the navigation way: normalized to [0, 360[, three integer digits and a
 * degree sign (`'005°'`, `'270°'`); a heading that rounds to 360 is shown as `'000°'`.
 *
 * @param degrees - The heading, in degrees, any value (wrapped into [0, 360[).
 * @param maxFractionDigits - Maximum number of decimals, an integer in [0, 100].
 * @returns The formatted heading; `'NaN'` for `NaN`.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 * @example
 * formatHeading(5, 0); // '005°'
 * formatHeading(359.7, 0); // '000°'
 * formatHeading(-12.34, 1); // '347.7°'
 */
export function formatHeading(degrees: number, maxFractionDigits: number): string {
  const rounded = roundToFractionDigits(normalizeAngle(degrees), maxFractionDigits);
  if (Number.isNaN(rounded)) {
    return 'NaN';
  }
  const text = formatDecimal(rounded === FULL_TURN ? 0 : rounded, maxFractionDigits);
  const [integer = '', fraction] = text.split('.', 2);
  const decimals = fraction === undefined ? '' : `.${fraction}`;
  return `${integer.padStart(INTEGER_DIGITS, '0')}${decimals}°`;
}

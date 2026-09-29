import { roundToFractionDigits } from '../math/round-to-fraction-digits.ts';

const MINUTES_PER_DEGREE = 60;
const SECONDS_PER_MINUTE = 60;
const TWO_DIGITS = 2;
const LONGITUDE_DEGREE_DIGITS = 3;
const MAX_LATITUDE = 90;
const MAX_LONGITUDE = 180;
/** Default decimals: minutes to a thousandth (about 2 m), seconds to a tenth (about 3 m). */
const DEFAULT_MINUTE_DIGITS = 3;
const DEFAULT_SECOND_DIGITS = 1;

/**
 * Formats a latitude or a longitude for a nautical display: degrees and decimal minutes (`48°51.400′ N`, the
 * GPS and chart format), or degrees, minutes and seconds (`48°51′24.0″ N`). Degrees are zero-padded (2 digits
 * for a latitude, 3 for a longitude) so columns align.
 *
 * @param value - The coordinate in decimal degrees: positive north or east.
 * @param axis - `'lat'` for a latitude (N/S), `'lon'` for a longitude (E/W).
 * @param style - `'dm'` for degrees and decimal minutes, `'dms'` for degrees, minutes and seconds.
 * @param fractionDigits - Decimals of the last field; 3 for minutes, 1 for seconds by default.
 * @returns The formatted coordinate; `''` for a value out of range or not finite.
 * @example
 * formatGeoCoordinate(48.856_667, 'lat'); // '48°51.400′ N'
 * formatGeoCoordinate(-2.35, 'lon'); // '002°21.000′ W'
 * formatGeoCoordinate(48.856_667, 'lat', 'dms'); // '48°51′24.0″ N'
 */
export function formatGeoCoordinate(
  value: number,
  axis: 'lat' | 'lon',
  style: 'dm' | 'dms' = 'dm',
  fractionDigits = style === 'dm' ? DEFAULT_MINUTE_DIGITS : DEFAULT_SECOND_DIGITS,
): string {
  const limit = axis === 'lat' ? MAX_LATITUDE : MAX_LONGITUDE;
  if (!Number.isFinite(value) || Math.abs(value) > limit) {
    return '';
  }
  const hemisphere = hemisphereOf(value, axis);
  const degreeDigits = axis === 'lat' ? TWO_DIGITS : LONGITUDE_DEGREE_DIGITS;
  const lastFieldUnits = style === 'dm' ? MINUTES_PER_DEGREE : MINUTES_PER_DEGREE * SECONDS_PER_MINUTE;
  // Rounded once, on the last field: 59.9999′ becomes the next degree instead of `60.000′`.
  const total = roundToFractionDigits(Math.abs(value) * lastFieldUnits, fractionDigits);
  const degrees = Math.trunc(total / lastFieldUnits);
  const rest = total - degrees * lastFieldUnits;
  const degreesText = `${String(degrees).padStart(degreeDigits, '0')}°`;
  if (style === 'dm') {
    return `${degreesText}${formatField(rest, fractionDigits)}′ ${hemisphere}`;
  }
  const minutes = Math.trunc(rest / SECONDS_PER_MINUTE);
  const seconds = rest - minutes * SECONDS_PER_MINUTE;
  return `${degreesText}${String(minutes).padStart(TWO_DIGITS, '0')}′${formatField(seconds, fractionDigits)}″ ${hemisphere}`;
}

/**
 * Formats minutes or seconds with a two-digit integer part.
 *
 * @param value - The field, in [0, 60[.
 * @param fractionDigits - Decimals to show.
 * @returns The field, such as `'05.250'`.
 */
function formatField(value: number, fractionDigits: number): string {
  const text = roundToFractionDigits(value, fractionDigits).toFixed(fractionDigits);
  const integerLength = fractionDigits === 0 ? text.length : text.indexOf('.');
  return '0'.repeat(Math.max(0, TWO_DIGITS - integerLength)) + text;
}

/**
 * Names the hemisphere of a coordinate.
 *
 * @param value - The coordinate in decimal degrees.
 * @param axis - `'lat'` or `'lon'`.
 * @returns `N` or `S` for a latitude, `E` or `W` for a longitude.
 */
function hemisphereOf(value: number, axis: 'lat' | 'lon'): string {
  if (axis === 'lat') {
    return value < 0 ? 'S' : 'N';
  }
  return value < 0 ? 'W' : 'E';
}

import { roundToFractionDigits } from '../math';

/** Decimals of the last part when none is given: a metre on the ground for `dm`. */
const DEFAULT_FRACTION_DIGITS = 3;

const MINUTES_PER_DEGREE = 60;
const SECONDS_PER_MINUTE = 60;
const TWO_DIGITS = 2;
const LONGITUDE_DEGREE_DIGITS = 3;
const MAX_LATITUDE = 90;
const MAX_LONGITUDE = 180;

/**
 * Formats a latitude or a longitude for a nautical display: degrees and decimal minutes (`48°51.400′ N`, the
 * GPS and chart format), or degrees, minutes and seconds (`48°51′24.0″ N`). Degrees are zero-padded (2 digits
 * for a latitude, 3 for a longitude) so columns align.
 *
 * @param value - The coordinate in decimal degrees: positive north or east.
 * @param axis - `'lat'` for a latitude (N/S), `'lon'` for a longitude (E/W).
 * @param style - `'dm'` for degrees and decimal minutes, `'dms'` for degrees, minutes and seconds. Defaults to `'dm'`.
 * @param fractionDigits - Decimals of the last field: 3 for minutes (about 2 m), 1 for seconds (about 3 m). Defaults to
 * `3`.
 * @returns The formatted coordinate; `''` for a value out of range or not finite.
 * @example
 * formatGeoCoordinate(48.856_667, 'lat', 'dm', 3); // '48°51.400′ N'
 * formatGeoCoordinate(-2.35, 'lon', 'dm', 3); // '002°21.000′ W'
 * formatGeoCoordinate(48.856_667, 'lat', 'dms', 1); // '48°51′24.0″ N'
 */
export function formatGeoCoordinate(
  value: number,
  axis: 'lat' | 'lon',
  style?: 'dm' | 'dms' | null,
  fractionDigits?: number | null,
): string {
  const resolvedStyle = style ?? 'dm';
  const resolvedFractionDigits = fractionDigits ?? DEFAULT_FRACTION_DIGITS;
  const limit = axis === 'lat' ? MAX_LATITUDE : MAX_LONGITUDE;
  if (!Number.isFinite(value) || Math.abs(value) > limit) {
    return '';
  }
  const hemisphere = hemisphereOf(value, axis);
  const degreeDigits = axis === 'lat' ? TWO_DIGITS : LONGITUDE_DEGREE_DIGITS;
  const lastFieldUnits = resolvedStyle === 'dm' ? MINUTES_PER_DEGREE : MINUTES_PER_DEGREE * SECONDS_PER_MINUTE;
  // Rounded once, on the last field: 59.9999′ becomes the next degree instead of `60.000′`.
  const total = roundToFractionDigits(Math.abs(value) * lastFieldUnits, resolvedFractionDigits);
  const degrees = Math.trunc(total / lastFieldUnits);
  const rest = total - degrees * lastFieldUnits;
  const degreesText = `${String(degrees).padStart(degreeDigits, '0')}°`;
  if (resolvedStyle === 'dm') {
    return `${degreesText}${formatField(rest, resolvedFractionDigits)}′ ${hemisphere}`;
  }
  const minutes = Math.trunc(rest / SECONDS_PER_MINUTE);
  const seconds = rest - minutes * SECONDS_PER_MINUTE;
  return `${degreesText}${String(minutes).padStart(TWO_DIGITS, '0')}′${formatField(seconds, resolvedFractionDigits)}″ ${hemisphere}`;
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

import { formatGeoCoordinate } from './format-geo-coordinate';

/** Decimals of the minutes: a thousandth of a minute is about 2 m. */
const MINUTE_DIGITS = 3;

/**
 * Formats a latitude or a longitude like `formatGeoCoordinate`, the navigation way: degrees and decimal minutes.
 *
 * @param value - The coordinate in decimal degrees: positive north or east.
 * @param axis - `'lat'` for a latitude (N/S), `'lon'` for a longitude (E/W).
 * @returns The formatted coordinate; `''` for a value out of range or not finite.
 * @simple Degrees and decimal minutes, minutes to a thousandth (about 2 m).
 * @example
 * formatGeoCoordinateSimple(48.856_667, 'lat'); // '48°51.400′ N'
 */
export function formatGeoCoordinateSimple(value: number, axis: 'lat' | 'lon'): string {
  return formatGeoCoordinate(value, axis, 'dm', MINUTE_DIGITS);
}

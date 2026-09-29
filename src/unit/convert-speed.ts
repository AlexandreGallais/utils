import type { SpeedUnit } from './speed-unit.ts';

const SECONDS_PER_HOUR = 3600;
const METRES_PER_KILOMETRE = 1000;
/** International nautical mile (exact). */
const METRES_PER_NAUTICAL_MILE = 1852;
/** International mile (exact). */
const METRES_PER_MILE = 1609.344;

/** Metres per second in one unit of each speed. */
const METRES_PER_SECOND: Readonly<Record<SpeedUnit, number>> = {
  'm/s': 1,
  'km/h': METRES_PER_KILOMETRE / SECONDS_PER_HOUR,
  kn: METRES_PER_NAUTICAL_MILE / SECONDS_PER_HOUR,
  mph: METRES_PER_MILE / SECONDS_PER_HOUR,
};

/**
 * Converts a speed between units, with the exact definitions (1 kn = 1 852 m/h, 1 mi = 1 609.344 m).
 *
 * @param value - The speed, in `from` units.
 * @param from - Unit of `value`.
 * @param to - Unit of the result.
 * @returns The speed in `to` units.
 * @example
 * convertSpeed(10, 'kn', 'm/s'); // 5.1444…
 * convertSpeed(36, 'km/h', 'm/s'); // 10
 */
export function convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number {
  return from === to ? value : (value * METRES_PER_SECOND[from]) / METRES_PER_SECOND[to];
}

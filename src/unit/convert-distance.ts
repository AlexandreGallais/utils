/** A distance unit: metres, kilometres, nautical miles, feet, miles. */
export type DistanceUnit = 'ft' | 'km' | 'm' | 'mi' | 'nmi';

const METRES_PER_KILOMETRE = 1000;
/** International nautical mile (exact). */
const METRES_PER_NAUTICAL_MILE = 1852;
/** International foot (exact). */
const METRES_PER_FOOT = 0.3048;
/** International mile (exact). */
const METRES_PER_MILE = 1609.344;

/** Metres in one unit of each distance. */
const METRES: Readonly<Record<DistanceUnit, number>> = {
  m: 1,
  km: METRES_PER_KILOMETRE,
  nmi: METRES_PER_NAUTICAL_MILE,
  ft: METRES_PER_FOOT,
  mi: METRES_PER_MILE,
};

/**
 * Converts a distance between units, with the exact international definitions (1 nmi = 1 852 m,
 * 1 ft = 0.3048 m, 1 mi = 1 609.344 m).
 *
 * @param value - The distance, in `from` units.
 * @param from - Unit of `value`.
 * @param to - Unit of the result.
 * @returns The distance in `to` units.
 * @example
 * convertDistance(1, 'nmi', 'm'); // 1852
 * convertDistance(1000, 'ft', 'm'); // 304.8
 */
export function convertDistance(value: number, from: DistanceUnit, to: DistanceUnit): number {
  return from === to ? value : (value * METRES[from]) / METRES[to];
}

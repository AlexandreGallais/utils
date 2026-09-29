import type { MassUnit } from './mass-unit.ts';

/** Avoirdupois pound (exact). */
const KILOGRAMS_PER_POUND = 0.45359237;
const GRAMS_PER_KILOGRAM = 1000;
const KILOGRAMS_PER_TONNE = 1000;

/** Kilograms in one unit of each mass. */
const KILOGRAMS: Readonly<Record<MassUnit, number>> = {
  g: 1 / GRAMS_PER_KILOGRAM,
  kg: 1,
  t: KILOGRAMS_PER_TONNE,
  lb: KILOGRAMS_PER_POUND,
};

/**
 * Converts a mass between units: cargo, fuel mass, payload.
 *
 * @param value - The mass, in `from` units.
 * @param from - Unit of `value`.
 * @param to - Unit of the result.
 * @returns The mass in `to` units.
 * @example
 * convertMass(2.5, 't', 'kg'); // 2500
 * convertMass(1, 'lb', 'kg'); // 0.45359237
 */
export function convertMass(value: number, from: MassUnit, to: MassUnit): number {
  return from === to ? value : (value * KILOGRAMS[from]) / KILOGRAMS[to];
}

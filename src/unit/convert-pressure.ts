import type { PressureUnit } from './pressure-unit.ts';

const PASCALS_PER_BAR = 100_000;
const PASCALS_PER_HECTOPASCAL = 100;
const PASCALS_PER_KILOPASCAL = 1000;
/** Pound-force per square inch (exact from the avoirdupois pound and the inch). */
const PASCALS_PER_PSI = 6894.757293168;

/**
 * Converts a pressure between units: gauges in bar, weather in hectopascals, US equipment in psi.
 *
 * @param value - The pressure, in `from` units.
 * @param from - Unit of `value`.
 * @param to - Unit of the result.
 * @returns The pressure in `to` units.
 * @example
 * convertPressure(1, 'bar', 'psi'); // 14.5037…
 * convertPressure(1013.25, 'hPa', 'bar'); // 1.01325
 */
export function convertPressure(value: number, from: PressureUnit, to: PressureUnit): number {
  return from === to ? value : (value * pascalsPer(from)) / pascalsPer(to);
}

/**
 * Gives the size of a pressure unit.
 *
 * @param unit - A pressure unit.
 * @returns Pascals in one `unit`.
 */
function pascalsPer(unit: PressureUnit): number {
  switch (unit) {
    case 'Pa': {
      return 1;
    }
    case 'hPa': {
      return PASCALS_PER_HECTOPASCAL;
    }
    case 'kPa': {
      return PASCALS_PER_KILOPASCAL;
    }
    case 'bar': {
      return PASCALS_PER_BAR;
    }
    case 'psi': {
      return PASCALS_PER_PSI;
    }
  }
}

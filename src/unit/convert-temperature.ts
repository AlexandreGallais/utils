import type { TemperatureUnit } from './temperature-unit.ts';

/** 0 °C in kelvins. */
const KELVIN_OFFSET = 273.15;
/** 0 °C in degrees Fahrenheit. */
const FAHRENHEIT_OFFSET = 32;
/** Fahrenheit degrees per Celsius degree. */
const FAHRENHEIT_PER_CELSIUS = 1.8;

/**
 * Converts a temperature between units. Unlike other units, temperature scales have different zeros, so the
 * conversion is not a plain factor.
 *
 * @param value - The temperature, in `from` units.
 * @param from - Unit of `value`.
 * @param to - Unit of the result.
 * @returns The temperature in `to` units.
 * @example
 * convertTemperature(100, 'C', 'F'); // 212
 * convertTemperature(0, 'K', 'C'); // -273.15
 */
export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  if (from === to) {
    return value;
  }
  const celsius = toCelsius(value, from);
  if (to === 'C') {
    return celsius;
  }
  return to === 'F' ? celsius * FAHRENHEIT_PER_CELSIUS + FAHRENHEIT_OFFSET : celsius + KELVIN_OFFSET;
}

/**
 * Converts a temperature to degrees Celsius.
 *
 * @param value - The temperature, in `unit`.
 * @param unit - Unit of `value`.
 * @returns The temperature in degrees Celsius.
 */
function toCelsius(value: number, unit: TemperatureUnit): number {
  if (unit === 'C') {
    return value;
  }
  return unit === 'F' ? (value - FAHRENHEIT_OFFSET) / FAHRENHEIT_PER_CELSIUS : value - KELVIN_OFFSET;
}

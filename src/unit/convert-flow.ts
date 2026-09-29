import type { FlowUnit } from './flow-unit.ts';

/** US liquid gallon (exact: 231 cubic inches). */
const LITRES_PER_US_GALLON = 3.785411784;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const LITRES_PER_CUBIC_METRE = 1000;

/** Litres per second in one unit of each flow. */
const LITRES_PER_SECOND: Readonly<Record<FlowUnit, number>> = {
  'L/s': 1,
  'L/min': 1 / SECONDS_PER_MINUTE,
  'm³/h': LITRES_PER_CUBIC_METRE / SECONDS_PER_HOUR,
  'gal/min': LITRES_PER_US_GALLON / SECONDS_PER_MINUTE,
};

/**
 * Converts a volumetric flow between units: pumps, fuel consumption, cooling circuits.
 *
 * @param value - The flow, in `from` units.
 * @param from - Unit of `value`.
 * @param to - Unit of the result.
 * @returns The flow in `to` units.
 * @example
 * convertFlow(36, 'm³/h', 'L/s'); // 10
 * convertFlow(1, 'gal/min', 'L/min'); // 3.785…
 */
export function convertFlow(value: number, from: FlowUnit, to: FlowUnit): number {
  return from === to ? value : (value * LITRES_PER_SECOND[from]) / LITRES_PER_SECOND[to];
}

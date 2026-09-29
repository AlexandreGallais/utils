import { remap } from '../math/remap.ts';
import type { Scale } from './scale.ts';

/**
 * Creates a linear scale for a chart axis, like d3's `scaleLinear`: data values in `domain` map to screen
 * coordinates in `range`. Swap the range ends for a vertical axis where values grow upwards. Values out of
 * the domain are extrapolated.
 *
 * @param domain - The data interval, such as `[0, 100]`.
 * @param range - The screen interval, such as `[height, 0]` for a y axis growing upwards.
 * @returns The scale: a function with `invert`, `domain` and `range`.
 * @example
 * const y = createLinearScale([0, 100], [200, 0]);
 * y(25); // 150
 * y.invert(50); // 75
 */
export function createLinearScale(
  domain: readonly [start: number, end: number],
  range: readonly [start: number, end: number],
): Scale {
  const [domainStart, domainEnd] = domain;
  const [rangeStart, rangeEnd] = range;
  return Object.assign((value: number): number => remap(value, domainStart, domainEnd, rangeStart, rangeEnd, false), {
    domain: [domainStart, domainEnd] as const,
    range: [rangeStart, rangeEnd] as const,
    invert: (coordinate: number): number => remap(coordinate, rangeStart, rangeEnd, domainStart, domainEnd, false),
  });
}

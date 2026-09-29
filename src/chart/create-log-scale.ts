import type { Scale } from './scale.ts';

/** Base of the logarithm: each power of ten takes the same length. */
const BASE = 10;

/**
 * Creates a logarithmic scale for a chart axis, like d3's `scaleLog`: each power of ten takes the same
 * length, for values spanning several orders of magnitude (frequencies, concentrations, sound levels).
 *
 * @param domain - The data interval, both ends strictly positive, such as `[1, 10_000]`.
 * @param range - The screen interval, such as `[height, 0]` for a y axis growing upwards.
 * @returns The scale: a function with `invert`, `domain` and `range`; a value not strictly positive
 * projects to `NaN`.
 * @throws {RangeError} When a domain end is not a strictly positive finite number.
 * @example
 * const x = createLogScale([1, 1000], [0, 300]);
 * x(10); // 100
 * x.invert(200); // 100
 */
export function createLogScale(
  domain: readonly [start: number, end: number],
  range: readonly [start: number, end: number],
): Scale {
  const [domainStart, domainEnd] = domain;
  const [rangeStart, rangeEnd] = range;
  for (const end of domain) {
    if (!Number.isFinite(end) || end <= 0) {
      throw new RangeError(`domain ends must be strictly positive finite numbers, got ${end}`);
    }
  }
  const logStart = Math.log10(domainStart);
  const logSpan = Math.log10(domainEnd) - logStart;
  const rangeSpan = rangeEnd - rangeStart;
  return Object.assign(
    (value: number): number =>
      logSpan === 0 ? rangeStart : rangeStart + ((Math.log10(value) - logStart) / logSpan) * rangeSpan,
    {
      domain: [domainStart, domainEnd] as const,
      range: [rangeStart, rangeEnd] as const,
      invert: (coordinate: number): number =>
        rangeSpan === 0 ? domainStart : BASE ** (logStart + ((coordinate - rangeStart) / rangeSpan) * logSpan),
    },
  );
}

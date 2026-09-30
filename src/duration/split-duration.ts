import type { DurationParts } from './duration-parts';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;

/**
 * Splits a duration in milliseconds into days, hours, minutes, seconds and milliseconds, to display or
 * reformat it. A negative duration gives positive parts and a `sign` of -1.
 *
 * @param ms - The duration in milliseconds, possibly negative or fractional.
 * @returns The parts, or `undefined` for `NaN` or an infinite duration.
 * @example
 * splitDuration(93_784_567);
 * // { sign: 1, days: 1, hours: 2, minutes: 3, seconds: 4, milliseconds: 567, totalMilliseconds: 93784567 }
 */
export function splitDuration(ms: number): DurationParts | undefined {
  if (!Number.isFinite(ms)) {
    return undefined;
  }
  const absolute = Math.abs(ms);
  return {
    sign: ms < 0 ? -1 : 1,
    days: Math.floor(absolute / MS_PER_DAY),
    hours: Math.floor((absolute % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((absolute % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((absolute % MS_PER_MINUTE) / MS_PER_SECOND),
    milliseconds: absolute % MS_PER_SECOND,
    totalMilliseconds: ms + 0,
  };
}

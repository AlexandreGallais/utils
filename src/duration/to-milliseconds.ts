import type { DurationInput } from './duration-input.ts';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;
const MS_PER_WEEK = 604_800_000;

/**
 * Adds up a duration given in several units, instead of writing `5 * 60 * 1000` in the code: timeouts,
 * intervals, simulation steps.
 *
 * @param duration - The units to add, each optional.
 * @returns The duration in milliseconds.
 * @example
 * toMilliseconds({ minutes: 5, seconds: 30 }); // 330000
 * setTimeout(refresh, toMilliseconds({ seconds: 2 }));
 */
export function toMilliseconds(duration: DurationInput): number {
  const { weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = duration;
  return (
    weeks * MS_PER_WEEK +
    days * MS_PER_DAY +
    hours * MS_PER_HOUR +
    minutes * MS_PER_MINUTE +
    seconds * MS_PER_SECOND +
    milliseconds
  );
}

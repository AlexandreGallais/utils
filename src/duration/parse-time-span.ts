import type { DurationParts } from './duration-parts.ts';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;
const MAX_HOURS = 23;
const MAX_MINUTES_OR_SECONDS = 59;
/** A `TimeSpan` fraction has up to 7 digits (100 ns ticks); digits beyond milliseconds become decimals. */
const MILLISECOND_DIGITS = 3;

/**
 * `[-][d.]hh:mm:ss[.fffffff]` (format `c`, JSON) or `[-][d:]h:mm:ss[.FFFFFFF]` (formats `g` / `G`).
 */
const TIME_SPAN_PATTERN =
  /^(?<sign>-)?(?:(?<days>\d+)[.:])?(?<hours>\d{1,2}):(?<minutes>\d{2}):(?<seconds>\d{2})(?:[,.](?<fraction>\d{1,7}))?$/v;

/**
 * Parses a C# / .NET `TimeSpan` string, as serialized by a .NET backend: the constant format `c`
 * (`1.02:03:04.5670000`, also the JSON format) and the general formats `g` / `G` (`1:02:03:04.567`).
 * Fractions keep the 100 ns tick precision as decimals of milliseconds.
 *
 * @param input - The `TimeSpan` text; surrounding spaces are ignored.
 * @returns The duration parts, or `undefined` when the text is not a valid `TimeSpan` (hours above 23,
 * minutes or seconds above 59, missing field).
 * @example
 * parseTimeSpan('1.02:03:04.5670000');
 * // { sign: 1, days: 1, hours: 2, minutes: 3, seconds: 4, milliseconds: 567, totalMilliseconds: 93784567 }
 * parseTimeSpan('-00:00:30')?.totalMilliseconds; // -30000
 */
export function parseTimeSpan(input: string): DurationParts | undefined {
  const groups = TIME_SPAN_PATTERN.exec(input.trim())?.groups;
  if (!groups) {
    return undefined;
  }
  const days = Number(groups['days'] ?? 0);
  const hours = Number(groups['hours']);
  const minutes = Number(groups['minutes']);
  const seconds = Number(groups['seconds']);
  if (hours > MAX_HOURS || minutes > MAX_MINUTES_OR_SECONDS || seconds > MAX_MINUTES_OR_SECONDS) {
    return undefined;
  }
  const fraction = groups['fraction'] ?? '';
  const milliseconds = Number(
    `${fraction.slice(0, MILLISECOND_DIGITS).padEnd(MILLISECOND_DIGITS, '0')}.${fraction.slice(MILLISECOND_DIGITS)}`,
  );
  const sign = groups['sign'] === undefined ? 1 : -1;
  const total =
    days * MS_PER_DAY + hours * MS_PER_HOUR + minutes * MS_PER_MINUTE + seconds * MS_PER_SECOND + milliseconds;
  return {
    sign: total === 0 ? 1 : sign,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    totalMilliseconds: sign * total + 0,
  };
}

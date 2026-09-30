import type { DurationParts } from './duration-parts';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;
const MS_DIGITS = 3;

const TIME_SPAN_PATTERN =
  /^(?<sign>-)?(?:(?<days>\d+)[.:])?(?<hours>\d{1,2}):(?<minutes>\d{2}):(?<seconds>\d{2})(?:[,.](?<fraction>\d{1,7}))?$/v;

/**
 * Parses a .NET `TimeSpan`: the constant format `c` (`1.02:03:04.5670000`, the JSON one) or the general
 * formats `g` / `G` (`1:02:03:04.567`).
 *
 * @param input - The `TimeSpan` text; surrounding spaces are ignored.
 * @returns The parts of the duration.
 * @throws {TypeError} When the text is not a `TimeSpan`.
 * @example
 * parseTimeSpan('1.02:03:04.5670000');
 * // { sign: 1, days: 1, hours: 2, minutes: 3, seconds: 4, milliseconds: 567, totalMilliseconds: 93784567 }
 * parseTimeSpan('-00:00:30').totalMilliseconds; // -30000
 */
export function parseTimeSpan(input: string): DurationParts {
  const groups = TIME_SPAN_PATTERN.exec(input.trim())?.groups;
  if (!groups) {
    throw new TypeError(`Invalid TimeSpan: '${input}'`);
  }
  const days = Number(groups['days'] ?? 0);
  const hours = Number(groups['hours']);
  const minutes = Number(groups['minutes']);
  const seconds = Number(groups['seconds']);
  const fraction = groups['fraction'] ?? '';
  const milliseconds = Number(`${fraction.slice(0, MS_DIGITS).padEnd(MS_DIGITS, '0')}.${fraction.slice(MS_DIGITS)}`);
  const total =
    days * MS_PER_DAY + hours * MS_PER_HOUR + minutes * MS_PER_MINUTE + seconds * MS_PER_SECOND + milliseconds;
  const sign = groups['sign'] === undefined || total === 0 ? 1 : -1;
  return { sign, days, hours, minutes, seconds, milliseconds, totalMilliseconds: sign * total };
}

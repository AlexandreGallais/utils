const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;
const TICKS_PER_MS = 10_000;
const TICK_DIGITS = 7;

const TIME_SPAN_PATTERN =
  /^(?<sign>-)?(?:(?<days>\d+)[.:])?(?<hours>\d{1,2}):(?<minutes>\d{2}):(?<seconds>\d{2})(?:[,.](?<fraction>\d{1,7}))?$/v;

/**
 * Parses a .NET `TimeSpan` into milliseconds: the constant format `c` (`1.02:03:04.5670000`, the JSON one)
 * or the general formats `g` / `G` (`1:02:03:04.567`). The 100 ns ticks become decimals of milliseconds.
 *
 * @param input - The `TimeSpan` text; surrounding spaces are ignored.
 * @returns The duration in milliseconds, negative for a negative `TimeSpan`.
 * @throws {TypeError} When the text is not a `TimeSpan`.
 * @example
 * parseTimeSpan('1.02:03:04.5670000'); // 93784567
 * parseTimeSpan('-00:00:30'); // -30000
 */
export function parseTimeSpan(input: string): number {
  const groups = TIME_SPAN_PATTERN.exec(input.trim())?.groups;
  if (!groups) {
    throw new TypeError(`Invalid TimeSpan: '${input}'`);
  }
  const ticks = Number((groups['fraction'] ?? '').padEnd(TICK_DIGITS, '0'));
  const milliseconds =
    Number(groups['days'] ?? 0) * MS_PER_DAY +
    Number(groups['hours']) * MS_PER_HOUR +
    Number(groups['minutes']) * MS_PER_MINUTE +
    Number(groups['seconds']) * MS_PER_SECOND +
    ticks / TICKS_PER_MS;
  return groups['sign'] === undefined ? milliseconds : -milliseconds;
}

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const DECIMAL_BASE = 10;
const TWO_DIGITS = 2;
/** Most decimals of a second worth showing: milliseconds. */
const MAX_SECOND_FRACTION_DIGITS = 3;

/**
 * Formats a duration like a stopwatch: `m:ss`, or `h:mm:ss` from one hour, optionally with fractions of a
 * second. Fractions are truncated, not rounded, so a countdown never shows a second that has not elapsed.
 *
 * @param ms - The duration in milliseconds; a negative duration gets a `-` sign.
 * @param secondFractionDigits - Decimals of the seconds, an integer in [0, 3]. Defaults to `0`.
 * @returns The formatted duration; `'--:--'` for `NaN` or an infinite duration.
 * @throws {RangeError} When `secondFractionDigits` is not an integer in [0, 3].
 * @example
 * formatDuration(309_000, 0); // '5:09'
 * formatDuration(3_909_000, 0); // '1:05:09'
 * formatDuration(9870, 1); // '0:09.8'
 */
export function formatDuration(ms: number, secondFractionDigits?: number | null): string {
  const resolvedSecondFractionDigits = secondFractionDigits ?? 0;
  if (
    !Number.isSafeInteger(resolvedSecondFractionDigits) ||
    resolvedSecondFractionDigits < 0 ||
    resolvedSecondFractionDigits > MAX_SECOND_FRACTION_DIGITS
  ) {
    throw new RangeError(`secondFractionDigits must be an integer in [0, 3], got ${resolvedSecondFractionDigits}`);
  }
  if (!Number.isFinite(ms)) {
    return '--:--';
  }
  const unitsPerSecond = DECIMAL_BASE ** resolvedSecondFractionDigits;
  const totalUnits = Math.trunc((Math.abs(ms) * unitsPerSecond) / MS_PER_SECOND);
  const totalSeconds = Math.trunc(totalUnits / unitsPerSecond);
  const totalMinutes = Math.trunc(totalSeconds / SECONDS_PER_MINUTE);
  const hours = Math.trunc(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;
  const fraction =
    resolvedSecondFractionDigits > 0
      ? `.${String(totalUnits % unitsPerSecond).padStart(resolvedSecondFractionDigits, '0')}`
      : '';
  const seconds = `${pad(totalSeconds % SECONDS_PER_MINUTE)}${fraction}`;
  const sign = ms < 0 && totalUnits > 0 ? '-' : '';
  return hours > 0 ? `${sign}${hours}:${pad(minutes)}:${seconds}` : `${sign}${minutes}:${seconds}`;
}

/**
 * Pads a clock field to two digits.
 *
 * @param value - Minutes or seconds, in [0, 59].
 * @returns The value on two digits, such as `'05'`.
 */
function pad(value: number): string {
  return String(value).padStart(TWO_DIGITS, '0');
}

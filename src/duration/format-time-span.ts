import { splitDuration } from './split-duration';

const TWO_DIGITS = 2;
/** A `TimeSpan` fraction has 7 digits: ticks of 100 ns, that is 10 000 per millisecond. */
const TICK_DIGITS = 7;
const TICKS_PER_MILLISECOND = 10_000;

/**
 * Formats a duration as a C# / .NET `TimeSpan` in the constant format `c` (`[-][d.]hh:mm:ss[.fffffff]`),
 * the format a .NET backend parses and serializes to JSON. The fraction is written only when not zero,
 * rounded to the 100 ns tick.
 *
 * @param ms - The duration in milliseconds, possibly negative or fractional.
 * @returns The `TimeSpan` text; `''` for `NaN` or an infinite duration.
 * @example
 * formatTimeSpan(93_784_567); // '1.02:03:04.5670000'
 * formatTimeSpan(-30_000); // '-00:00:30'
 */
export function formatTimeSpan(ms: number): string {
  const parts = splitDuration(Math.round(ms * TICKS_PER_MILLISECOND) / TICKS_PER_MILLISECOND);
  if (!parts) {
    return '';
  }
  const sign = parts.sign < 0 ? '-' : '';
  const days = parts.days > 0 ? `${parts.days}.` : '';
  const clock = [parts.hours, parts.minutes, parts.seconds].map((value) => pad(value)).join(':');
  const ticks = Math.round(parts.milliseconds * TICKS_PER_MILLISECOND);
  const fraction = ticks > 0 ? `.${String(ticks).padStart(TICK_DIGITS, '0')}` : '';
  return `${sign}${days}${clock}${fraction}`;
}

/**
 * Pads a clock field to two digits.
 *
 * @param value - Hours, minutes or seconds.
 * @returns The value on two digits, such as `'05'`.
 */
function pad(value: number): string {
  return String(value).padStart(TWO_DIGITS, '0');
}

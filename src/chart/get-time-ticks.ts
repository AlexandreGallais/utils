import type { TimeTicks } from './time-ticks.ts';

/** Milliseconds per minute. */
const MINUTE_MS = 60_000;
/** Milliseconds per week, the largest round step; beyond, steps are multiples of it. */
const WEEK_MS = 604_800_000;
/** Milliseconds per unit of the step table. */
const UNIT_MS: Readonly<Record<string, number>> = { ms: 1, s: 1000, m: MINUTE_MS, h: 3_600_000, d: 86_400_000 };
/** Round intervals of a time axis, ascending, as `<count><unit>` (easier to read than milliseconds). */
const STEPS =
  '1ms 2ms 5ms 10ms 20ms 50ms 100ms 200ms 500ms 1s 2s 5s 10s 15s 30s 1m 2m 5m 10m 15m 30m 1h 2h 3h 6h 12h 1d 2d';
/** The round intervals, in milliseconds. */
const STEPS_MS: readonly number[] = STEPS.split(' ').map((step) => {
  const unit = step.replace(/^\d+/v, '');
  /* v8 ignore next -- `?? 0` only satisfies noUncheckedIndexedAccess: every unit of the table is known. */
  return Number(step.slice(0, step.length - unit.length)) * (UNIT_MS[unit] ?? 0);
});

/**
 * Computes round graduations for a time axis: every 5 s, 15 s, 1 min, 30 min, 6 h… depending on the
 * visible span, aligned on round clock times (12:15:00, not 12:14:37). In local time, the alignment uses
 * the time zone offset at `start`; a daylight saving change inside the interval shifts the later ticks by
 * one hour.
 *
 * @param start - Start of the visible interval, in milliseconds since the epoch.
 * @param end - End of the visible interval.
 * @param count - Approximate number of ticks wanted.
 * @param isUtc - Whether to align on UTC clock times instead of local ones.
 * @returns The ticks within the interval and their step; beyond a week, steps are multiples of a week.
 * @throws {RangeError} When `count` is not a positive integer or the interval is invalid.
 * @example
 * const { values, stepMs } = getTimeTicks(Date.now() - 600_000, Date.now(), 5, false); // a tick every 2 minutes
 * const labels = values.map((value) => formatDate(new Date(value), getTimeTickPattern(stepMs), false));
 */
export function getTimeTicks(start: number, end: number, count: number, isUtc: boolean): TimeTicks {
  if (!Number.isSafeInteger(count) || count < 1) {
    throw new RangeError(`count must be a positive integer, got ${count}`);
  }
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end) {
    throw new RangeError(`[${start}, ${end}] is not a valid interval`);
  }
  const rawStep = (end - start) / count;
  const stepMs = STEPS_MS.find((step) => step >= rawStep) ?? Math.ceil(rawStep / WEEK_MS) * WEEK_MS;
  // Shift to local clock time, so that multiples of the step fall on round local times.
  const startDate = new Date(start);
  const offsetMs = isUtc ? 0 : -startDate.getTimezoneOffset() * MINUTE_MS;
  const first = Math.ceil((start + offsetMs) / stepMs);
  const last = Math.floor((end + offsetMs) / stepMs);
  const values = Array.from({ length: last - first + 1 }, (_, index) => (first + index) * stepMs - offsetMs);
  return { values, stepMs };
}

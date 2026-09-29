/** Milliseconds per second. */
const SECOND_MS = 1000;
/** Milliseconds per minute. */
const MINUTE_MS = 60_000;
/** Milliseconds per day. */
const DAY_MS = 86_400_000;

/**
 * Chooses the `formatDate` pattern that shows what changes between two ticks of a time axis, no more:
 * milliseconds for sub-second steps, seconds, minutes, then the date.
 *
 * @param stepMs - The step of the ticks, such as the `stepMs` of `getTimeTicks`.
 * @returns A pattern: `'HH:mm:ss.SSS'`, `'HH:mm:ss'`, `'HH:mm'`, `'DD/MM HH:mm'` or `'DD/MM'`.
 * @example
 * getTimeTickPattern(15_000); // 'HH:mm:ss'
 * getTimeTickPattern(86_400_000); // 'DD/MM'
 */
export function getTimeTickPattern(stepMs: number): string {
  if (stepMs < SECOND_MS) {
    return 'HH:mm:ss.SSS';
  }
  if (stepMs < MINUTE_MS) {
    return 'HH:mm:ss';
  }
  if (stepMs < DAY_MS) {
    return 'HH:mm';
  }
  return stepMs % DAY_MS === 0 ? 'DD/MM' : 'DD/MM HH:mm';
}

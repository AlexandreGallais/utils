import { formatDuration } from './format-duration';

/**
 * Formats a duration like `formatDuration`, to the whole second.
 *
 * @param ms - The duration, in milliseconds.
 * @returns The formatted duration.
 * @simple No decimals on the seconds.
 * @example
 * formatDurationSimple(3_725_400); // '1:02:05'
 */
export function formatDurationSimple(ms: number): string {
  return formatDuration(ms, 0);
}

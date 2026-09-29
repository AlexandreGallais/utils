import { formatCompact } from './format-compact.ts';

/**
 * Formats a number in short form like `formatCompact`, always the same way: `1.2K`, `3.4M`.
 *
 * @param value - The number to shorten.
 * @returns The compact text.
 * @simple Locale `'en-US'` (`K`, `M`, `B` and a `.` before the decimal), one decimal at most.
 * @example
 * formatCompactSimple(1234); // '1.2K'
 * formatCompactSimple(15_300_000); // '15.3M'
 */
export function formatCompactSimple(value: number): string {
  return formatCompact(value, 'en-US', 1);
}

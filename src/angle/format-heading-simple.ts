import { formatHeading } from './format-heading.ts';

/**
 * Formats a heading like `formatHeading`, to the whole degree: `'005°'`.
 *
 * @param degrees - The heading, in degrees, any value (wrapped into [0, 360[).
 * @returns The formatted heading.
 * @simple No decimals.
 * @example
 * formatHeadingSimple(4.6); // '005°'
 */
export function formatHeadingSimple(degrees: number): string {
  return formatHeading(degrees, 0);
}

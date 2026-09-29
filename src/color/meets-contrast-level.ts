import type { ContrastLevel } from './contrast-level.ts';
import { getContrastRatio } from './get-contrast-ratio.ts';
import type { Rgb } from './rgb.ts';

/** WCAG 2.x minimum contrast ratios. Large text is at least 18pt, or 14pt bold. */
const AA_NORMAL_TEXT = 4.5;
const AA_LARGE_TEXT = 3;
const AAA_NORMAL_TEXT = 7;
const AAA_LARGE_TEXT = 4.5;

/**
 * Checks whether two colors reach a WCAG 2.x contrast level: AA needs 4.5 (3 for large text), AAA needs 7
 * (4.5 for large text).
 *
 * @param a - Text color.
 * @param b - Background color.
 * @param level - Conformance level to reach.
 * @param isLargeText - Whether the text is large (at least 18pt, or 14pt bold).
 * @returns `true` when the contrast ratio reaches the level's threshold.
 * @example
 * meetsContrastLevel({ r: 118, g: 118, b: 118 }, { r: 255, g: 255, b: 255 }, 'AA', false); // true (4.54)
 */
export function meetsContrastLevel(a: Rgb, b: Rgb, level: ContrastLevel, isLargeText: boolean): boolean {
  return getContrastRatio(a, b) >= contrastThreshold(level, isLargeText);
}

/**
 * Looks up the minimum contrast ratio of a WCAG level.
 *
 * @param level - Conformance level.
 * @param isLargeText - Whether the text is large.
 * @returns The minimum ratio.
 */
function contrastThreshold(level: ContrastLevel, isLargeText: boolean): number {
  if (level === 'AAA') {
    return isLargeText ? AAA_LARGE_TEXT : AAA_NORMAL_TEXT;
  }
  return isLargeText ? AA_LARGE_TEXT : AA_NORMAL_TEXT;
}

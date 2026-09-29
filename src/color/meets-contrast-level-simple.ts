import { meetsContrastLevel } from './meets-contrast-level.ts';
import type { ContrastLevel } from './contrast-level.ts';
import type { Rgb } from './rgb.ts';

/**
 * Checks whether two colors reach a WCAG 2 contrast level like `meetsContrastLevel`, for normal-size text.
 *
 * @param text - Text color.
 * @param background - Background color.
 * @param level - Conformance level to reach: `'AA'` or `'AAA'`.
 * @returns `true` when the contrast ratio reaches the level.
 * @simple Normal text (not large).
 * @example
 * meetsContrastLevelSimple(gray, white, 'AA');
 */
export function meetsContrastLevelSimple(text: Rgb, background: Rgb, level: ContrastLevel): boolean {
  return meetsContrastLevel(text, background, level, false);
}

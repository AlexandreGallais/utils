import type { ApcaLevel } from './apca-level.ts';
import { getApcaContrast } from './get-apca-contrast.ts';
import type { Rgb } from './rgb.ts';

/** Minimum absolute APCA contrast (`Lc`) of each use. */
const MIN_CONTRAST: Readonly<Record<ApcaLevel, number>> = {
  'fluent-text': 90,
  'body-text': 75,
  'content-text': 60,
  'large-text': 45,
  'spot-text': 30,
  'non-text': 15,
};

/**
 * Checks whether a text or graphic color is readable enough on a background for a given use, with APCA
 * (the contrast method of the upcoming WCAG 3): it accounts for the polarity (dark on light or light on
 * dark) and for the size of the text, where the WCAG 2 ratio does not.
 *
 * @param text - Color of the text or graphic.
 * @param background - Background color.
 * @param level - The use of the text, which sets the minimum contrast (see `ApcaLevel`).
 * @returns `true` when the absolute contrast reaches the minimum of the use.
 * @example
 * meetsApcaLevel({ r: 136, g: 136, b: 136 }, { r: 255, g: 255, b: 255 }, 'content-text'); // true (Lc 63.1)
 * meetsApcaLevel({ r: 136, g: 136, b: 136 }, { r: 255, g: 255, b: 255 }, 'body-text'); // false
 */
export function meetsApcaLevel(text: Rgb, background: Rgb, level: ApcaLevel): boolean {
  return Math.abs(getApcaContrast(text, background)) >= MIN_CONTRAST[level];
}

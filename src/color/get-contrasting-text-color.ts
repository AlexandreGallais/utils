import type { Rgb } from './rgb';

const MAX_CHANNEL = 255;
const GAMMA = 2.4;
const RED_WEIGHT = 0.212_672_9;
const GREEN_WEIGHT = 0.715_152_2;
const BLUE_WEIGHT = 0.072_175;
const BLACK_THRESHOLD = 0.022;
const BLACK_CLAMP = 1.414;
const DARK_TEXT_BACKGROUND = 0.56;
const DARK_TEXT = 0.57;
const LIGHT_TEXT_BACKGROUND = 0.65;
const BLACK_LUMINANCE = BLACK_THRESHOLD ** BLACK_CLAMP;

function getLuminance({ r, g, b }: Rgb): number {
  const luminance =
    RED_WEIGHT * (r / MAX_CHANNEL) ** GAMMA +
    GREEN_WEIGHT * (g / MAX_CHANNEL) ** GAMMA +
    BLUE_WEIGHT * (b / MAX_CHANNEL) ** GAMMA;
  return luminance < BLACK_THRESHOLD ? luminance + (BLACK_THRESHOLD - luminance) ** BLACK_CLAMP : luminance;
}

/**
 * Picks the text color, pure black or pure white, that reads best on a background. Uses the APCA contrast
 * of WCAG 3, closer to perception than the WCAG 2 ratio: white wins on a saturated red, for instance.
 *
 * @param background - The background color, such as the result of `getSvgFillColor`.
 * @returns `'#000000'` or `'#ffffff'`.
 * @example
 * getContrastingTextColor({ r: 255, g: 255, b: 0 }); // '#000000'
 * getContrastingTextColor({ r: 255, g: 0, b: 0 }); // '#ffffff'
 * label.setAttribute('fill', getContrastingTextColor(getSvgFillColor(tank)));
 */
export function getContrastingTextColor(background: Rgb): '#000000' | '#ffffff' {
  const luminance = getLuminance(background);
  const blackTextContrast = luminance ** DARK_TEXT_BACKGROUND - BLACK_LUMINANCE ** DARK_TEXT;
  const whiteTextContrast = 1 - luminance ** LIGHT_TEXT_BACKGROUND;
  return blackTextContrast >= whiteTextContrast ? '#000000' : '#ffffff';
}

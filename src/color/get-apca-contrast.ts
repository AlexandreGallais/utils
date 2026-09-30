import type { Rgb } from './rgb';

/** APCA-W3 0.0.98G-4g constants (Myndex): screen luminance of the sRGB channels, with a plain 2.4 exponent. */
const MAX_CHANNEL = 255;
const MAIN_TRC = 2.4;
const RED_COEFFICIENT = 0.2126729;
const GREEN_COEFFICIENT = 0.7151522;
const BLUE_COEFFICIENT = 0.072175;
/** Exponents of the background and text luminances, for normal (dark text) and reverse (light text) polarity. */
const NORMAL_BACKGROUND_EXPONENT = 0.56;
const NORMAL_TEXT_EXPONENT = 0.57;
const REVERSE_TEXT_EXPONENT = 0.62;
const REVERSE_BACKGROUND_EXPONENT = 0.65;
/** Soft clamp of near-black luminances. */
const BLACK_THRESHOLD = 0.022;
const BLACK_CLAMP = 1.414;
const SCALE = 1.14;
const LOW_OFFSET = 0.027;
const LOW_CLIP = 0.1;
/** Luminance differences below this are no contrast at all. */
const DELTA_Y_MIN = 0.0005;
const PERCENT = 100;

/**
 * Computes the APCA lightness contrast (Lc) of a text color over a background, the perceptual contrast
 * method of the WCAG 3 draft (APCA-W3 0.0.98G-4g). Unlike the WCAG 2 ratio, it depends on which color is the
 * text: dark text on a light background gives a positive Lc, light text on a dark background a negative one.
 * Typical targets, as absolute values: 90 for body text, 75 for large text, 60 for bold labels, 45 for
 * large headings, 30 for non-text elements.
 *
 * @param text - Color of the text (or the foreground element); alpha ignored.
 * @param background - Color behind it; alpha ignored.
 * @returns The Lc value, roughly in [-108, 106]; `0` when the contrast is too low to matter.
 * @example
 * getApcaContrast({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }); // 106.04… (black on white)
 * getApcaContrast({ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 }); // -107.88… (white on black)
 */
export function getApcaContrast(text: Rgb, background: Rgb): number {
  const textY = softClampBlack(screenLuminance(text));
  const backgroundY = softClampBlack(screenLuminance(background));
  if (Math.abs(backgroundY - textY) < DELTA_Y_MIN) {
    return 0;
  }
  if (backgroundY > textY) {
    const contrast = (backgroundY ** NORMAL_BACKGROUND_EXPONENT - textY ** NORMAL_TEXT_EXPONENT) * SCALE;
    return contrast < LOW_CLIP ? 0 : (contrast - LOW_OFFSET) * PERCENT;
  }
  const contrast = (backgroundY ** REVERSE_BACKGROUND_EXPONENT - textY ** REVERSE_TEXT_EXPONENT) * SCALE;
  return contrast > -LOW_CLIP ? 0 : (contrast + LOW_OFFSET) * PERCENT;
}

/**
 * Computes the APCA screen luminance of a color (a simple 2.4 power per channel, not the sRGB curve).
 *
 * @param color - The color, channels in [0, 255].
 * @returns The luminance, in [0, 1].
 */
function screenLuminance(color: Rgb): number {
  return (
    RED_COEFFICIENT * (color.r / MAX_CHANNEL) ** MAIN_TRC +
    GREEN_COEFFICIENT * (color.g / MAX_CHANNEL) ** MAIN_TRC +
    BLUE_COEFFICIENT * (color.b / MAX_CHANNEL) ** MAIN_TRC
  );
}

/**
 * Raises near-black luminances slightly, as flare does on a real screen.
 *
 * @param luminance - A screen luminance.
 * @returns The clamped luminance.
 */
function softClampBlack(luminance: number): number {
  return luminance > BLACK_THRESHOLD ? luminance : luminance + (BLACK_THRESHOLD - luminance) ** BLACK_CLAMP;
}

import type { Rgb } from '../rgb';
import { toByte } from './to-byte';

/** Highest value of an 8-bit color channel. */
const MAX_CHANNEL = 255;

/*
 * CSS Color 4 algorithm: each channel is read on a 12-sector hue wheel (30° per sector), with the red,
 * green and blue channels offset by 0, 8 and 4 sectors.
 */
const DEGREES_PER_SECTOR = 30;
const SECTORS = 12;
const RISING_EDGE = 3;
const FALLING_EDGE = 9;
const RED_OFFSET = 0;
const GREEN_OFFSET = 8;
const BLUE_OFFSET = 4;

/**
 * Converts an HSL color to RGB channels.
 *
 * @internal
 * @param hue - Hue, in degrees in [0, 360[.
 * @param saturation - Saturation, in [0, 1].
 * @param lightness - Lightness, in [0, 1].
 * @returns The RGB channels, rounded to integers in [0, 255].
 */
export function hslToRgb(hue: number, saturation: number, lightness: number): Rgb {
  const chroma = saturation * Math.min(lightness, 1 - lightness);
  function channel(offset: number): number {
    const sector = (offset + hue / DEGREES_PER_SECTOR) % SECTORS;
    const ramp = Math.max(-1, Math.min(sector - RISING_EDGE, FALLING_EDGE - sector, 1));
    return toByte((lightness - chroma * ramp) * MAX_CHANNEL);
  }
  return { r: channel(RED_OFFSET), g: channel(GREEN_OFFSET), b: channel(BLUE_OFFSET) };
}

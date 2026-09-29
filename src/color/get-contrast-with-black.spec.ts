import { getContrastRatio } from './get-contrast-ratio.ts';
import { getContrastWithBlack } from './get-contrast-with-black.ts';
import type { Rgb } from './rgb.ts';
import type { Rgba } from './rgba.ts';

const BLACK: Rgb = { r: 0, g: 0, b: 0 };

const WHITE: Rgb = { r: 255, g: 255, b: 255 };

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(getContrastWithBlack, () => {
  it('compares with black', () => {
    expect(getContrastWithBlack(WHITE)).toBe(21);
    expect(getContrastWithBlack(RED)).toBeCloseTo(getContrastRatio(RED, BLACK), 12);
  });
});

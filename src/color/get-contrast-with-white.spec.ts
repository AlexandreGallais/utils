import { getContrastRatio } from './get-contrast-ratio.ts';
import { getContrastWithWhite } from './get-contrast-with-white.ts';
import type { Rgb } from './rgb.ts';
import type { Rgba } from './rgba.ts';

const BLACK: Rgb = { r: 0, g: 0, b: 0 };

const WHITE: Rgb = { r: 255, g: 255, b: 255 };

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(getContrastWithWhite, () => {
  it('compares with white', () => {
    expect(getContrastWithWhite(BLACK)).toBe(21);
    expect(getContrastWithWhite(RED)).toBeCloseTo(getContrastRatio(RED, WHITE), 12);
  });
});

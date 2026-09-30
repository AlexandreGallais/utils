import { getContrastRatio } from './get-contrast-ratio';
import type { Rgb } from './rgb';
import type { Rgba } from './rgba';

const BLACK: Rgb = { r: 0, g: 0, b: 0 };

const WHITE: Rgb = { r: 255, g: 255, b: 255 };

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(getContrastRatio, () => {
  it('ranges from 1 to 21', () => {
    expect(getContrastRatio(BLACK, WHITE)).toBe(21);
    expect(getContrastRatio(WHITE, BLACK)).toBe(21);
    expect(getContrastRatio(RED, RED)).toBe(1);
  });

  it('matches known WCAG ratios', () => {
    expect(getContrastRatio(RED, WHITE)).toBeCloseTo(3.998, 3);
    expect(getContrastRatio({ r: 0x77, g: 0x77, b: 0x77 }, WHITE)).toBeCloseTo(4.478, 3);
  });
});

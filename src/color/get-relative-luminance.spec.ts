import { getRelativeLuminance } from './get-relative-luminance';
import type { Rgb } from './rgb';
import type { Rgba } from './rgba';

const BLACK: Rgb = { r: 0, g: 0, b: 0 };

const WHITE: Rgb = { r: 255, g: 255, b: 255 };

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(getRelativeLuminance, () => {
  it.for([
    [BLACK, 0],
    [WHITE, 1],
    [RED, 0.2126],
    [{ r: 0, g: 255, b: 0 }, 0.7152],
    [{ r: 128, g: 128, b: 128 }, 0.2158605],
  ] as const)('computes the luminance of %j as %s', ([color, expected]) => {
    expect(getRelativeLuminance(color)).toBeCloseTo(expected, 6);
  });
});

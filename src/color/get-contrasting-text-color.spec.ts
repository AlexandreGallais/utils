import { getContrastingTextColor } from './get-contrasting-text-color';

describe(getContrastingTextColor, () => {
  it.for([
    [{ r: 255, g: 255, b: 255 }, '#000000'],
    [{ r: 255, g: 255, b: 0 }, '#000000'],
    [{ r: 180, g: 180, b: 180 }, '#000000'],
    [{ r: 0, g: 0, b: 0 }, '#ffffff'],
    [{ r: 255, g: 0, b: 0 }, '#ffffff'],
    [{ r: 0, g: 0, b: 255 }, '#ffffff'],
    [{ r: 128, g: 128, b: 128 }, '#ffffff'],
  ] as const)('writes on %j in %s', ([background, expected]) => {
    expect(getContrastingTextColor(background)).toBe(expected);
  });
});

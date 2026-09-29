import { randomHexColor } from './random-hex-color.ts';

describe(randomHexColor, () => {
  it('covers the whole color space', () => {
    expect(randomHexColor(() => 0)).toBe('#000000');
    expect(randomHexColor(() => 0.99999999)).toBe('#ffffff');
    expect(randomHexColor(() => 0.5)).toBe('#800000');
  });

  it('returns a #rrggbb color by default', () => {
    expect(randomHexColor()).toMatch(/^#[0-9a-f]{6}$/v);
  });
});

import { randomHexColor } from './random-hex-color';

describe(randomHexColor, () => {
  it('covers the whole color space', () => {
    expect(randomHexColor(() => 0)).toBe('#000000');
    expect(randomHexColor(() => 0.99999999)).toBe('#ffffff');
    expect(randomHexColor(() => 0.5)).toBe('#800000');
  });

  it('returns a #rrggbb color', () => {
    expect(randomHexColor(Math.random)).toMatch(/^#[0-9a-f]{6}$/v);
  });
});

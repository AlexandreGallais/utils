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

  it('takes Math.random and the other defaults for null or undefined', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(randomHexColor()).toStrictEqual(randomHexColor(Math.random));
    expect(randomHexColor(null)).toStrictEqual(randomHexColor(Math.random));
    vi.restoreAllMocks();
  });
});

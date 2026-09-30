import { randomHexColorSimple } from './random-hex-color-simple';

describe(randomHexColorSimple, () => {
  it('returns a #rrggbb color', () => {
    expect(randomHexColorSimple()).toMatch(/^#[0-9a-f]{6}$/v);
  });
});

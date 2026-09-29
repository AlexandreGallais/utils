import { easeOutQuad } from './ease-out-quad.ts';

describe(easeOutQuad, () => {
  it('starts at 0 and ends at 1', () => {
    expect(easeOutQuad(0)).toBeCloseTo(0, 12);
    expect(easeOutQuad(1)).toBeCloseTo(1, 12);
  });

  it('follows its curve', () => {
    expect(easeOutQuad(0.5)).toBeCloseTo(0.75, 12);
  });
});

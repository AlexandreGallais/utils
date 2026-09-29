import { easeInOutQuad } from './ease-in-out-quad.ts';

describe(easeInOutQuad, () => {
  it('starts at 0 and ends at 1', () => {
    expect(easeInOutQuad(0)).toBeCloseTo(0, 12);
    expect(easeInOutQuad(1)).toBeCloseTo(1, 12);
  });

  it('follows its curve', () => {
    expect(easeInOutQuad(0.25)).toBeCloseTo(0.125, 12);
  });
});

import { easeInQuad } from './ease-in-quad';

describe(easeInQuad, () => {
  it('starts at 0 and ends at 1', () => {
    expect(easeInQuad(0)).toBeCloseTo(0, 12);
    expect(easeInQuad(1)).toBeCloseTo(1, 12);
  });

  it('follows its curve', () => {
    expect(easeInQuad(0.5)).toBeCloseTo(0.25, 12);
  });
});

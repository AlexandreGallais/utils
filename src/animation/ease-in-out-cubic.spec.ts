import { easeInOutCubic } from './ease-in-out-cubic.ts';

describe(easeInOutCubic, () => {
  it('starts at 0 and ends at 1', () => {
    expect(easeInOutCubic(0)).toBeCloseTo(0, 12);
    expect(easeInOutCubic(1)).toBeCloseTo(1, 12);
  });

  it('follows its curve', () => {
    expect(easeInOutCubic(0.25)).toBeCloseTo(0.0625, 12);
  });
});

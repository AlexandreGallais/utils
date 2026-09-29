import { easeOutCubic } from './ease-out-cubic.ts';

describe(easeOutCubic, () => {
  it('starts at 0 and ends at 1', () => {
    expect(easeOutCubic(0)).toBeCloseTo(0, 12);
    expect(easeOutCubic(1)).toBeCloseTo(1, 12);
  });

  it('follows its curve', () => {
    expect(easeOutCubic(0.5)).toBeCloseTo(0.875, 12);
  });
});

import { easeInOutSine } from './ease-in-out-sine.ts';

describe(easeInOutSine, () => {
  it('starts at 0 and ends at 1', () => {
    expect(easeInOutSine(0)).toBeCloseTo(0, 12);
    expect(easeInOutSine(1)).toBeCloseTo(1, 12);
  });

  it('follows its curve', () => {
    expect(easeInOutSine(0.5)).toBeCloseTo(0.5, 12);
  });
});

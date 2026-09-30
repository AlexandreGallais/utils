import { linear } from './linear';

describe(linear, () => {
  it('starts at 0 and ends at 1', () => {
    expect(linear(0)).toBeCloseTo(0, 12);
    expect(linear(1)).toBeCloseTo(1, 12);
  });

  it('follows its curve', () => {
    expect(linear(0.5)).toBeCloseTo(0.5, 12);
  });
});

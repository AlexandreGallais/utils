import { mean } from './mean';

describe(mean, () => {
  it('averages the values', () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
    expect(mean(new Float32Array([2, 4]))).toBe(3);
  });

  it('returns NaN for no values', () => {
    expect(mean([])).toBeNaN();
  });
});

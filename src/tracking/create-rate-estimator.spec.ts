import { createRateEstimator } from './create-rate-estimator';

describe(createRateEstimator, () => {
  it('returns NaN until the second sample', () => {
    const estimator = createRateEstimator(0);
    expect(estimator.rate).toBeNaN();
    expect(estimator.push(10, 0)).toBeNaN();
    expect(estimator.push(12, 500)).toBe(4);
  });

  it('gives the raw rate without smoothing', () => {
    const estimator = createRateEstimator(0);
    estimator.push(0, 0);
    estimator.push(1, 100);
    expect(estimator.push(1, 200)).toBe(0);
    expect(estimator.rate).toBe(0);
  });

  it('smooths the rate over time', () => {
    const estimator = createRateEstimator(100);
    estimator.push(0, 0);
    estimator.push(10, 100);
    // From 100 units/s towards 0 units/s over one time constant: 100 × e^-1.
    expect(estimator.push(10, 200)).toBeCloseTo(100 * Math.exp(-1), 10);
  });

  it('ignores a sample that is not later than the previous one', () => {
    const estimator = createRateEstimator(0);
    estimator.push(0, 0);
    estimator.push(5, 1000);
    expect(estimator.push(99, 1000)).toBe(5);
    expect(estimator.push(99, 500)).toBe(5);
  });

  it('starts over after reset', () => {
    const estimator = createRateEstimator(0);
    estimator.push(0, 0);
    estimator.push(5, 1000);
    estimator.reset();
    expect(estimator.push(100, 2000)).toBeNaN();
    expect(estimator.push(101, 3000)).toBe(1);
  });
});

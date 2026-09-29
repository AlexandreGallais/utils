import { MovingAverage } from './moving-average.ts';

describe(MovingAverage, () => {
  let average: MovingAverage;

  beforeEach(() => {
    average = new MovingAverage(3);
  });

  it('is NaN before the first value', () => {
    expect(average.value).toBeNaN();
    expect(average.count).toBe(0);
    expect(average.windowSize).toBe(3);
  });

  it('averages the values while the window fills', () => {
    expect(average.push(12)).toBe(12);
    expect(average.push(14)).toBe(13);
    expect(average.count).toBe(2);
  });

  it('averages the last values only', () => {
    for (const value of [1, 2, 3, 4, 5]) {
      average.push(value);
    }
    expect(average.value).toBe(4);
    expect(average.count).toBe(3);
  });

  it('does not drift over many values', () => {
    for (let index = 0; index < 100_000; index++) {
      average.push(0.1 * (index % 7));
    }
    const expected = (0.1 * (99_997 % 7) + 0.1 * (99_998 % 7) + 0.1 * (99_999 % 7)) / 3;
    expect(average.value).toBeCloseTo(expected, 12);
  });

  it('recovers from a NaN once it leaves the window', () => {
    average.push(NaN);
    for (const value of [1, 2, 3, 4, 5, 6]) {
      average.push(value);
    }
    expect(average.value).toBe(5);
  });

  it('empties on reset', () => {
    average.push(10);
    average.reset();
    expect(average.value).toBeNaN();
    expect(average.push(2)).toBe(2);
  });

  it.for([0, -1, 1.5])('throws a RangeError for window size %s', (windowSize) => {
    expect(() => new MovingAverage(windowSize)).toThrow(RangeError);
  });
});

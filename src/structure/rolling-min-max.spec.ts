import { createSeededRandom } from '../random';
import { RollingMinMax } from './rolling-min-max';

describe(RollingMinMax, () => {
  it('follows the minimum and maximum of the window', () => {
    const range = new RollingMinMax(3);
    const results = [5, 9, 1, 4, 2, 2, 7].map((value) => {
      range.push(value);
      return [range.min, range.max];
    });
    expect(results).toStrictEqual([
      [5, 5],
      [5, 9],
      [1, 9],
      [1, 9],
      [1, 4],
      [2, 4],
      [2, 7],
    ]);
  });

  it('matches a naive computation on random data', () => {
    const random = createSeededRandom(42);
    const range = new RollingMinMax(7);
    const values: number[] = [];
    const mismatches: number[] = [];
    for (let index = 0; index < 500; index++) {
      const value = Math.round(random() * 20);
      values.push(value);
      range.push(value);
      const window = values.slice(-7);
      if (range.min !== Math.min(...window) || range.max !== Math.max(...window)) {
        mismatches.push(index);
      }
    }
    expect(mismatches).toStrictEqual([]);
  });

  it('is empty before the first value and after reset', () => {
    const range = new RollingMinMax(2);
    expect(range.min).toBeNaN();
    range.push(3);
    expect(range.count).toBe(1);
    range.reset();
    expect(range.max).toBeNaN();
    expect(range.count).toBe(0);
  });

  it('counts up to the window size', () => {
    const range = new RollingMinMax(2);
    range.push(1);
    range.push(2);
    range.push(3);
    expect(range.count).toBe(2);
    expect(range.windowSize).toBe(2);
  });

  it.for([0, -1, 1.5])('throws a RangeError for a window of %s', (windowSize) => {
    expect(() => new RollingMinMax(windowSize)).toThrow(RangeError);
  });
});

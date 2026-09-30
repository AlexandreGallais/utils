import { moveTowards } from './move-towards';

describe(moveTowards, () => {
  it.for([
    [0, 10, 5, 1000, 5],
    [0, 10, 5, 500, 2.5],
    [10, 0, 5, 1000, 5],
    [9, 10, 5, 1000, 10],
    [10, 10, 5, 1000, 10],
    [0, 10, 0, 1000, 0],
  ] as const)('moves from %s towards %s at %s/s over %s ms: %s', ([current, target, rate, deltaMs, expected]) => {
    expect(moveTowards(current, target, rate, deltaMs)).toBe(expected);
  });

  it('gives the same result whatever the frame rate', () => {
    let value = 0;
    for (let frame = 0; frame < 10; frame++) {
      value = moveTowards(value, 100, 20, 100);
    }
    expect(value).toBeCloseTo(moveTowards(0, 100, 20, 1000), 9);
  });
});

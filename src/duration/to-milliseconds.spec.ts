import { toMilliseconds } from './to-milliseconds.ts';

describe(toMilliseconds, () => {
  it.for([
    [{ minutes: 5, seconds: 30 }, 330_000],
    [{ weeks: 1, days: 1 }, 691_200_000],
    [{ hours: 1.5 }, 5_400_000],
    [{ seconds: -2, milliseconds: 500 }, -1500],
    [{}, 0],
  ] as const)('converts %j to %s ms', ([duration, expected]) => {
    expect(toMilliseconds(duration)).toBe(expected);
  });
});

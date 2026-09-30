import { toLinear } from './to-linear';

describe(toLinear, () => {
  it.for([
    [0, 0],
    [255, 1],
    [10, 10 / 255 / 12.92],
    [128, ((128 / 255 + 0.055) / 1.055) ** 2.4],
    [127.5, ((127.5 / 255 + 0.055) / 1.055) ** 2.4],
    [300, 1],
    [-5, 0],
  ] as const)('linearizes %s as %s', ([channel, expected]) => {
    expect(toLinear(channel)).toBeCloseTo(expected, 12);
  });
});

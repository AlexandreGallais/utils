import { roundToStep } from './round-to-step.ts';

describe(roundToStep, () => {
  it.for([
    [0.3, 0.1, 0.3],
    [0.29, 0.1, 0.3],
    [7, 5, 5],
    [8, 5, 10],
    [-7, 5, -5],
    [1.23456, 0.25, 1.25],
    [0.00000037, 1e-7, 0.0000004],
    [0.7, 0.1, 0.7],
    [0.44, 0.1 + 0.2, 0.3],
    [1.23456, 1e-100, 1.23456],
  ] as const)('rounds %s to step %s as %s', ([value, step, expected]) => {
    expect(roundToStep(value, step)).toBe(expected);
  });

  it.for([0, -1, NaN, Infinity])('throws a RangeError for step %s', (step) => {
    expect(() => roundToStep(1, step)).toThrow(RangeError);
  });
});

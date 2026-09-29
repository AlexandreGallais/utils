import { ceilToStep } from './ceil-to-step.ts';

describe(ceilToStep, () => {
  it.for([
    [0.3, 0.1, 0.3],
    [0.31, 0.1, 0.4],
    [7, 5, 10],
    [-7, 5, -5],
    [0.7, 0.1, 0.7],
  ] as const)('ceils %s to step %s as %s', ([value, step, expected]) => {
    expect(ceilToStep(value, step)).toBe(expected);
  });

  it('does not return -0', () => {
    expect(Object.is(ceilToStep(-0.4, 1), 0)).toBe(true);
  });
});

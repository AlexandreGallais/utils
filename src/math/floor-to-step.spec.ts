import { floorToStep } from './floor-to-step';

describe(floorToStep, () => {
  it.for([
    [0.3, 0.1, 0.3],
    [0.39, 0.1, 0.3],
    [7, 5, 5],
    [-7, 5, -10],
    [0.7, 0.1, 0.7],
  ] as const)('floors %s to step %s as %s', ([value, step, expected]) => {
    expect(floorToStep(value, step)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(floorToStep(2.7)).toStrictEqual(floorToStep(2.7, 1));
    expect(floorToStep(2.7, null)).toStrictEqual(floorToStep(2.7, 1));
  });
});

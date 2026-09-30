import { convertMass } from './convert-mass';

describe(convertMass, () => {
  it.for([
    [2.5, 't', 'kg', 2500],
    [1, 'lb', 'kg', 0.45359237],
    [500, 'g', 'kg', 0.5],
    [3, 'kg', 'kg', 3],
  ] as const)('converts %s %s to %s', ([value, from, to, expected]) => {
    expect(convertMass(value, from, to)).toBeCloseTo(expected, 9);
  });
});

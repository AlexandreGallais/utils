import { convertFlow } from './convert-flow.ts';

describe(convertFlow, () => {
  it.for([
    [36, 'm³/h', 'L/s', 10],
    [120, 'L/min', 'L/s', 2],
    [1, 'gal/min', 'L/min', 3.785411784],
    [5, 'L/s', 'L/s', 5],
  ] as const)('converts %s %s to %s', ([value, from, to, expected]) => {
    expect(convertFlow(value, from, to)).toBeCloseTo(expected, 9);
  });
});

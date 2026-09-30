import { wrap } from './wrap';

describe(wrap, () => {
  it.for([
    [370, 0, 360, 10],
    [-10, 0, 360, 350],
    [360, 0, 360, 0],
    [-360, 0, 360, 0],
    [-720.5, 0, 360, 359.5],
    [5, 10, 20, 15],
    [25, 20, 10, 15],
  ] as const)('wraps %s into [%s, %s[ as %s', ([value, min, max, expected]) => {
    expect(wrap(value, min, max)).toBe(expected);
  });

  it('never returns -0', () => {
    expect(Object.is(wrap(-360, 0, 360), 0)).toBe(true);
  });

  it('takes the defaults', () => {
    expect(wrap(1.25)).toStrictEqual(wrap(1.25, 0, 1));
  });
});

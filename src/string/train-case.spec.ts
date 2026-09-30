import { trainCase } from './train-case';

describe(trainCase, () => {
  it.for([
    ['contentType', 'Content-Type'],
    ['x_request_id', 'X-Request-Id'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(trainCase(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(trainCase()).toStrictEqual(trainCase(''));
    expect(trainCase(null)).toStrictEqual(trainCase(''));
  });
});

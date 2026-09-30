import { pascalCase } from './pascal-case';

describe(pascalCase, () => {
  it.for([
    ['user-id', 'UserId'],
    ['ring_buffer', 'RingBuffer'],
    ['userId', 'UserId'],
    ['HTTP status', 'HttpStatus'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(pascalCase(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(pascalCase()).toStrictEqual(pascalCase(''));
    expect(pascalCase(null)).toStrictEqual(pascalCase(''));
  });
});

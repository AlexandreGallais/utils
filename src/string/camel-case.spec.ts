import { camelCase } from './camel-case';

describe(camelCase, () => {
  it.for([
    ['user-id', 'userId'],
    ['user_id', 'userId'],
    ['User Id', 'userId'],
    ['USER_ID', 'userId'],
    ['userId', 'userId'],
    ['XMLHttpRequest', 'xmlHttpRequest'],
    ['speed 2 knots', 'speed2Knots'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(camelCase(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(camelCase()).toStrictEqual(camelCase(''));
    expect(camelCase(null)).toStrictEqual(camelCase(''));
  });
});

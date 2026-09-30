import { snakeCase } from './snake-case';

describe(snakeCase, () => {
  it.for([
    ['userId', 'user_id'],
    ['Speed in knots', 'speed_in_knots'],
    ['ring-buffer', 'ring_buffer'],
    ['HTTPStatus', 'http_status'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(snakeCase(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(snakeCase()).toStrictEqual(snakeCase(''));
    expect(snakeCase(null)).toStrictEqual(snakeCase(''));
  });
});

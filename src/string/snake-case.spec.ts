import { snakeCase } from './snake-case.ts';

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
});

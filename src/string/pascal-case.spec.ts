import { pascalCase } from './pascal-case.ts';

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
});

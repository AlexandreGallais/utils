import { lowerCase } from './lower-case.ts';

describe(lowerCase, () => {
  it.for([
    ['engineRoomTemperature', 'engine room temperature'],
    ['MAX_SPEED', 'max speed'],
    ['  Hello---World ', 'hello world'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(lowerCase(input)).toBe(expected);
  });
});

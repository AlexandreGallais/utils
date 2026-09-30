import { lowerCase } from './lower-case';

describe(lowerCase, () => {
  it.for([
    ['engineRoomTemperature', 'engine room temperature'],
    ['MAX_SPEED', 'max speed'],
    ['  Hello---World ', 'hello world'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(lowerCase(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(lowerCase()).toStrictEqual(lowerCase(''));
    expect(lowerCase(null)).toStrictEqual(lowerCase(''));
  });
});

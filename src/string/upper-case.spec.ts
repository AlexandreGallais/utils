import { upperCase } from './upper-case';

describe(upperCase, () => {
  it.for([
    ['engineRoomTemperature', 'ENGINE ROOM TEMPERATURE'],
    ['max-speed', 'MAX SPEED'],
    ['élan vital', 'ÉLAN VITAL'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(upperCase(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(upperCase()).toStrictEqual(upperCase(''));
    expect(upperCase(null)).toStrictEqual(upperCase(''));
  });
});

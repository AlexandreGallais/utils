import { dotCase } from './dot-case';

describe(dotCase, () => {
  it.for([
    ['engineRoomTemperature', 'engine.room.temperature'],
    ['Alarm Panel', 'alarm.panel'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(dotCase(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(dotCase()).toStrictEqual(dotCase(''));
    expect(dotCase(null)).toStrictEqual(dotCase(''));
  });
});

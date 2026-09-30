import { dotCase } from './dot-case';

describe(dotCase, () => {
  it.for([
    ['engineRoomTemperature', 'engine.room.temperature'],
    ['Alarm Panel', 'alarm.panel'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(dotCase(input)).toBe(expected);
  });
});

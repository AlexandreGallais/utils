import { sentenceCase } from './sentence-case';

describe(sentenceCase, () => {
  it.for([
    ['engineRoomTemperature', 'Engine room temperature'],
    ['max_speed_GPS', 'Max speed GPS'],
    ['user-id', 'User id'],
    ['SPEED', 'SPEED'],
    ['depth2Meters', 'Depth 2 meters'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(sentenceCase(input)).toBe(expected);
  });
});

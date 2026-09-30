import { titleCase } from './title-case';

describe(titleCase, () => {
  it.for([
    ['engine-room', 'Engine Room'],
    ['maxSpeedGPS', 'Max Speed GPS'],
    ['user_id', 'User Id'],
    ['HTTP status code', 'HTTP Status Code'],
    ['speed2', 'Speed 2'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(titleCase(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(titleCase()).toStrictEqual(titleCase(''));
    expect(titleCase(null)).toStrictEqual(titleCase(''));
  });
});

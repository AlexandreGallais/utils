import { constantCase } from './constant-case';

describe(constantCase, () => {
  it.for([
    ['maxChannel', 'MAX_CHANNEL'],
    ['api-base-url', 'API_BASE_URL'],
    ['Half turn', 'HALF_TURN'],
    ['MAX_CHANNEL', 'MAX_CHANNEL'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(constantCase(input)).toBe(expected);
  });
});

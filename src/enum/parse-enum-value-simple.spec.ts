import { parseEnumValueSimple } from './parse-enum-value-simple';

describe(parseEnumValueSimple, () => {
  it('accepts values only', () => {
    const status = { running: 'on' } as const;
    expect(parseEnumValueSimple(status, 'on')).toBe('on');
    expect(parseEnumValueSimple(status, 'running')).toBeUndefined();
  });
});

import { mapValues } from './map-values.ts';

describe(mapValues, () => {
  it('maps every value, keeping the keys', () => {
    expect(mapValues({ rpm: 800, temperature: 72 }, (value) => value * 2)).toStrictEqual({
      rpm: 1600,
      temperature: 144,
    });
  });

  it('passes the key to the mapper', () => {
    expect(mapValues({ a: 1, b: 2 }, (value, key) => `${key}=${value}`)).toStrictEqual({ a: 'a=1', b: 'b=2' });
  });

  it('returns an empty object for an empty one', () => {
    expect(mapValues({}, () => 0)).toStrictEqual({});
  });
});

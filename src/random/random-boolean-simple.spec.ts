import { randomBooleanSimple } from './random-boolean-simple.ts';

describe(randomBooleanSimple, () => {
  it('draws both values', () => {
    const values = new Set(Array.from({ length: 200 }, () => randomBooleanSimple()));
    expect(values).toStrictEqual(new Set([true, false]));
  });
});

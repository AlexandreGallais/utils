import { randomEnumValueSimple } from './random-enum-value-simple.ts';

describe(randomEnumValueSimple, () => {
  it('draws a member', () => {
    expect(['a', 'b']).toContain(randomEnumValueSimple({ first: 'a', second: 'b' }));
  });
});

import { randomEnumValueSimple } from './random-enum-value-simple';

describe(randomEnumValueSimple, () => {
  it('draws a member', () => {
    expect(['a', 'b']).toContain(randomEnumValueSimple({ first: 'a', second: 'b' }));
  });
});

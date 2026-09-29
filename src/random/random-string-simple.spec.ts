import { randomStringSimple } from './random-string-simple.ts';

describe(randomStringSimple, () => {
  it('draws letters and digits', () => {
    expect(randomStringSimple(12)).toMatch(/^[0-9A-Za-z]{12}$/v);
  });
});

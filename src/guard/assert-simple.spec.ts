import { assertSimple } from './assert-simple';

describe(assertSimple, () => {
  it('throws only for false', () => {
    expect(() => {
      assertSimple(true);
    }).not.toThrow();
    expect(() => {
      assertSimple(false);
    }).toThrow('Assertion failed');
  });
});

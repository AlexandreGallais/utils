import { isBlinkOnSimple } from './is-blink-on-simple.ts';

describe(isBlinkOnSimple, () => {
  it('is on during the first half', () => {
    expect(isBlinkOnSimple(100, 1000)).toBe(true);
    expect(isBlinkOnSimple(600, 1000)).toBe(false);
  });
});

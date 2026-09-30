import { assertNever } from './assert-never';

describe(assertNever, () => {
  it('throws with a custom message', () => {
    expect(() => assertNever('oops' as never, 'Unknown mode')).toThrow('Unknown mode');
  });
});

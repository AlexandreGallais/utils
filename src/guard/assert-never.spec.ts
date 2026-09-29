import { assertNever } from './assert-never.ts';

describe(assertNever, () => {
  it('throws with a custom message', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- simulates a value the types rule out.
    expect(() => assertNever('oops' as never, 'Unknown mode')).toThrow('Unknown mode');
  });
});

import { assertNever } from './assert-never';

describe(assertNever, () => {
  it('throws with a custom message', () => {
    expect(() => assertNever('oops' as never, 'Unknown mode')).toThrow('Unknown mode');
  });

  it('throws "Unexpected value" for a null or undefined message', () => {
    expect(() => assertNever(1 as never)).toThrow('Unexpected value');
  });
});

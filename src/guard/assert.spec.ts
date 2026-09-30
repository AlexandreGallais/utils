import { assert } from './assert';

const checkAssert: (condition: unknown, message: string) => void = assert;

describe(assert, () => {
  it.for([true, 1, 'text', {}, []])('passes for the truthy value %j', (condition) => {
    expect(() => {
      checkAssert(condition, 'Assertion failed');
    }).not.toThrow();
  });

  it.for([false, 0, '', null, undefined, NaN])('throws for the falsy value %s', (condition) => {
    expect(() => {
      checkAssert(condition, 'Boom');
    }).toThrow('Boom');
  });

  it('throws "Assertion failed" for a null or undefined message', () => {
    expect(() => {
      assert(false);
    }).toThrow('Assertion failed');
    expect(() => {
      assert(false, null);
    }).toThrow('Assertion failed');
  });
});

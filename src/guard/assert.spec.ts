import { assert } from './assert.ts';

const checkAssert: (condition: unknown, message?: string) => void = assert;

describe(assert, () => {
  it.for([true, 1, 'text', {}, []])('passes for the truthy value %j', (condition) => {
    expect(() => {
      checkAssert(condition);
    }).not.toThrow();
  });

  it.for([false, 0, '', null, undefined, NaN])('throws for the falsy value %s', (condition) => {
    expect(() => {
      checkAssert(condition, 'Boom');
    }).toThrow('Boom');
  });

  it('has a default message', () => {
    expect(() => {
      checkAssert(false);
    }).toThrow('Assertion failed');
  });
});

import type { AnyFunction } from './any-function';

describe('AnyFunction', () => {
  it('accepts functions only', () => {
    expectTypeOf<(a: string) => number>().toExtend<AnyFunction>();
    expectTypeOf<string>().not.toExtend<AnyFunction>();
  });
});

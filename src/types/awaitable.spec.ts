import type { Awaitable } from './awaitable.ts';

describe('Awaitable', () => {
  it('accepts a value or a promise', () => {
    expectTypeOf<number>().toExtend<Awaitable<number>>();
    expectTypeOf<Promise<number>>().toExtend<Awaitable<number>>();
    expectTypeOf<Promise<string>>().not.toExtend<Awaitable<number>>();
  });
});

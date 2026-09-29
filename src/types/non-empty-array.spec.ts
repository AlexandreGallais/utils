import type { NonEmptyArray } from './non-empty-array.ts';

describe('NonEmptyArray', () => {
  it('requires a first item', () => {
    expectTypeOf<[1]>().toExtend<NonEmptyArray<number>>();
    expectTypeOf<[]>().not.toExtend<NonEmptyArray<number>>();
    expectTypeOf<NonEmptyArray<number>[0]>().toEqualTypeOf<number>();
  });
});

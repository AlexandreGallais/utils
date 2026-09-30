import type { NonEmptyArray } from '../types';
import { isNonEmptyArray } from './is-non-empty-array';

describe(isNonEmptyArray, () => {
  it('checks the length', () => {
    expect(isNonEmptyArray([0])).toBe(true);
    expect(isNonEmptyArray([])).toBe(false);
  });

  it('types the first item as defined', () => {
    expectTypeOf(isNonEmptyArray<number>).guards.toEqualTypeOf<NonEmptyArray<number>>();
  });
});

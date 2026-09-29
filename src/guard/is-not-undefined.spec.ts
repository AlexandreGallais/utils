import { isNotUndefined } from './is-not-undefined.ts';

describe(isNotUndefined, () => {
  it('excludes undefined only', () => {
    expect([0, null, undefined].filter(isNotUndefined)).toStrictEqual([0, null]);
  });
});

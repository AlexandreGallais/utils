import { isDefined } from './is-defined.ts';

describe(isDefined, () => {
  it('excludes null and undefined', () => {
    expect([0, '', false, null, undefined, NaN].filter(isDefined)).toStrictEqual([0, '', false, NaN]);
  });
});

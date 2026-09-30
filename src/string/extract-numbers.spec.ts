import { extractNumbers } from './extract-numbers';

describe(extractNumbers, () => {
  it('extracts every number', () => {
    expect(extractNumbers('from 1.5 to -3, then +2,25')).toStrictEqual([1.5, -3, 2.25]);
    expect(extractNumbers('none')).toStrictEqual([]);
  });

  it('can be called repeatedly (no shared regex state)', () => {
    expect(extractNumbers('1 2')).toStrictEqual([1, 2]);
    expect(extractNumbers('1 2')).toStrictEqual([1, 2]);
  });

  it('takes the defaults for null or undefined', () => {
    expect(extractNumbers()).toStrictEqual(extractNumbers(''));
    expect(extractNumbers(null)).toStrictEqual(extractNumbers(''));
  });
});

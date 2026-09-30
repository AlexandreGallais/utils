import { removeDiacritics } from './remove-diacritics';

describe(removeDiacritics, () => {
  it.for([
    ['Crème brûlée à Évian', 'Creme brulee a Evian'],
    ['Ñandú', 'Nandu'],
    ['søren straße', 'søren straße'],
    ['', ''],
  ] as const)('removes the diacritics of %j', ([input, expected]) => {
    expect(removeDiacritics(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(removeDiacritics()).toStrictEqual(removeDiacritics(''));
    expect(removeDiacritics(null)).toStrictEqual(removeDiacritics(''));
  });
});

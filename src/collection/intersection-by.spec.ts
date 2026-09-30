import { intersectionBy } from './intersection-by';

describe(intersectionBy, () => {
  it('keeps the items whose key is in the other list', () => {
    const previous = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(intersectionBy(previous, [{ id: 3 }, { id: 1 }], (contact) => contact.id)).toStrictEqual([
      { id: 1 },
      { id: 3 },
    ]);
  });

  it('keeps nothing without common keys', () => {
    expect(intersectionBy([1, 2], [3], (value) => value)).toStrictEqual([]);
  });

  it('takes the defaults for null or undefined', () => {
    expect(intersectionBy(undefined, undefined, (item: number) => item)).toStrictEqual(
      intersectionBy([], [], (item: number) => item),
    );
    expect(intersectionBy(null, null, (item: number) => item)).toStrictEqual(
      intersectionBy([], [], (item: number) => item),
    );
  });
});

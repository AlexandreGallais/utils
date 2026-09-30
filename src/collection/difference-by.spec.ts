import { differenceBy } from './difference-by';

describe(differenceBy, () => {
  it('keeps the items whose key is not excluded', () => {
    const current = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(differenceBy(current, [{ id: 2 }], (alarm) => alarm.id)).toStrictEqual([{ id: 1 }, { id: 3 }]);
  });

  it('keeps every item when nothing is excluded, none when everything is', () => {
    expect(differenceBy([1, 2], [], (value) => value)).toStrictEqual([1, 2]);
    expect(differenceBy([1, 2], new Set([2, 1]), (value) => value)).toStrictEqual([]);
  });

  it('takes the defaults for null or undefined', () => {
    expect(differenceBy(undefined, undefined, (item: number) => item)).toStrictEqual(
      differenceBy([], [], (item: number) => item),
    );
    expect(differenceBy(null, null, (item: number) => item)).toStrictEqual(
      differenceBy([], [], (item: number) => item),
    );
  });
});

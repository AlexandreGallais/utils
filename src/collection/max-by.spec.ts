import { maxBy } from './max-by.ts';

const SENSORS = [
  { id: 'a', temperature: 50 },
  { id: 'b', temperature: 80 },
  { id: 'c', temperature: 80 },
  { id: 'd', temperature: NaN },
];

describe(maxBy, () => {
  it('finds the item with the largest key, the first on a tie', () => {
    expect(maxBy(SENSORS, (sensor) => sensor.temperature)?.id).toBe('b');
  });

  it('ignores NaN keys', () => {
    expect(maxBy([NaN, 3], (value) => value)).toBe(3);
    expect(maxBy([NaN], (value) => value)).toBeUndefined();
  });

  it('accepts infinite keys', () => {
    expect(maxBy([-Infinity, -Infinity], (value) => value)).toBe(-Infinity);
    expect(maxBy([0, Infinity], (value) => value)).toBe(Infinity);
  });

  it('returns undefined for no item', () => {
    expect(maxBy([], (value: number) => value)).toBeUndefined();
  });
});

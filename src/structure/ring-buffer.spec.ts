import { RingBuffer } from './ring-buffer';

describe(RingBuffer, () => {
  let buffer: RingBuffer<number>;

  beforeEach(() => {
    buffer = new RingBuffer<number>(3);
  });

  it('starts empty', () => {
    expect(buffer.size).toBe(0);
    expect(buffer.capacity).toBe(3);
    expect(buffer.isFull).toBe(false);
    expect(buffer.toArray()).toStrictEqual([]);
  });

  it('keeps the items in order until full', () => {
    expect(buffer.push(1)).toBeUndefined();
    buffer.push(2);
    buffer.push(3);
    expect(buffer.isFull).toBe(true);
    expect(buffer.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('overwrites the oldest item once full', () => {
    buffer.push(1);
    buffer.push(2);
    buffer.push(3);
    expect(buffer.push(4)).toBe(1);
    expect(buffer.push(5)).toBe(2);
    expect(buffer.toArray()).toStrictEqual([3, 4, 5]);
    expect(buffer.size).toBe(3);
  });

  it('reads items by index from the oldest or the newest', () => {
    for (const value of [1, 2, 3, 4]) {
      buffer.push(value);
    }
    expect(buffer.at(0)).toBe(2);
    expect(buffer.at(-1)).toBe(4);
    expect(buffer.at(-3)).toBe(2);
    expect([buffer.at(3), buffer.at(-4), buffer.at(0.5)]).toStrictEqual([undefined, undefined, undefined]);
  });

  it('is iterable', () => {
    buffer.push(1);
    buffer.push(2);
    expect([...buffer]).toStrictEqual([1, 2]);
  });

  it('empties on clear', () => {
    buffer.push(1);
    buffer.push(2);
    buffer.clear();
    expect(buffer.size).toBe(0);
    expect(buffer.at(0)).toBeUndefined();
    buffer.push(3);
    expect(buffer.toArray()).toStrictEqual([3]);
  });

  it.for([0, -1, 1.5, NaN])('throws a RangeError for capacity %s', (capacity) => {
    expect(() => new RingBuffer(capacity)).toThrow(RangeError);
  });
});

import { LruCache } from './lru-cache.ts';

describe(LruCache, () => {
  it('evicts the least recently used entry', () => {
    const cache = new LruCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    expect(cache.get('a')).toBe(1);
    cache.set('c', 3);
    expect([cache.has('a'), cache.has('b'), cache.has('c')]).toStrictEqual([true, false, true]);
    expect(cache.size).toBe(2);
  });

  it('replaces a value and refreshes its position', () => {
    const cache = new LruCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    expect(cache.get('b')).toBe(2);
    cache.set('a', 10);
    cache.set('c', 3);
    expect([cache.get('a'), cache.get('b'), cache.get('c')]).toStrictEqual([10, undefined, 3]);
  });

  it('keeps undefined values', () => {
    const cache = new LruCache<string, number | undefined>(2);
    cache.set('a', undefined);
    cache.set('b', 2);
    cache.get('a');
    cache.set('c', 3);
    expect(cache.has('a')).toBe(true);
  });

  it('deletes and clears', () => {
    const cache = new LruCache<number, string>(3);
    cache.set(1, 'one');
    cache.set(2, 'two');
    expect(cache.delete(1)).toBe(true);
    expect(cache.delete(1)).toBe(false);
    cache.clear();
    expect(cache.size).toBe(0);
  });

  it.for([0, -1, 1.5])('throws a RangeError for a size of %s', (maxSize) => {
    expect(() => new LruCache(maxSize)).toThrow(RangeError);
  });
});

import { isFiniteNumber, isRecord } from '../guard';
import { readStorage } from './read-storage';
import { MemoryStorage } from './testing';

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

describe(readStorage, () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it('reads a stored JSON value', () => {
    storage.setItem('settings', '{"zoom":2}');
    expect(readStorage(storage, 'settings', {}, isRecord)).toStrictEqual({ zoom: 2 });
  });

  it('returns the fallback for a missing key or corrupted JSON', () => {
    storage.setItem('broken', '{zoom');
    expect(readStorage(storage, 'missing', 1, isFiniteNumber)).toBe(1);
    expect(readStorage(storage, 'broken', 1, isFiniteNumber)).toBe(1);
  });

  it('applies the guard', () => {
    storage.setItem('zoom', '"large"');
    storage.setItem('level', '3');
    expect(readStorage(storage, 'zoom', 1, isNumber)).toBe(1);
    expect(readStorage(storage, 'level', 1, isNumber)).toBe(3);
  });

  it('returns the fallback when the storage throws', () => {
    vi.spyOn(storage, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    expect(readStorage(storage, 'zoom', 1, isFiniteNumber)).toBe(1);
  });
});

import { MemoryStorage } from './testing';
import { writeStorage } from './write-storage';

describe(writeStorage, () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it('stores the value as JSON', () => {
    expect(writeStorage(storage, 'settings', { zoom: 2 })).toBe(true);
    expect(storage.getItem('settings')).toBe('{"zoom":2}');
  });

  it('removes the key for undefined', () => {
    storage.setItem('zoom', '2');
    expect(writeStorage(storage, 'zoom', undefined)).toBe(true);
    expect(storage.getItem('zoom')).toBeNull();
  });

  it('returns false when the storage refuses the value', () => {
    vi.spyOn(storage, 'setItem').mockImplementation(() => {
      throw new DOMException('Full', 'QuotaExceededError');
    });
    expect(writeStorage(storage, 'zoom', 2)).toBe(false);
  });
});

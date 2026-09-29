import { isFiniteNumber } from '../guard/is-finite-number.ts';
import { createStorageItem } from './create-storage-item.ts';
import { MemoryStorage } from './testing/memory-storage.ts';

function isTheme(value: unknown): value is 'day' | 'night' {
  return value === 'day' || value === 'night';
}

describe(createStorageItem, () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it('reads the fallback until a value is stored', () => {
    const theme = createStorageItem(storage, 'ui.theme', 'day', isTheme);
    expect(theme.get()).toBe('day');
    expect(theme.set('night')).toBe(true);
    expect(theme.get()).toBe('night');
    expect(theme.key).toBe('ui.theme');
  });

  it('falls back when the stored value fails the guard', () => {
    storage.setItem('ui.theme', '"dusk"');
    expect(createStorageItem(storage, 'ui.theme', 'day', isTheme).get()).toBe('day');
  });

  it('removes the value', () => {
    const zoom = createStorageItem(storage, 'zoom', 1, isFiniteNumber);
    zoom.set(3);
    zoom.remove();
    expect(zoom.get()).toBe(1);
    expect(storage).toHaveLength(0);
  });
});

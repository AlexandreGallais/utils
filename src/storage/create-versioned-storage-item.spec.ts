import { isRecord } from '../guard/is-record.ts';
import { createVersionedStorageItem } from './create-versioned-storage-item.ts';
import { MemoryStorage } from './testing/memory-storage.ts';

interface View {
  readonly zoom: number;
  readonly isGridVisible: boolean;
}

function isView(value: unknown): value is View {
  return isRecord(value) && typeof value['zoom'] === 'number' && typeof value['isGridVisible'] === 'boolean';
}

const FALLBACK: View = { zoom: 1, isGridVisible: true };

function createView(storage: Storage): ReturnType<typeof createVersionedStorageItem<View>> {
  return createVersionedStorageItem(storage, 'view', {
    version: 2,
    fallback: FALLBACK,
    guard: isView,
    migrate: (value, fromVersion) =>
      fromVersion === 1 && isRecord(value) ? { ...value, isGridVisible: false } : undefined,
  });
}

describe(createVersionedStorageItem, () => {
  it('stores the value with its version', () => {
    const storage = new MemoryStorage();
    const view = createView(storage);
    expect(view.get()).toBe(FALLBACK);
    view.set({ zoom: 3, isGridVisible: false });
    expect(storage.getItem('view')).toBe('{"version":2,"value":{"zoom":3,"isGridVisible":false}}');
    expect(view.get()).toStrictEqual({ zoom: 3, isGridVisible: false });
  });

  it('migrates an older value once and saves it back', () => {
    const storage = new MemoryStorage();
    storage.setItem('view', '{"version":1,"value":{"zoom":2}}');
    expect(createView(storage).get()).toStrictEqual({ zoom: 2, isGridVisible: false });
    expect(storage.getItem('view')).toBe('{"version":2,"value":{"zoom":2,"isGridVisible":false}}');
  });

  it.for([
    ['a newer version', '{"version":3,"value":{"zoom":2,"isGridVisible":true}}'],
    ['an unmigratable value', '{"zoom":2}'],
    ['a value of the wrong shape', '{"version":2,"value":{"zoom":"2"}}'],
  ] as const)('falls back for %s', ([, text]) => {
    const storage = new MemoryStorage();
    storage.setItem('view', text);
    expect(createView(storage).get()).toBe(FALLBACK);
  });

  it('accepts any value without guard, and falls back without migration', () => {
    const storage = new MemoryStorage();
    const item = createVersionedStorageItem(storage, 'count', { version: 1, fallback: 0 });
    storage.setItem('count', '5');
    expect(item.get()).toBe(0);
    item.set(7);
    expect(item.get()).toBe(7);
    item.remove();
    expect(storage.getItem('count')).toBeNull();
  });

  it('passes version 0 for a value stored without version', () => {
    const storage = new MemoryStorage();
    storage.setItem('legacy', '"on"');
    const migrate = vi.fn<(value: unknown, fromVersion: number) => unknown>(() => true);
    const item = createVersionedStorageItem(storage, 'legacy', { version: 1, fallback: false, migrate });
    expect(item.get()).toBe(true);
    expect(migrate).toHaveBeenCalledExactlyOnceWith('on', 0);
  });
});

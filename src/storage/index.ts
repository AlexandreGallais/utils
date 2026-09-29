// Web storage (localStorage, sessionStorage): JSON reads and writes that never throw, typed items.

export { readStorage } from './read-storage.ts';
export { writeStorage } from './write-storage.ts';
export { createStorageItem } from './create-storage-item.ts';
export type { StorageItem } from './storage-item.ts';

// Web storage (localStorage, sessionStorage): JSON reads and writes that never throw, typed items.

export { readStorage } from './read-storage';
export { writeStorage } from './write-storage';
export { createStorageItem } from './create-storage-item';
export type { StorageItem } from './storage-item';
export { createVersionedStorageItem } from './create-versioned-storage-item';
export type { VersionedStorageOptions } from './create-versioned-storage-item';

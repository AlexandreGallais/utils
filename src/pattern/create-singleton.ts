/**
 * Creates a lazy singleton: the factory runs on the first call only, every call returns the same instance
 * (even `undefined`).
 *
 * @template T - Type of the instance.
 * @param factory - Creates the instance.
 * @returns A getter of the instance.
 * @example
 * const getWorker = createSingleton(() => new Worker(url));
 * getWorker() === getWorker(); // true, created once
 */
export function createSingleton<T>(factory: () => T): () => T {
  let isCreated = false;
  let instance: T;
  return (): T => {
    if (!isCreated) {
      instance = factory();
      isCreated = true;
    }
    return instance;
  };
}

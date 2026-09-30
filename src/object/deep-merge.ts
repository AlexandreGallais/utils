import { isRecord } from '../guard';
import type { DeepPartial } from '../types';

/**
 * Applies a partial patch to nested settings, such as saved preferences over the defaults: plain objects are
 * merged at every depth, other values replace, `undefined` keeps. A `__proto__` key stays a plain property.
 *
 * @template T - The type of the settings.
 * @param base - The complete object, such as the defaults.
 * @param patch - The values to change.
 * @returns A new object that shares the unchanged branches with `base`.
 * @example
 * deepMerge({ grid: { step: 10, isVisible: true } }, { grid: { isVisible: false } });
 * // { grid: { step: 10, isVisible: false } }
 */
export function deepMerge<T extends object>(base: T, patch: DeepPartial<NoInfer<T>>): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- A DeepPartial<T> merged into a T is a T.
  return mergeValues(base, patch) as T;
}

function mergeValues(base: unknown, patch: unknown): unknown {
  if (patch === undefined) {
    return base;
  }
  if (!isRecord(base) || !isRecord(patch)) {
    return patch;
  }
  return Object.fromEntries([
    ...Object.entries(base),
    ...Object.entries(patch).map(([key, value]) => [
      key,
      mergeValues(Object.hasOwn(base, key) ? base[key] : undefined, value),
    ]),
  ]);
}

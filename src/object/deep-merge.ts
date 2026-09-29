import { isRecord } from '../guard/is-record.ts';
import type { DeepPartial } from '../types/deep-partial.ts';

/**
 * Applies a partial patch to nested settings, such as saved user preferences over the defaults: plain
 * objects are merged at every depth, anything else (arrays, dates, primitives) in the patch replaces the
 * value, and `undefined` in the patch keeps the value. Safe with parsed JSON: a `__proto__` key stays an
 * ordinary property.
 *
 * @template T - The settings type.
 * @param base - The complete object, such as the defaults.
 * @param patch - The values to change.
 * @returns A new object; the unchanged branches are shared with `base`, neither argument is modified.
 * @example
 * deepMerge({ grid: { step: 10, isVisible: true }, series: ['a'] }, { grid: { isVisible: false } });
 * // { grid: { step: 10, isVisible: false }, series: ['a'] }
 */
export function deepMerge<T extends object>(base: T, patch: DeepPartial<NoInfer<T>>): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- a DeepPartial<T> merged into a T keeps the shape of T.
  return mergeValues(base, patch) as T;
}

/**
 * Merges one value of the patch into the matching value of the base.
 *
 * @param base - The current value.
 * @param patch - The patch value.
 * @returns The merged value.
 */
function mergeValues(base: unknown, patch: unknown): unknown {
  if (patch === undefined) {
    return base;
  }
  if (!isRecord(base) || !isRecord(patch)) {
    return patch;
  }
  // `Object.fromEntries` defines own properties: a `__proto__` key cannot change the prototype.
  return Object.fromEntries([
    ...Object.entries(base),
    ...Object.entries(patch).map(([key, value]) => [
      key,
      mergeValues(Object.hasOwn(base, key) ? base[key] : undefined, value),
    ]),
  ]);
}

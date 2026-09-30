import { assert, isRecord } from '../guard';
import { deepMerge } from './deep-merge';

describe(deepMerge, () => {
  const defaults = { grid: { step: 10, isVisible: true }, series: ['a', 'b'], title: 'Speed' };

  it('merges nested objects and replaces other values', () => {
    expect(deepMerge(defaults, { grid: { isVisible: false }, series: ['c'] })).toStrictEqual({
      grid: { step: 10, isVisible: false },
      series: ['c'],
      title: 'Speed',
    });
  });

  it('keeps the values that the patch leaves undefined', () => {
    const base: { title?: string | undefined; grid?: { step: number } | undefined } = { title: 'a', grid: { step: 1 } };
    expect(deepMerge(base, { title: undefined, grid: undefined })).toStrictEqual(base);
  });

  it('shares unchanged branches and modifies no argument', () => {
    const patch = { title: 'Heading' };
    const result = deepMerge(defaults, patch);
    expect(result.grid).toBe(defaults.grid);
    expect(defaults.title).toBe('Speed');
    expect(patch).toStrictEqual({ title: 'Heading' });
  });

  it('adds keys missing from the base', () => {
    expect(deepMerge<{ a?: { b?: number } }>({}, { a: { b: 1 } })).toStrictEqual({ a: { b: 1 } });
  });

  it('keeps __proto__ from JSON as an ordinary property', () => {
    const patch: unknown = JSON.parse('{ "__proto__": { "isAdmin": true } }');
    assert(isRecord(patch), 'Assertion failed');
    const result = deepMerge<Record<string, unknown>>({}, patch);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(Object.prototype).not.toHaveProperty('isAdmin');
  });

  it('takes the defaults for null or undefined', () => {
    expect(deepMerge({ a: 1 })).toStrictEqual(deepMerge({ a: 1 }, {}));
    expect(deepMerge({ a: 1 }, null)).toStrictEqual(deepMerge({ a: 1 }, {}));
  });
});

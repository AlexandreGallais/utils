import { omit } from './omit.ts';

describe(omit, () => {
  it('leaves the requested keys out', () => {
    expect(omit({ id: 1, name: 'Pump', internalRef: 'x' }, ['internalRef'])).toStrictEqual({ id: 1, name: 'Pump' });
  });

  it('keeps symbol keys and does not modify the source', () => {
    const tag = Symbol('tag');
    const source = { id: 1, [tag]: 'kept' };
    expect(omit(source, ['id'])).toStrictEqual({ [tag]: 'kept' });
    expect(source).toStrictEqual({ id: 1, [tag]: 'kept' });
  });

  it('skips non-enumerable properties', () => {
    const source = Object.defineProperty({ id: 1 }, 'hidden', { value: true, enumerable: false });
    expect(omit(source, [])).toStrictEqual({ id: 1 });
  });
});

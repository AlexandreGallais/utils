import { createIdGenerator } from './create-id-generator.ts';

describe(createIdGenerator, () => {
  it('generates increasing ids with the prefix', () => {
    const nextId = createIdGenerator('alarm');
    expect([nextId(), nextId(), nextId()]).toStrictEqual(['alarm-1', 'alarm-2', 'alarm-3']);
  });

  it('counts separately for each generator', () => {
    const first = createIdGenerator('a');
    const second = createIdGenerator('b');
    first();
    expect(second()).toBe('b-1');
  });
});

import { pick } from './pick';

class WithInheritedGetter {
  private readonly value = true;

  public get inherited(): boolean {
    return this.value;
  }
}

describe(pick, () => {
  it('keeps the requested keys', () => {
    expect(pick({ id: 1, name: 'Pump', rpm: 800 }, ['id', 'name'])).toStrictEqual({ id: 1, name: 'Pump' });
  });

  it('leaves absent keys out and does not modify the source', () => {
    const source: { id: number; label?: string } = { id: 1 };
    expect(pick(source, ['id', 'label'])).toStrictEqual({ id: 1 });
    expect(source).toStrictEqual({ id: 1 });
  });

  it('ignores inherited properties', () => {
    expect(pick(new WithInheritedGetter(), ['inherited'])).toStrictEqual({});
  });
});

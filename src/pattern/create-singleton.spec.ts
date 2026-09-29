import { createSingleton } from './create-singleton.ts';

describe(createSingleton, () => {
  it('does not call the factory before the first call', () => {
    const factory = vi.fn<() => object>(() => ({}));
    createSingleton(factory);
    expect(factory).not.toHaveBeenCalled();
  });

  it('calls the factory once and returns the same instance', () => {
    const factory = vi.fn<() => object>(() => ({}));
    const getInstance = createSingleton(factory);
    expect(getInstance()).toBe(getInstance());
    expect(factory).toHaveBeenCalledOnce();
  });

  it('caches an undefined instance too', () => {
    const factory = vi.fn<() => undefined>();
    const getInstance = createSingleton(factory);
    getInstance();
    getInstance();
    expect(factory).toHaveBeenCalledOnce();
  });
});

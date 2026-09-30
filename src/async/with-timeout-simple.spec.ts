import { withTimeoutSimple } from './with-timeout-simple';

describe(withTimeoutSimple, () => {
  it('resolves in time', async () => {
    await expect(withTimeoutSimple(Promise.resolve(42), 100)).resolves.toBe(42);
  });
});

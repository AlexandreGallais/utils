import { yieldToMain } from './yield-to-main';

describe(yieldToMain, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('waits for a macrotask without scheduler.yield', async () => {
    vi.useFakeTimers();
    const onResumed = vi.fn<() => void>();
    async function yieldThenNotify(): Promise<void> {
      await yieldToMain();
      onResumed();
    }
    const promise = yieldThenNotify();
    await Promise.resolve();
    expect(onResumed).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(0);
    await promise;
    expect(onResumed).toHaveBeenCalledOnce();
  });

  it('uses scheduler.yield when available', async () => {
    const yieldMock = vi.fn<() => Promise<void>>().mockResolvedValue();
    vi.stubGlobal('scheduler', { yield: yieldMock });
    await yieldToMain();
    expect(yieldMock).toHaveBeenCalledOnce();
  });

  it('ignores a scheduler without yield', async () => {
    vi.stubGlobal('scheduler', { postTask: vi.fn<() => void>() });
    await expect(yieldToMain()).resolves.toBeUndefined();
  });
});

import { copyText } from './copy-text.ts';

describe(copyText, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('writes the text to the clipboard', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>(async () => {
      await Promise.resolve();
    });
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    await expect(copyText('12.5 kn')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledExactlyOnceWith('12.5 kn');
  });

  it('returns false when the clipboard refuses', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: async (): Promise<void> => {
          await Promise.resolve();
          throw new DOMException('Denied', 'NotAllowedError');
        },
      },
    });
    await expect(copyText('x')).resolves.toBe(false);
  });

  it('returns false without clipboard', async () => {
    vi.stubGlobal('navigator', {});
    await expect(copyText('x')).resolves.toBe(false);
  });
});

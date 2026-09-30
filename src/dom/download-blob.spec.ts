import { downloadBlob } from './download-blob';

describe(downloadBlob, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('clicks a link to the blob, then releases it', () => {
    const link = { href: '', download: '', click: vi.fn<() => void>() };
    vi.stubGlobal('document', { createElement: vi.fn<(tag: string) => typeof link>(() => link) });
    const blob = new Blob(['x']);
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:2');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockReturnValue();
    downloadBlob(blob, 'x.bin');
    expect(createObjectURL).toHaveBeenCalledExactlyOnceWith(blob);
    expect(link.download).toBe('x.bin');
    expect(link.click).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledExactlyOnceWith('blob:2');
  });
});

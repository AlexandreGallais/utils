import { assert } from '../guard';
import { downloadText } from './download-text';

describe(downloadText, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('saves the text through a temporary link', async () => {
    const link = { href: '', download: '', click: vi.fn<() => void>() };
    vi.stubGlobal('document', { createElement: vi.fn<(tag: string) => typeof link>(() => link) });
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:1');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockReturnValue();
    downloadText('a,b', 'data.csv', 'text/csv');
    expect(link).toStrictEqual({ href: 'blob:1', download: 'data.csv', click: link.click });
    expect(link.click).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledExactlyOnceWith('blob:1');
    const blob = createObjectURL.mock.calls[0]?.[0];
    assert(blob instanceof Blob, 'Assertion failed');
    expect([blob.type, await blob.text()]).toStrictEqual(['text/csv;charset=utf-8', 'a,b']);
  });

  it('saves an empty plain text for null or undefined', async () => {
    const link = { href: '', download: '', click: vi.fn<() => void>() };
    vi.stubGlobal('document', { createElement: vi.fn<(tag: string) => typeof link>(() => link) });
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:1');
    vi.spyOn(URL, 'revokeObjectURL').mockReturnValue();
    downloadText(undefined, 'empty.txt');
    downloadText(null, 'empty.txt', null);
    const blobs = createObjectURL.mock.calls.map(([blob]) => blob);
    const contents = await Promise.all(
      blobs.map(async (blob) => (blob instanceof Blob ? [blob.type, await blob.text()] : [])),
    );
    expect(contents).toStrictEqual([
      ['text/plain;charset=utf-8', ''],
      ['text/plain;charset=utf-8', ''],
    ]);
  });
});

import { assert } from '../guard/assert.ts';
import { downloadTextSimple } from './download-text-simple.ts';

describe(downloadTextSimple, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('saves plain text', async () => {
    const link = { href: '', download: '', click: vi.fn<() => void>() };
    vi.stubGlobal('document', { createElement: vi.fn<(tag: string) => typeof link>(() => link) });
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:1');
    vi.spyOn(URL, 'revokeObjectURL').mockReturnValue();
    downloadTextSimple('hello', 'a.txt');
    const blob = createObjectURL.mock.calls[0]?.[0];
    assert(blob instanceof Blob, 'a Blob is downloaded');
    expect([blob.type, await blob.text(), link.download]).toStrictEqual(['text/plain;charset=utf-8', 'hello', 'a.txt']);
  });
});

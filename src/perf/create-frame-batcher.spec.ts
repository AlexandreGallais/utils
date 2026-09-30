import { createFrameBatcher } from './create-frame-batcher';

describe(createFrameBatcher, () => {
  let frameCallbacks: Map<number, FrameRequestCallback>;
  let nextFrameId: number;

  function runFrame(): void {
    const callbacks = [...frameCallbacks.values()];
    frameCallbacks.clear();
    for (const callback of callbacks) {
      callback(0);
    }
  }

  beforeEach(() => {
    frameCallbacks = new Map();
    nextFrameId = 1;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback): number => {
      const id = nextFrameId;
      nextFrameId += 1;
      frameCallbacks.set(id, callback);
      return id;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number): void => {
      frameCallbacks.delete(id);
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('runs the reads before the writes, in one frame', () => {
    const calls: string[] = [];
    const batcher = createFrameBatcher();
    batcher.write(() => {
      calls.push('write 1');
    });
    batcher.read(() => {
      calls.push('read 1');
    });
    batcher.write(() => {
      calls.push('write 2');
    });
    batcher.read(() => {
      calls.push('read 2');
    });
    expect(frameCallbacks.size).toBe(1);
    expect(calls).toStrictEqual([]);
    runFrame();
    expect(calls).toStrictEqual(['read 1', 'read 2', 'write 1', 'write 2']);
  });

  it('defers a task queued during the frame to the next frame', () => {
    const calls: string[] = [];
    const batcher = createFrameBatcher();
    batcher.read(() => {
      calls.push('read');
      batcher.write(() => {
        calls.push('late write');
      });
    });
    runFrame();
    expect(calls).toStrictEqual(['read']);
    runFrame();
    expect(calls).toStrictEqual(['read', 'late write']);
  });

  it('drops the queued tasks on cancel', () => {
    const task = vi.fn<() => void>();
    const batcher = createFrameBatcher();
    batcher.cancel();
    batcher.read(task);
    batcher.write(task);
    batcher.cancel();
    runFrame();
    expect(task).not.toHaveBeenCalled();
    batcher.write(task);
    runFrame();
    expect(task).toHaveBeenCalledOnce();
  });
});

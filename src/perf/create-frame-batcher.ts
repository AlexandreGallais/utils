import type { FrameBatcher } from './frame-batcher.ts';

/**
 * Creates a queue that runs all DOM reads, then all DOM writes, once per animation frame (the fastdom
 * pattern): interleaved reads and writes force the browser to compute the layout again after each write
 * (layout thrashing), which quickly eats the frame budget when many widgets update at a high rate. A task
 * queued while the frame runs goes to the next frame.
 *
 * @returns An empty batcher.
 * @example
 * const batcher = createFrameBatcher();
 * batcher.read(() => (width = host.clientWidth));
 * batcher.write(() => (bar.style.width = `${ratio * width}px`));
 */
export function createFrameBatcher(): FrameBatcher {
  let reads: (() => void)[] = [];
  let writes: (() => void)[] = [];
  let frame: number | undefined;

  function flush(): void {
    frame = undefined;
    const currentReads = reads;
    const currentWrites = writes;
    reads = [];
    writes = [];
    for (const task of currentReads) {
      task();
    }
    for (const task of currentWrites) {
      task();
    }
  }

  return {
    read(task: () => void): void {
      reads.push(task);
      frame ??= requestAnimationFrame(flush);
    },
    write(task: () => void): void {
      writes.push(task);
      frame ??= requestAnimationFrame(flush);
    },
    cancel(): void {
      if (frame !== undefined) {
        cancelAnimationFrame(frame);
        frame = undefined;
      }
      reads = [];
      writes = [];
    },
  };
}

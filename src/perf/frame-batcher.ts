/**
 * A queue of DOM reads and writes run together at the next frame, created by `createFrameBatcher`.
 */
export interface FrameBatcher {
  /**
   * Queues a layout read (`getBoundingClientRect`, `offsetWidth`…), run before every write of the frame.
   *
   * @param task - The read.
   */
  read(task: () => void): void;

  /**
   * Queues a DOM write (style, attribute, text), run after every read of the frame.
   *
   * @param task - The write.
   */
  write(task: () => void): void;

  /** Drops the queued tasks and the scheduled frame. */
  cancel(): void;
}

/** A stand-in for `ResizeObserver` and `IntersectionObserver` in Node, recording what it observes. */
export class FakeObserver {
  /** Every observer created since the last `reset`. */
  public static readonly instances: FakeObserver[] = [];

  public readonly callback: (entries: readonly unknown[]) => void;
  public readonly options: unknown;
  public readonly observed: { target: unknown; options: unknown }[] = [];
  public isDisconnected = false;

  public constructor(callback: (entries: readonly unknown[]) => void, options?: unknown) {
    this.callback = callback;
    this.options = options;
    FakeObserver.instances.push(this);
  }

  public static reset(): void {
    FakeObserver.instances.length = 0;
  }

  public observe(target: unknown, options?: unknown): void {
    this.observed.push({ target, options });
  }

  public disconnect(): void {
    this.isDisconnected = true;
  }

  public emit(entries: readonly unknown[]): void {
    this.callback(entries);
  }
}

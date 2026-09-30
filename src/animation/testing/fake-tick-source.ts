import type { ClockTick, TickSource } from '../../time';

/** A `TickSource` for the specs: ticks are emitted by hand with `tick(deltaMs)`. */
export class FakeTickSource implements TickSource {
  private readonly listeners = new Set<(tick: ClockTick) => void>();
  private timestamp = 0;
  private frame = 0;
  private elapsedMs = 0;

  public get listenerCount(): number {
    return this.listeners.size;
  }

  public subscribe(listener: (tick: ClockTick) => void): () => void {
    this.listeners.add(listener);
    return (): void => {
      this.listeners.delete(listener);
    };
  }

  public tick(deltaMs: number, timestamp: number = this.timestamp + deltaMs): void {
    this.timestamp = timestamp;
    this.frame += 1;
    this.elapsedMs += deltaMs;
    const clockTick: ClockTick = { timestamp, deltaMs, elapsedMs: this.elapsedMs, frame: this.frame };
    for (const listener of this.listeners) {
      listener(clockTick);
    }
  }
}

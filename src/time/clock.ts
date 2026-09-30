import type { ClockTick } from './clock-tick';

/** A function returning the current time, in milliseconds. */
type TimeSource = () => number;

/** Settings of a `Clock`: tick source, period and time source. */
export interface ClockOptions {
  /**
   * Tick source: `'frame'` ticks once per animation frame (`requestAnimationFrame`, for rendering),
   * `'interval'` every `intervalMs` (`setInterval`, for logic, also in the background).
   */
  readonly mode?: 'frame' | 'interval';
  /** Period of the `'interval'` mode, in milliseconds. */
  readonly intervalMs?: number;
  /** Time source, `performance.now` by default; replace it in tests. */
  readonly now?: TimeSource;
}

/** Default period of the `'interval'` mode, in milliseconds. */
const DEFAULT_INTERVAL_MS = 100;

/** A function called at each tick. */
type ClockListener = (tick: ClockTick) => void;

/** A listener and its cadence. */
interface Subscription {
  readonly listener: ClockListener;
  readonly everyMs: number | undefined;
}

/**
 * Shared tick source: one timer for the whole UI, whatever the number of subscribers, so everything animated
 * from it (blinking alarms, gauges, symbols) moves on the same tick. The timer starts with the first
 * subscriber and stops with the last one. Simulated time can be paused and scaled. Framework-agnostic: in
 * Angular, provide one instance and subscribe outside the zone (`NgZone.runOutsideAngular`).
 *
 * @example
 * const clock = new Clock({});
 * const unsubscribe = clock.subscribe(({ timestamp }) => {
 *   alarm.classList.toggle('on', isBlinkOn(timestamp, 1000, 0.5));
 * });
 * clock.subscribe(({ deltaMs }) => simulation.step(deltaMs), 100); // every 100 ms, same timeline
 * clock.timeScale = 2; // simulated time runs twice as fast
 */
export class Clock {
  private readonly mode: 'frame' | 'interval';
  private readonly intervalMs: number;
  private readonly now: () => number;
  private readonly subscriptions = new Set<Subscription>();
  /** Timeline slot of the last call of each cadenced listener. */
  private readonly lastSlots = new Map<Subscription, number>();
  private frameHandle: number | undefined;
  private intervalHandle: ReturnType<typeof setInterval> | undefined;
  private lastTimestamp: number | undefined;
  private elapsedMs = 0;
  private frame = 0;
  private paused = false;
  private scale = 1;

  /**
   * Creates a stopped clock; it starts with its first subscriber.
   *
   * @param options - Tick source (`'frame'` by default or `'interval'`), interval and time source.
   * @throws {RangeError} When `intervalMs` is not a positive finite number.
   */
  public constructor(options: ClockOptions) {
    const { mode = 'frame', intervalMs = DEFAULT_INTERVAL_MS, now = (): number => performance.now() } = options;
    if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
      throw new RangeError(`intervalMs must be a positive finite number, got ${intervalMs}`);
    }
    this.mode = mode;
    this.intervalMs = intervalMs;
    this.now = now;
  }

  /**
   * Whether simulated time is frozen.
   *
   * @returns `true` between `pause` and `resume`: ticks keep coming, with a `deltaMs` of `0`.
   */
  public get isPaused(): boolean {
    return this.paused;
  }

  /**
   * Whether a timer is running.
   *
   * @returns `true` while the clock has subscribers.
   */
  public get isRunning(): boolean {
    return this.subscriptions.size > 0;
  }

  /**
   * Speed of simulated time.
   *
   * @returns The factor applied to real time: `2` runs twice as fast, `0.5` half as fast.
   */
  public get timeScale(): number {
    return this.scale;
  }

  /**
   * Changes the speed of simulated time.
   *
   * @param value - A non-negative finite factor.
   * @throws {RangeError} When `value` is negative or not finite.
   */
  public set timeScale(value: number) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(`timeScale must be a non-negative finite number, got ${value}`);
    }
    this.scale = value;
  }

  /**
   * Calls a listener at each tick, or at most once per `everyMs` slot of the shared timeline.
   *
   * @param listener - Called with the tick.
   * @param everyMs - Optional cadence, in milliseconds. Slots are aligned on the time source, so listeners
   * with the same cadence always fire on the same tick.
   * @returns A function that unsubscribes the listener.
   */
  public subscribe(listener: ClockListener, everyMs?: number): () => void {
    const subscription: Subscription = { listener, everyMs };
    this.subscriptions.add(subscription);
    if (this.subscriptions.size === 1) {
      this.start();
    }
    return (): void => {
      this.lastSlots.delete(subscription);
      if (this.subscriptions.delete(subscription) && this.subscriptions.size === 0) {
        this.stop();
      }
    };
  }

  /** Freezes simulated time: `deltaMs` is `0` until `resume`. */
  public pause(): void {
    this.paused = true;
  }

  /** Resumes simulated time. */
  public resume(): void {
    this.paused = false;
  }

  private readonly onFrame = (): void => {
    this.tick();
    this.frameHandle = requestAnimationFrame(this.onFrame);
  };

  private readonly tick = (): void => {
    const timestamp = this.now();
    const realDelta = this.lastTimestamp === undefined ? 0 : timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    const deltaMs = this.paused ? 0 : realDelta * this.scale;
    this.elapsedMs += deltaMs;
    this.frame += 1;
    const clockTick: ClockTick = { timestamp, deltaMs, elapsedMs: this.elapsedMs, frame: this.frame };
    for (const subscription of this.subscriptions) {
      this.notify(subscription, clockTick);
    }
  };

  private notify(subscription: Subscription, clockTick: ClockTick): void {
    if (subscription.everyMs !== undefined) {
      const slot = Math.floor(clockTick.timestamp / subscription.everyMs);
      if (this.lastSlots.get(subscription) === slot) {
        return;
      }
      this.lastSlots.set(subscription, slot);
    }
    subscription.listener(clockTick);
  }

  private start(): void {
    if (this.mode === 'frame') {
      this.frameHandle = requestAnimationFrame(this.onFrame);
    } else {
      this.intervalHandle = setInterval(this.tick, this.intervalMs);
    }
  }

  private stop(): void {
    if (this.frameHandle !== undefined) {
      cancelAnimationFrame(this.frameHandle);
    }
    clearInterval(this.intervalHandle);
    this.frameHandle = undefined;
    this.intervalHandle = undefined;
    // The next start measures its first delta from itself, not from this stop.
    this.lastTimestamp = undefined;
  }
}

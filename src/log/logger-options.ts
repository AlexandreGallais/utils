import type { LogLevel } from './log-level.ts';
import type { LogSink } from './log-sink.ts';

/** A function returning the current time, in milliseconds since the epoch. */
type TimeSource = () => number;

/** Settings of `createLogger`: minimum level, output and clock. */
export interface LoggerOptions {
  /** Entries below this level are dropped; `'info'` by default, `'silent'` drops everything. */
  readonly level?: LogLevel;
  /** Output of the entries; the console by default. */
  readonly sink?: LogSink;
  /** Clock of the timestamps, `Date.now` by default; replace it in tests. */
  readonly now?: TimeSource;
}

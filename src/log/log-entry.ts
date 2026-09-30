import type { LogLevel } from './log-level';

/** A log entry, as handed to a `LogSink`. */
export interface LogEntry {
  /** Severity of the entry (never `'silent'`). */
  readonly level: Exclude<LogLevel, 'silent'>;
  /** Scope of the logger, such as `'engine'` or `'engine:pump'`. */
  readonly scope: string;
  /** The message. */
  readonly message: string;
  /** Extra values passed after the message (objects, errors). */
  readonly data: readonly unknown[];
  /** Time of the entry, in milliseconds since the epoch. */
  readonly timestamp: number;
}

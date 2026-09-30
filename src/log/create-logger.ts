import { consoleSink } from './console-sink';
import type { LogEntry } from './log-entry';
import type { LogLevel } from './log-level';
import type { Logger } from './logger';

/** Receives the entries of a logger and writes them somewhere: the console, a file, a server. */
export type LogSink = (entry: LogEntry) => void;

/** A function returning the current time, in milliseconds since the epoch. */
type TimeSource = () => number;

/** Settings of `createLogger`: minimum level, output and clock. */
export interface LoggerOptions {
  /** Entries below this level are dropped; `'info'` by default, `'silent'` drops everything. */
  readonly level?: LogLevel | null;
  /** Output of the entries; the console by default. */
  readonly sink?: LogSink | null;
  /** Clock of the timestamps, `Date.now` by default; replace it in tests. */
  readonly now?: TimeSource | null;
}

/** Rank of each level: an entry is kept when its rank reaches the minimum level's. */
const LEVEL_RANKS: Readonly<Record<LogLevel, number>> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  silent: 4,
};

/**
 * Creates a small scoped logger: four levels, a minimum level, sub-scopes, and a replaceable output (the
 * console by default). Entries below the minimum level cost a comparison, so `debug` calls can stay in hot
 * paths.
 *
 * @param scope - Name shown with each entry, such as the module or the component.
 * @param options - Minimum level, output and clock. Defaults to `{}`.
 * @returns An object with `debug`, `info`, `warn`, `error` and `child`.
 * @example
 * const log = createLogger('engine', { level: 'debug' });
 * log.info('Started', { rpm: 800 }); // [12:34:56.789] INFO engine: Started { rpm: 800 }
 * log.child('pump').warn('Pressure low'); // [12:34:56.790] WARN engine:pump: Pressure low
 */
export function createLogger(scope: string, options?: LoggerOptions | null): Logger {
  const resolvedOptions = options ?? {};
  const level = resolvedOptions.level ?? 'info';
  const sink = resolvedOptions.sink ?? consoleSink;
  const now = resolvedOptions.now ?? Date.now;
  const minimumRank = LEVEL_RANKS[level];

  function write(entryLevel: LogEntry['level'], message: string, data: readonly unknown[]): void {
    if (LEVEL_RANKS[entryLevel] >= minimumRank) {
      sink({ level: entryLevel, scope, message, data, timestamp: now() });
    }
  }

  return {
    scope,
    debug(message: string, ...data: readonly unknown[]): void {
      write('debug', message, data);
    },
    info(message: string, ...data: readonly unknown[]): void {
      write('info', message, data);
    },
    warn(message: string, ...data: readonly unknown[]): void {
      write('warn', message, data);
    },
    error(message: string, ...data: readonly unknown[]): void {
      write('error', message, data);
    },
    child(childScope: string): Logger {
      return createLogger(`${scope}:${childScope}`, resolvedOptions);
    },
  };
}

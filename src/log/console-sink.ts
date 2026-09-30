import type { LogEntry } from './log-entry';

/** `HH:MM:SS.mmm` of an ISO timestamp: characters 11 to 23. */
const TIME_START = 11;
const TIME_END = 23;

/**
 * Writes a log entry to the console with the method of its level (`console.warn` for a warning…), so the
 * DevTools level filters work: `[12:34:56.789] WARN engine: Pressure low`, followed by the extra values.
 *
 * @param entry - The entry to write.
 * @example
 * const log = createLogger('engine', { sink: consoleSink });
 */
export function consoleSink(entry: LogEntry): void {
  const date = new Date(entry.timestamp);
  const time = date.toISOString().slice(TIME_START, TIME_END);
  const text = `[${time}] ${entry.level.toUpperCase()} ${entry.scope}: ${entry.message}`;
  // eslint-disable-next-line no-console -- writing to the console is the purpose of this sink.
  console[entry.level](text, ...entry.data);
}

import type { LogEntry } from './log-entry.ts';

/** Receives the entries of a logger and writes them somewhere: the console, a file, a server. */
export type LogSink = (entry: LogEntry) => void;

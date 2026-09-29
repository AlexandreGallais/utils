import { createLogger } from './create-logger.ts';
import type { LogEntry } from './log-entry.ts';

describe(createLogger, () => {
  let entries: LogEntry[];

  function sink(entry: LogEntry): void {
    entries.push(entry);
  }

  beforeEach(() => {
    entries = [];
  });

  it('sends entries at or above the minimum level to the sink', () => {
    const log = createLogger('engine', { sink, now: () => 42 });
    log.debug('hidden');
    log.info('Started', { rpm: 800 });
    log.warn('Hot');
    log.error('Stopped');
    expect(entries.map(({ level }) => level)).toStrictEqual(['info', 'warn', 'error']);
    expect(entries[0]).toStrictEqual({
      level: 'info',
      scope: 'engine',
      message: 'Started',
      data: [{ rpm: 800 }],
      timestamp: 42,
    });
  });

  it('keeps debug entries at the debug level and nothing when silent', () => {
    createLogger('a', { sink, level: 'debug' }).debug('shown');
    createLogger('b', { sink, level: 'silent' }).error('hidden');
    expect(entries.map(({ message }) => message)).toStrictEqual(['shown']);
  });

  it('creates child loggers with the same settings', () => {
    const pump = createLogger('engine', { sink, level: 'warn' }).child('pump');
    pump.info('hidden');
    pump.warn('Pressure low');
    expect(pump.scope).toBe('engine:pump');
    expect(entries.map(({ scope }) => scope)).toStrictEqual(['engine:pump']);
  });

  it('writes to the console by default', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(vi.fn<() => void>());
    createLogger('app').info('Hello');
    expect(info).toHaveBeenCalledOnce();
    vi.restoreAllMocks();
  });
});

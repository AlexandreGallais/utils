import { consoleSink } from './console-sink.ts';

describe(consoleSink, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('writes with the console method of the level', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(vi.fn<() => void>());
    const details = { bar: 1.2 };
    consoleSink({ level: 'warn', scope: 'engine', message: 'Pressure low', data: [details], timestamp: 45_296_789 });
    expect(warn).toHaveBeenCalledExactlyOnceWith('[12:34:56.789] WARN engine: Pressure low', details);
  });

  it('writes errors with console.error', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(vi.fn<() => void>());
    consoleSink({ level: 'error', scope: 'io', message: 'Lost', data: [], timestamp: 0 });
    expect(error).toHaveBeenCalledExactlyOnceWith('[00:00:00.000] ERROR io: Lost');
  });
});

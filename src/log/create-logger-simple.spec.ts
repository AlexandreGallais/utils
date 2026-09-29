import { createLoggerSimple } from './create-logger-simple.ts';

describe(createLoggerSimple, () => {
  it('writes to the console', () => {
    const info = vi.spyOn(console, 'info').mockReturnValue();
    createLoggerSimple('chart').info('ready');
    expect(info).toHaveBeenCalledOnce();
    info.mockRestore();
  });
});

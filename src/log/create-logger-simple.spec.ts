import { createLoggerSimple } from './create-logger-simple';

describe(createLoggerSimple, () => {
  it('writes to the console', () => {
    const info = vi.spyOn(console, 'info').mockReturnValue();
    createLoggerSimple('chart').info('ready');
    expect(info).toHaveBeenCalledOnce();
    info.mockRestore();
  });
});

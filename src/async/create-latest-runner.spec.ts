import { createLatestRunner } from './create-latest-runner.ts';

/** Lets pending promise callbacks run, as a real async task would. */
async function nextTask(): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe(createLatestRunner, () => {
  it('resolves the latest run and rejects the superseded ones', async () => {
    const resolvers: ((value: string) => void)[] = [];
    const runner = createLatestRunner(
      async (_signal, query: string) =>
        new Promise<string>((resolve) => {
          resolvers.push((value) => {
            resolve(`${query}:${value}`);
          });
        }),
    );
    const first = runner.run('a');
    const second = runner.run('ab');
    resolvers[1]?.('new');
    resolvers[0]?.('old');
    await expect(first).rejects.toThrow('Superseded');
    await expect(second).resolves.toBe('ab:new');
  });

  it('aborts the signal of the superseded run', async () => {
    const signals: AbortSignal[] = [];
    const runner = createLatestRunner(async (signal) => {
      signals.push(signal);
      await nextTask();
      return signals.length;
    });
    const first = runner.run();
    const second = runner.run();
    await expect(first).rejects.toMatchObject({ name: 'AbortError' });
    await expect(second).resolves.toBe(2);
    expect(signals.map((signal) => signal.aborted)).toStrictEqual([true, false]);
  });

  it('cancels the pending run', async () => {
    const runner = createLatestRunner(async () => {
      await nextTask();
      return 1;
    });
    const run = runner.run();
    runner.cancel();
    runner.cancel();
    await expect(run).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('propagates the error of the task', async () => {
    const runner = createLatestRunner(async () => {
      await nextTask();
      throw new Error('offline');
    });
    await expect(runner.run()).rejects.toThrow('offline');
  });
});

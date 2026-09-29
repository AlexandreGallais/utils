import { createCleanupStack } from './create-cleanup-stack.ts';

describe(createCleanupStack, () => {
  it('runs the cleanups in reverse order, once', () => {
    const calls: string[] = [];
    const stack = createCleanupStack();
    stack.add(() => {
      calls.push('first');
    });
    stack.add(() => {
      calls.push('second');
    });
    stack.dispose();
    stack.dispose();
    expect(calls).toStrictEqual(['second', 'first']);
  });

  it('can be filled again after dispose', () => {
    const cleanup = vi.fn<() => void>();
    const stack = createCleanupStack();
    stack.dispose();
    stack.add(cleanup);
    stack.dispose();
    expect(cleanup).toHaveBeenCalledOnce();
  });

  it('runs every cleanup and then reports the errors', () => {
    const cleanup = vi.fn<() => void>();
    const stack = createCleanupStack();
    stack.add(cleanup);
    stack.add(() => {
      throw new Error('first failure');
    });
    stack.add(() => {
      throw new Error('second failure');
    });
    expect(() => {
      stack.dispose();
    }).toThrow(
      expect.objectContaining({
        name: 'AggregateError',
        errors: [new Error('second failure'), new Error('first failure')],
      }),
    );
    expect(cleanup).toHaveBeenCalledOnce();
  });
});

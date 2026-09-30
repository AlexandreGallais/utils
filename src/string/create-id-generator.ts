/**
 * Creates a generator of unique, readable identifiers: `alarm-1`, `alarm-2`… for SVG `id`s (gradients,
 * clip paths, markers), DOM ids or keys. Each generator counts on its own; ids are unique within one
 * generator, so use one prefix per generator.
 *
 * @param prefix - Start of every id, such as the component name. Defaults to `''`.
 * @returns A function returning the next id at each call.
 * @example
 * const nextGradientId = createIdGenerator('gauge-gradient');
 * gradient.id = nextGradientId(); // 'gauge-gradient-1'
 * arc.setAttribute('stroke', `url(#${gradient.id})`);
 */
export function createIdGenerator(prefix?: string | null): () => string {
  const resolvedPrefix = prefix ?? '';
  let counter = 0;
  return (): string => {
    counter += 1;
    return `${resolvedPrefix}-${counter}`;
  };
}

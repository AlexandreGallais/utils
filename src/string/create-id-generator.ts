/**
 * Creates a generator of readable unique ids: `gauge-1`, `gauge-2`… for SVG gradients, clip paths or markers.
 * Each generator counts on its own: use one prefix per generator.
 *
 * @param prefix - The start of every id, such as the component name.
 * @returns A function returning the next id at each call.
 * @example
 * const nextGradientId = createIdGenerator('gauge-gradient');
 * gradient.id = nextGradientId(); // 'gauge-gradient-1'
 * arc.setAttribute('stroke', `url(#${gradient.id})`);
 */
export function createIdGenerator(prefix: string): () => string {
  let counter = 0;
  return (): string => {
    counter += 1;
    return `${prefix}-${counter}`;
  };
}

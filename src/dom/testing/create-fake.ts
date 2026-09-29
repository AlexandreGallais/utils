/**
 * Builds a partial stand-in for a DOM object that Node does not have (an element, an observer entry).
 *
 * @param properties - The properties the code under test reads.
 * @returns The properties, typed as the full object.
 */
export function createFake<T extends object>(properties: Partial<T> = {}): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- test double: only the listed properties are read.
  return properties as T;
}

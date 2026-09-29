/**
 * Formats a count of items for a label, such as `3 users`.
 *
 * @param count - The number of items.
 * @param singular - The item name, such as `user`.
 * @returns The count and the name, plural when needed.
 */
export function formatCount(count: number, singular: string): string {
  return `${count} ${singular}${Math.abs(count) === 1 ? '' : 's'}`;
}

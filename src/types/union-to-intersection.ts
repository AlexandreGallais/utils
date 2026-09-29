/**
 * Turns a union into the intersection of its members: `A | B` gives `A & B`, to merge the types of a list
 * of mixins or handlers.
 *
 * @template U - The members to intersect, as a union.
 * @example
 * type All = UnionToIntersection<{ a: 1 } | { b: 2 }>; // { a: 1 } & { b: 2 }
 */
export type UnionToIntersection<U> = (U extends unknown ? (value: U) => void : never) extends (value: infer I) => void
  ? I
  : never;

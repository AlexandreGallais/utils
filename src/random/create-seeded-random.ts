/** Mulberry32 constants (Tommy Ettinger): increment and mixing multipliers. */
const INCREMENT = 0x6d_2b_79_f5;
const SHIFT_1 = 15;
const SHIFT_2 = 7;
const SHIFT_3 = 14;
const MULTIPLIER_OFFSET = 61;
/** 2^32: turns a 32-bit unsigned integer into a number in [0, 1[. */
const UINT32_RANGE = 4_294_967_296;

/**
 * Creates a fast pseudo-random generator from a seed (mulberry32): the same seed always gives the same
 * sequence, so a simulation scenario (noise, failures, traffic) can be replayed exactly. Pass it wherever a
 * `random` parameter is accepted (`randomBetween`, `shuffle`…). Not suitable for cryptography.
 *
 * @param seed - Any number; its 32 low bits are used.
 * @returns A function returning the next number in [0, 1[ at each call, like `Math.random`.
 * @example
 * const random = createSeededRandom(42);
 * const noise = randomBetween(-1, 1, random); // same value at every replay
 */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return (): number => {
    state = (state + INCREMENT) >>> 0;
    let mixed = Math.imul(state ^ (state >>> SHIFT_1), state | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> SHIFT_2), mixed | MULTIPLIER_OFFSET);
    return ((mixed ^ (mixed >>> SHIFT_3)) >>> 0) / UINT32_RANGE;
  };
}

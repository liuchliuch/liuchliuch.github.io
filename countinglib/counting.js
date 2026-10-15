// An illustrative browser computation, independent of the Lean library.
// Bit i records whether switch i is on. An edge forbids two on endpoints.
export const SWITCH_COUNT = 6;
export const RULES = Object.freeze({
  free: [],
  pair: [[0, 1]],
  cycle: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
});

export function followsRules(mask, edges) {
  return edges.every(([a, b]) => !((mask & (1 << a)) && (mask & (1 << b))));
}

export function allowedArrangements(edges) {
  return Array.from({ length: 1 << SWITCH_COUNT }, (_, mask) => mask)
    .filter(mask => followsRules(mask, edges));
}

export function bitsOf(mask) {
  return Array.from({ length: SWITCH_COUNT }, (_, i) => Boolean(mask & (1 << i)));
}

/** Spelling help for CSS: "centre" -> "center", "grid-template-column" -> "grid-template-columns". */

/** Optimal-string-alignment distance: insertions, deletions, substitutions and swapped neighbours each cost 1. */
export function editDistance(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const d: number[][] = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** The nearest candidate within `max` edits, or undefined. Ties go to the shortest distance, then alphabetical. */
export function closest(word: string, candidates: Iterable<string>, max = 2): string | undefined {
  let best: string | undefined;
  let bestDistance = max + 1;
  for (const candidate of candidates) {
    if (candidate === word) return undefined; // an exact match isn't a typo
    const distance = editDistance(word, candidate);
    if (distance < bestDistance || (distance === bestDistance && best !== undefined && candidate < best)) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return bestDistance <= max ? best : undefined;
}

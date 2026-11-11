/** Study streaks. Dates are local calendar days written as "YYYY-MM-DD". */

export function localDateKey(date: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** The calendar day `delta` days from `key`. Uses UTC maths, so daylight-saving changes can't skip a day. */
export function addDays(key: string, delta: number): string {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + delta)).toISOString().slice(0, 10);
}

/** Adds `today` to the list of active days (sorted, no duplicates, last ~year kept). */
export function recordActivity(days: string[] | undefined, today: string): string[] {
  const list = days ?? [];
  if (list.includes(today)) return list;
  return [...list, today].sort().slice(-400);
}

/** Consecutive active days ending today, or yesterday (so the streak isn't lost before you've studied today). */
export function currentStreak(days: string[] | undefined, today: string): number {
  const set = new Set(days ?? []);
  let cursor = set.has(today) ? today : set.has(addDays(today, -1)) ? addDays(today, -1) : null;
  let streak = 0;
  while (cursor && set.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function longestStreak(days: string[] | undefined): number {
  const sorted = [...new Set(days ?? [])].sort();
  let best = 0;
  let run = 0;
  for (let i = 0; i < sorted.length; i++) {
    run = i > 0 && addDays(sorted[i - 1], 1) === sorted[i] ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}

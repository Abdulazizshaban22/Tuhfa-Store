export const errorTimestamps: number[] = [];

export function recordError(ts: number = Date.now()) {
  errorTimestamps.push(ts);
  // keep only last 1 hour
  const cutoff = Date.now() - 60 * 60 * 1000;
  while (errorTimestamps.length && errorTimestamps[0] < cutoff) {
    errorTimestamps.shift();
  }
}

export function countErrorsSince(msAgo: number) {
  const since = Date.now() - msAgo;
  let i = errorTimestamps.length - 1, c = 0;
  while (i >= 0 && errorTimestamps[i] >= since) { c++; i--; }
  return c;
}

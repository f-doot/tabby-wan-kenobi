export function clamped(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}

export function rangeFromZero(to: number) {
  return [...Array(to).keys()];
}

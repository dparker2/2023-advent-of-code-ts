export function bisectLeft(
  arr: any[],
  value: any,
  key: (v: any) => number = (v) => v as number
) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (key(arr[mid]) < key(value)) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}

export function sortBy(
  arr: any[],
  key: (v: any) => number = (v) => v as number
) {
  arr.sort((a, b) => key(a) - key(b));
}

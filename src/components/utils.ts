export function setEqual<T>(prevSet: Set<T>, nextSet: Set<T>): boolean {
  if (prevSet.size !== nextSet.size) return false;

  for (const n of prevSet) {
    if (!nextSet.has(n)) {
      return false;
    }
  }

  return true;
}

import classNames from "classnames";
import { ClassValue } from "classnames/types";

export function setEqual<T>(prevSet: Set<T>, nextSet: Set<T>): boolean {
  if (prevSet.size !== nextSet.size) return false;

  for (const n of prevSet) {
    if (!nextSet.has(n)) {
      return false;
    }
  }

  return true;
}

function classNamesUndefined(...args: ClassValue[]): string | undefined {
  const className = classNames(args);
  return className === "" ? undefined : className;
}

export { classNamesUndefined as classNames };

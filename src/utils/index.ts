import isEqual from "lodash/isEqual";
import startCase from "lodash/startCase";

export function getFullName(first?: string, last?: string) {
  if (!first && !last) return "";

  let fullName = "";
  if (first) fullName += first;
  if (last) fullName += ` ${last}`;

  return startCase(fullName.trim());
}

export function getPersonFullName<
  P extends {
    firstName?: string;
    lastName?: string;
  }
>(person: P) {
  return getFullName(person.firstName, person.lastName);
}

export function onlyDifferentProps<T extends { [x: string]: unknown }>(
  obj: T,
  other: T
): Partial<T> {
  return Object.keys(obj).reduce((acc, key) => {
    if (!isEqual(obj[key], other[key])) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as T);
}

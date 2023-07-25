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
    firstName: string;
    lastName: string;
  }
>(person: P) {
  return getFullName(person.firstName, person.lastName);
}

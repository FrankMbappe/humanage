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

export function formatAsPercentage(n: number) {
  return `${Math.floor(n * 100)}%`;
}

export function generateUniqueID() {
  return String(Math.floor(Math.random() * Date.now()));
}

/**
 * https://stackoverflow.com/a/61418166
 * Generate all combinations of an array.
 * @param {Array} sourceArray - Array of input elements.
 * @param {number} comboLength - Desired length of combinations.
 * @return {Array} Array of combination arrays.
 */
export function generateCombinations<T>(
  sourceArray: T[],
  comboLength: number
): T[][] {
  const sourceLength = sourceArray.length;
  if (comboLength > sourceLength) return [];

  const combos: T[][] = []; // Stores valid combinations as they are generated.

  // Accepts a partial combination, an index into sourceArray,
  // and the number of elements required to be added to create a full-length combination.
  // Called recursively to build combinations, adding subsequent elements at each call depth.
  const makeNextCombos = (
    workingCombo: T[],
    currentIndex: number,
    remainingCount: number
  ) => {
    const oneAwayFromComboLength = remainingCount == 1;

    // For each element that remaines to be added to the working combination.
    for (
      let sourceIndex = currentIndex;
      sourceIndex < sourceLength;
      sourceIndex++
    ) {
      // Get next (possibly partial) combination.
      const next = [...workingCombo, sourceArray[sourceIndex]];

      if (oneAwayFromComboLength) {
        // Combo of right length found, save it.
        combos.push(next as T[]);
      } else {
        // Otherwise go deeper to add more elements to the current partial combination.
        makeNextCombos(next as T[], sourceIndex + 1, remainingCount - 1);
      }
    }
  };

  makeNextCombos([], 0, comboLength);
  return combos;
}

export function getSpectrumValue(
  value: number,
  spectrum: [string, string, string, string] = [
    "blue.400",
    "whatsapp.500",
    "orange",
    "red",
  ]
): string {
  if (value >= 75) return spectrum[0];
  if (value >= 50) return spectrum[1];
  if (value >= 25) return spectrum[2];
  return spectrum[3];
}

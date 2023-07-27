import { type Employee } from "@prisma/client";
import { PERSONALITY_COMPATIBILITY } from "./res";
import meanBy from "lodash/meanBy";
import orderBy from "lodash/orderBy";
import { type Composition, type Relationship } from "@/models";
import { generateCombinations } from ".";

export function getCompositions(
  candidates: Employee[],
  teamSize: number
): Composition[] {
  const combinations: Employee[][] = generateCombinations(candidates, teamSize);
  const compositions: Composition[] = combinations.map((combination) => ({
    members: combination,
    relationships: getRelationships(combination),
    compatibilityAvg: meanBy(
      getRelationships(combination),
      (r) => r.compatibility
    ),
  }));
  return orderBy(compositions, (c) => c.compatibilityAvg, "desc");
}

function getRelationships(employees: Employee[]): Relationship[] {
  const combinations: Employee[][] = generateCombinations(employees, 2);
  const relationships: Relationship[] = combinations.map((combination) => {
    const from = combination[0] as Employee;
    const to = combination[1] as Employee;
    return {
      from,
      to,
      compatibility:
        PERSONALITY_COMPATIBILITY[from.personality][to.personality],
    };
  });
  return relationships;
}

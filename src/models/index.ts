import { type Employee } from "@prisma/client";

export type Relationship = {
  from: Employee;
  to: Employee;
  compatibility: number;
};

export type Composition = {
  members: Employee[];
  relationships: Relationship[];
  compatibilityAvg: number;
};

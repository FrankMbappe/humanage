import { Personality } from "@prisma/client";
import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  jobPosition: z.string().min(1, { message: "Job position is required" }),
  picUrl: z.string().optional(),
  bio: z.string().optional(),
  personality: z.nativeEnum(Personality),
});
export const projectSchema = z.object({
  title: z.string(),
  candidateIds: z.array(z.string()).min(1, "At least 1 candidate"),
  teamSize: z.number().gt(2),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

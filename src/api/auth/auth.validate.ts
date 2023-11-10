import { z } from "zod";


export const registerRequestSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string(),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    role: z.enum(["TEACHER","STUDENT"]).optional()
 });

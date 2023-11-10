import { z } from "zod";


export const registerRequestSchema = z.object({
    fullName: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword:z.string().min(8).max(255),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    role: z.enum(["TEACHER","STUDENT"]).optional()
 }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirm"],
    });

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(255)
})

import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../db';

const bodyCreationValidator = z.object({
  teacherId: z.string().uuid(),
  skillName: z.string().min(2).max(32),
  description: z.string().optional(),
  pourcent: z.number().max(100).min(0)
});
const bodyUpdatingValidator = z.object({
  teacherId: z.string().uuid().optional(),
  skillName: z.string().min(2).max(32).optional(),
  description: z.string().optional(),
  pourcent: z.number().max(100).min(0).optional()
});

const paramsValidator = z.object({
  id: z.string().uuid()
});

export const z_CreateSkill = z.object({
  body: bodyCreationValidator
});
export const z_UpdateSkill = z.object({
  body: bodyUpdatingValidator,
  params: paramsValidator
});
export const z_idSkill = z.object({
  params: paramsValidator
});

export const checkForTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { teacherId } = req.body;
  const user = await prisma.teacher.findUnique({ where: { id: teacherId } });
  if (!user) return res.status(404).json({ message: 'Teacher not found !!!' });
  next();
};

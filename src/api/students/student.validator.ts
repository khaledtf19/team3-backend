import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../db';

const bodyCreationValidator = z.object({
  userId: z.string().uuid(),
  isStudent: z.boolean().optional()
});
const bodyUpdatingValidator = z.object({
  userId: z.string().uuid().optional(),
  isStudent: z.boolean().optional()
});

const paramsValidator = z.object({
  id: z.string().uuid()
});

export const z_CreateStudent = z.object({
  body: bodyCreationValidator
});
export const z_UpdateStudent = z.object({
  body: bodyUpdatingValidator,
  params: paramsValidator
});
export const z_idStudent = z.object({
  params: paramsValidator
});

export const checkForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: 'User not found !!!' });
  const student = await prisma.student.findUnique({ where: { userId } });
  if (student) return res.status(404).json({ message: 'Already exists !!!' });
  next();
};

import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../db';

const bodyCreationValidator = z.object({
  userId: z.string().uuid(),
  isTeacher: z.boolean().optional()
});
const bodyUpdatingValidator = z.object({
  userId: z.string().uuid().optional(),
  isTeacher: z.boolean().optional()
});

const paramsValidator = z.object({
  id: z.string().uuid()
});

export const z_Createteacher = z.object({
  body: bodyCreationValidator
});
export const z_UpdateTeacher = z.object({
  body: bodyUpdatingValidator,
  params: paramsValidator
});
export const z_idTeacher = z.object({
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
  const teacher = await prisma.teacher.findUnique({ where: { userId } });
  if (teacher)
    return res.status(404).json({ message: 'Teacher already exists !!!' });
  next();
};

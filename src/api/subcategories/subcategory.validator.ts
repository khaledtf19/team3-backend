import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../db';

const bodyCreationValidator = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(2).max(32)
});
const bodyUpdatingValidator = z.object({
  categoryId: z.string().uuid().optional(),
  name: z.string().min(2).max(32).optional()
});

const paramsValidator = z.object({
  id: z.string().uuid()
});

export const z_CreateSubcategory = z.object({
  body: bodyCreationValidator
});
export const z_UpdateSubcategory = z.object({
  body: bodyUpdatingValidator,
  params: paramsValidator
});
export const z_idSubcategory = z.object({
  params: paramsValidator
});

export const checkForCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.body;
  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });
    if (!category)
      return res
        .status(404)
        .json({ message: 'category not found, create it first !!!' });
  }
  next();
};

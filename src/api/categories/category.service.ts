import { Request, Response } from 'express';
import { prisma } from '../../db';
import asyncHandler from 'express-async-handler';

//@desc     Creates a new category
//@route    POST api/v1/categories
//@access   Private
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await prisma.category.create({ data: req.body });
    res.json({ msg: 'Category created', data: category });
  }
);

//@desc     Get all categories
//@route    GET api/v1/categories
//@access   Public
export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json({ results: categories.length, data: categories });
  }
);

//@desc     Get one category
//@route    GET api/v1/categories/:id
//@access   Public
export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) res.status(404).json({ error: 'Category not found' });

  res.status(200).json({ message: 'Success', data: category });
});

//@desc     Delete one category
//@route    DELETE api/v1/categories/:id
//@access   Private
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return res.status(404).json({ error: 'Category not found' });

    await prisma.category.delete({ where: { id } });
    return res.status(204).json({ message: 'Category deleted' });
  }
);

//@desc     Update one category
//@route    POST api/v1/categories/:id
//@access   Private
export const updateCategory = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const data = await prisma.category.update({
      where: { id },
      data: req.body,
    });
    return res.status(200).json({ message: 'Category updated', data });
  }
);

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../../db';

//@desc     Creates a new subcategory
//@route    POST api/v1/subcategories
//@access   Private
export const createSubCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const subcategory = await prisma.subCategory.create({ data: req.body });
    res.json({ msg: 'Subcategory created', subcategory: subcategory });
  }
);

//@desc     Get all categories
//@route    GET api/v1/subcategories
//@access   Public
export const getAllSubCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const subCategories = await prisma.subCategory.findMany({
      include: { category: true },
    });
    res.json({ results: subCategories.length, categories: subCategories });
  }
);

//@desc     Get one category
//@route    GET api/v1/subcategories/:id
//@access   Public
export const getSubcategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const subcategory = await prisma.subCategory.findUnique({
      where: {
        id: id,
      },
    });
    if (!subcategory) res.status(404).json({ error: 'Category not found' });
    res.status(200).json({ message: 'Successful!!', subcategory });
  }
);
//@desc     Delete one category
//@route    DELETE api/v1/subcategories/:id
//@access   Private
export const deleteSubcategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const checkSub = await prisma.subCategory.findUnique({ where: { id } });

    if (!checkSub) res.status(404).json({ error: 'Subcategory not found' });

    await prisma.subCategory.delete({ where: { id } });
    res.status(200).json({ message: 'Subcategory Deleted!!', checkSub });
  }
);

//@desc     Update one category
//@route    POST api/v1/subcategories/:id
//@access   Private
export const updateSubcategory = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const category = await prisma.subCategory.findUnique({ where: { id } });
    if (!category) res.status(404).json({ error: 'Subcategory not found' });

    await prisma.subCategory.update({ where: { id }, data: req.body });

    return res.status(200).json({ message: 'Subcategory updated!!', category });
  }
);

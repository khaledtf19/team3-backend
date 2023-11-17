// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@prisma/client/edge';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import {
  convertSortToObject,
  convertFieldsToObject,
  convertKeywordsToObject,
  convertFiltersToObject,
  pagingsObject,
  includeObject,
  capitalize
} from './Helpers';

export const createOne: any =
  (model: keyof PrismaClient, included: string[]) =>
  async (req: Request, res: Response) => {
    const name = capitalize(String(model));
    const dynamicModel = prisma[model] as any; // preparing the prisma model
    const query = await includeObject(included, { data: req.body }); //include fields in query
    const data = await dynamicModel.create(query); //create the prisma model
    return res.status(201).json({ msg: `${name} created successfully`, data });
  };

export const getOne: any =
  (model: keyof PrismaClient, included: string[]) =>
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const dynamicModel = prisma[model] as any;
    const name = capitalize(String(model));
    const query = await includeObject(included, { where: { id } });
    const data = await dynamicModel.findUnique(query);
    if (!data) return res.status(404).json({ error: `${name} not found!!` });

    return res
      .status(200)
      .json({ message: `${name} returned succesfully`, data });
  };
export const deleteOne: any =
  (model: keyof PrismaClient) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const dynamicModel = prisma[model] as any;
    const name = capitalize(String(model));
    const data = await dynamicModel.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ error: `${name} not found!!` });
    await dynamicModel.delete({ where: { id } });
    return res.status(204);
  };
export const updateOne: any =
  (model: keyof PrismaClient, included: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const dynamicModel = prisma[model] as any;
    const name = capitalize(String(model));
    const data = await dynamicModel.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ error: `${name} not found!!` });
    const query = await includeObject(included, {
      where: { id },
      data: req.body
    });

    const updated = await dynamicModel.update(query);
    return res
      .status(200)
      .json({ message: `${name} updated succesfully`, data: updated });
  };

export const getAll: any =
  (model: keyof PrismaClient, included: string[]) =>
  async (req: Request, res: Response) => {
    const { page, limit, fields, sort, keywords, ...filters } = req.query;
    const name = capitalize(String(model));
    const dynamicModel = prisma[model] as any;
    const count = await dynamicModel.count();
    const { skip, take, paging } = await pagingsObject(count, req.query);

    const query = await includeObject(included, {});

    let whereConditions: Record<string, any> = {};
    if (filters) {
      whereConditions = Object.create(
        whereConditions,
        convertFiltersToObject(filters, String(model))
      );
    }
    if (keywords) {
      whereConditions = Object.create(
        whereConditions,
        convertKeywordsToObject(String(keywords))
      );
    }

    // Apply filters
    let data = await dynamicModel.findMany({
      where: whereConditions,
      select: fields ? convertFieldsToObject(String(fields)) : undefined,
      orderBy: sort ? convertSortToObject(String(sort)) : undefined,
      skip,
      take,
      ...query
    });

    return res.status(200).json({
      message: `${name}(s) returned successfully`,
      paging,
      data
    });
  };

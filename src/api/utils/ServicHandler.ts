import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../../db";
import {
  convertSortToObject,
  convertFieldsToObject,
  convertKeywordsToObject,
  convertFiltersToObject,
  pagingsObject
} from "./Helpers";

export const createOne: any =
  (model: keyof PrismaClient) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const name = String(model).charAt(0).toUpperCase() + String(model).slice(1);
    const dynamicModel = prisma[model] as any;
    const data = await dynamicModel.create({ data: req.body });
    return res.status(201).json({ msg: `${name} created succesfully`, data });
  };

export const getOne: any =
  (model: keyof PrismaClient) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const dynamicModel = prisma[model] as any;
    const name = String(model).charAt(0).toUpperCase() + String(model).slice(1);

    const data = await dynamicModel.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ error: `${name} not found!!` });

    return res
      .status(200)
      .json({ message: `${name} returned succesfully`, data });
  };

export const updateOne: any =
  (model: keyof PrismaClient) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const dynamicModel = prisma[model] as any;
    const name = String(model).charAt(0).toUpperCase() + String(model).slice(1);

    const data = await dynamicModel.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ error: `${name} not found!!` });

    await dynamicModel.update({ where: { id }, data: req.body });

    return res
      .status(200)
      .json({ message: `${name} updated succesfully`, data });
  };
export const deleteOne: any =
  (model: keyof PrismaClient) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const dynamicModel = prisma[model] as any;
    const name = String(model).charAt(0).toUpperCase() + String(model).slice(1);

    const data = await dynamicModel.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ error: `${name} not found!!` });

    await dynamicModel.delete({ where: { id } });

    return res.status(204);
  };

export const getAll: any =
  (model: keyof PrismaClient) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, fields, sort, keywords, ...filters } = req.query;
    const name = String(model);
    const dynamicModel = prisma[model] as any;
    const count = await dynamicModel.count();
    const { skip, take, paging } = await pagingsObject(count, req.query);
    // Apply filters
    let data = await dynamicModel.findMany({
      where: convertFiltersToObject(filters, String(model))
    });

    // Apply fields selection
    if (fields) {
      data = await dynamicModel.findMany({
        select: convertFieldsToObject(String(fields))
      });
    }

    // Apply sorting
    if (sort) {
      data = await dynamicModel.findMany({
        orderBy: convertSortToObject(String(sort))
      });
    }

    // Apply search
    if (keywords) {
      data = await dynamicModel.findMany({
        wher: convertKeywordsToObject(String(keywords))
      });
    }

    // Apply pagination
    data = await dynamicModel.findMany({ skip, take });

    return res.status(200).json({
      message: `${name}(s) returned successfully`,
      paging,
      data
    });
  };

import { PrismaClient } from '@prisma/client';
import {
  convertSortToObject,
  convertFieldsToObject,
  convertKeywordsToObject,
  convertFiltersToObject,
} from './Helpers';

import { prisma } from '../db';

interface ExpectedQueryString {
  page?: number;
  limit?: number;
  fields?: string;
  sort?: string;
  keywords?: string;
}

export const fields: any = async (
  model: keyof PrismaClient,
  queryStr: Record<string, any>
) => {
  if (queryStr?.fields) {
    const dynamicModel = prisma[model] as any;
    const { fields } = queryStr as ExpectedQueryString;
    const fieldsObject: object = convertFieldsToObject(fields || '');
    return await dynamicModel.findMany({ select: { fieldsObject } });
  }
};
export const filters: any = async (
  model: keyof PrismaClient,
  queryStr: Record<string, any>
) => {
  const { page, limit, fields, sort, keywords, ...filters } =
    queryStr as ExpectedQueryString;
  const dynamicModel = prisma[model] as any;
  const fieldsObject: object = convertFiltersToObject(filters, String(model));
  return await dynamicModel.findMany({ where: { fieldsObject } });
};
export const sorts: any = async (
  model: keyof PrismaClient,
  queryStr: Record<string, any>
) => {
  if (queryStr?.sort) {
    const dynamicModel = prisma[model] as any;
    const { sort } = queryStr as ExpectedQueryString;
    const sortingObject: object = convertSortToObject(sort || '');
    return await dynamicModel.findMany({ orderBy: { sortingObject } });
  }
};
export const searchs: any = async (
  model: keyof PrismaClient,
  queryStr: Record<string, any>
) => {
  if (queryStr?.keywords) {
    const dynamicModel = prisma[model] as any;
    const { keywords } = queryStr as ExpectedQueryString;
    const searchingObject: object = convertKeywordsToObject(keywords || '');
    return await dynamicModel.findMany({ where: { searchingObject } });
  }
};
export const pagings: any = async (
  model: keyof PrismaClient,
  queryStr: Record<string, any>,
  count: number
) => {
  const page = queryStr.page || 1;
  const limit = queryStr.limit || 5;
  const skip = (page - 1) * limit;
  const endI = page * limit;
  const paging: Record<string, any> = {};

  let dynamicModel = prisma[model] as any;
  dynamicModel.pagination = paging;

  paging.CurrentPage = Number(page);
  paging.TotalPages = Math.ceil(count / limit);
  paging.TotalResults = count;
  paging.limit = limit;
  if (endI < count) paging.next = Number(page) + 1;
  if (skip > 0) paging.prev = Number(page) - 1;
  return await dynamicModel.findMany({
    where: {
      skip: skip,
      take: limit,
    },
  });
};

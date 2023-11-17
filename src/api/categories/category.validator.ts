import { z } from 'zod';
const bodyValidator = z.object({
  name: z
    .string({ required_error: 'Category name is required' })
    .min(3)
    .max(32)
    .trim()
});

const paramsValidator = z.object({
  id: z.string().uuid()
});

export const z_category = z.object({
  body: bodyValidator
});
export const z_UpdateCategory = z.object({
  body: bodyValidator,
  params: paramsValidator
});
export const z_idCategory = z.object({
  params: paramsValidator
});

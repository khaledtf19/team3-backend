// eslint-disable-next-line import/no-extraneous-dependencies
import { check } from 'express-validator';
import { validatorMiddleware } from '../../middlewares/validatorMiddlware';

export const getCategoryValidator = [
  check('id').isUUID().withMessage('Invalid category id format !!!'),
  validatorMiddleware,
];

export const createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name'),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  check('id').isUUID().withMessage('Invalid category id format !!!'),
  check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name'),
  validatorMiddleware,
];

export const deleteCategoryValidator = [
  check('id').isUUID().withMessage('Invalid category id format !!!'),
  validatorMiddleware,
];

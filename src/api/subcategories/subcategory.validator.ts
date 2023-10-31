// eslint-disable-next-line import/no-extraneous-dependencies
import { check } from 'express-validator';
import { validatorMiddleware } from '../../middlewares/validatorMiddlware';

export const getSubcategoryValidator = [
  check('id').isUUID().withMessage('Invalid Subcategory id format !!!'),
  validatorMiddleware,
];

export const createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('Subcategory required')
    .isLength({ min: 3 })
    .withMessage('Too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long Subcategory name'),
  check('categoryId').isUUID().withMessage('Invalid subcategory id format !!!'),
  validatorMiddleware,
];

export const updateSubcategoryValidator = [
  check('id').isUUID().withMessage('Invalid category id format !!!'),
  check('name')
    .notEmpty()
    .withMessage('Subcategory required')
    .isLength({ min: 3 })
    .withMessage('Too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long Subcategory name'),
  check('categoryId').isUUID().withMessage('Invalid subcategory id format !!!'),
  validatorMiddleware,
];

export const deleteSubcategoryValidator = [
  check('id').isUUID().withMessage('Invalid category id format !!!'),
  validatorMiddleware,
];

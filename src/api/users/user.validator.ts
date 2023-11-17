// eslint-disable-next-line import/no-extraneous-dependencies
import { check } from 'express-validator';
import { validatorMiddleware } from '../../middlewares/validatorMiddlware';

export const getUserValidator = [
  check('id').isUUID().withMessage('Invalid user id format !!!'),
  validatorMiddleware,
];

export const createUpdateUserValidator = [
  check('fullName')
    .notEmpty()
    .withMessage('Full name required')
    .isString()
    .withMessage('Full name must be text format')
    .isLength({ min: 8 })
    .withMessage('Too short full name')
    .isLength({ max: 50 })
    .withMessage('Too long full name'),
  check('city')
    .isLength({ min: 3 })
    .withMessage('Too short city name')
    .isLength({ max: 50 })
    .withMessage('Too long city name'),
  check('country')
    .isLength({ min: 3 })
    .withMessage('Too short country name')
    .isLength({ max: 50 })
    .withMessage('Too long country name'),
  check('email')
    .notEmpty()
    .withMessage('email required')
    .isEmail()
    .withMessage('email formai required')
    .isLength({ min: 5 })
    .withMessage('Too short email name')
    .isLength({ max: 50 })
    .withMessage('Too long email name'),
  check('adress')
    .isLength({ min: 5 })
    .withMessage('Too short email name')
    .isLength({ max: 50 })
    .withMessage('Too long email name'),
  validatorMiddleware,
];

export const deleteUserValidator = [
  check('id').isUUID().withMessage('Invalid user id format !!!'),
  validatorMiddleware,
];

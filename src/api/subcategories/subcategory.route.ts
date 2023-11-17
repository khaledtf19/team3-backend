import express from 'express';
const router = express.Router();
import { validate } from '../../middlewares/zodMiddleware';
import {
  z_CreateSubcategory,
  z_idSubcategory,
  z_UpdateSubcategory,
  checkForCategory
} from './subcategory.validator';
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategory,
  deleteSubcategory,
  updateSubcategory
} from './subcategory.service';

router
  .route('/')
  .post(validate(z_CreateSubcategory), checkForCategory, createSubcategory)
  .get(getAllSubcategories);

router
  .route('/:id')
  .get(validate(z_idSubcategory), getSubcategory)
  .delete(validate(z_idSubcategory), deleteSubcategory)
  .put(validate(z_UpdateSubcategory), checkForCategory, updateSubcategory);

export default router;

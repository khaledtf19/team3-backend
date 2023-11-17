import express from 'express';
const router = express.Router();
import { validate } from '../../middlewares/zodMiddleware';
import {
  z_category,
  z_idCategory,
  z_UpdateCategory
} from './category.validator';
import {
  createCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory
} from './category.service';

router
  .route('/')
  .post(validate(z_category), createCategory)
  .get(getAllCategories);

router
  .route('/:id')
  .get(validate(z_idCategory), getCategory)
  .delete(validate(z_idCategory), deleteCategory)
  .put(validate(z_UpdateCategory), updateCategory);

export default router;

import express from 'express';
const router = express.Router();
import {
  createCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} from './category.service';

import {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from './category.validator';

router
  .route('/')
  .get(getAllCategories)
  .post(createCategoryValidator, createCategory);
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .delete(deleteCategoryValidator, deleteCategory)
  .put(updateCategoryValidator, updateCategory);

export default router;

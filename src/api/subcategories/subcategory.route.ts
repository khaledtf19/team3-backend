import express from 'express';
const router = express.Router();
import {
  createSubCategory,
  getAllSubCategories,
  getSubcategory,
  deleteSubcategory,
  updateSubcategory,
} from './subcategory.service';

import {
  createSubCategoryValidator,
  getSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} from './subcategory.validator';
// ========= Routes ========= //
router
  .route('/')
  .get(getAllSubCategories)
  .post(createSubCategoryValidator, createSubCategory);
router
  .route('/:id')
  .get(getSubcategoryValidator, getSubcategory)
  .delete(deleteSubcategoryValidator, deleteSubcategory)
  .put(updateSubcategoryValidator, updateSubcategory);

export default router;

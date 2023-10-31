import express from 'express';

import userRoutes from './users/user.route';
import categoryRoutes from './categories/category.route';
import subCategoryRoutes from './subcategories/subcategory.route';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);

export default router;

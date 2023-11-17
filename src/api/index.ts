import express from 'express';

import categoryRoutes from './categories/category.route';
import subcategoryRoutes from './subcategories/subcategory.route';
import userRoutes from './users/user.route';
import teacherRoutes from './teachers/teacher.route';
import studentRoutes from './students/student.route';
import skillRoutes from './skills/skills.route';
import courseRoutes from './courses/course.route';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the app' });
});

router.use('/categories', categoryRoutes);
router.use('/subcategories', subcategoryRoutes);
router.use('/users', userRoutes);
router.use('/teachers', teacherRoutes);
router.use('/students', studentRoutes);
router.use('/skills', skillRoutes);
router.use('/courses', courseRoutes);

export default router;

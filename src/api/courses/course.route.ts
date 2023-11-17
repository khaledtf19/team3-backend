import express from 'express';
const router = express.Router();
import { validate } from '../../middlewares/zodMiddleware';
import {
  z_CreateCourse,
  z_idCourse,
  z_UpdateCourse,
  checkForTeacher
} from './course.validator';
import {
  createCourse,
  getAllCourses,
  getCourse,
  deleteCourse,
  updateCourse
} from './course.service';

router
  .route('/')
  .post(validate(z_CreateCourse), checkForTeacher, createCourse)
  .get(getAllCourses);

router
  .route('/:id')
  .get(validate(z_idCourse), getCourse)
  .delete(validate(z_idCourse), deleteCourse)
  .put(validate(z_UpdateCourse), updateCourse);

export default router;

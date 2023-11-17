import express from 'express';
const router = express.Router();
import { validate } from '../../middlewares/zodMiddleware';
import {
  z_Createteacher,
  z_idTeacher,
  z_UpdateTeacher,
  checkForUser
} from './teacher.validator';
import {
  createTeacher,
  getAllTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher
} from './teacher.service';

router
  .route('/')
  .post(validate(z_Createteacher), checkForUser, createTeacher)
  .get(getAllTeachers);

router
  .route('/:id')
  .get(validate(z_idTeacher), getTeacher)
  .delete(validate(z_idTeacher), deleteTeacher)
  .put(validate(z_UpdateTeacher), updateTeacher);

export default router;

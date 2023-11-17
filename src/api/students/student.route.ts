import express from 'express';
const router = express.Router();
import { validate } from '../../middlewares/zodMiddleware';
import {
  z_CreateStudent,
  z_idStudent,
  z_UpdateStudent,
  checkForUser
} from './student.validator';
import {
  createStudent,
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent
} from './student.service';

router
  .route('/')
  .post(validate(z_CreateStudent), checkForUser, createStudent)
  .get(getAllStudents);

router
  .route('/:id')
  .get(validate(z_idStudent), getStudent)
  .delete(validate(z_idStudent), deleteStudent)
  .put(validate(z_UpdateStudent), updateStudent);

export default router;

import express from 'express';
const router = express.Router();
import { validate } from '../../middlewares/zodMiddleware';
import {
  z_CreateSkill,
  z_idSkill,
  z_UpdateSkill,
  checkForTeacher
} from './skills.validator';
import {
  createSkill,
  getAllSkills,
  getSkill,
  deleteSkill,
  updateSkill
} from './skills.service';

router
  .route('/')
  .post(validate(z_CreateSkill), checkForTeacher, createSkill)
  .get(getAllSkills);

router
  .route('/:id')
  .get(validate(z_idSkill), getSkill)
  .delete(validate(z_idSkill), deleteSkill)
  .put(validate(z_UpdateSkill), updateSkill);

export default router;

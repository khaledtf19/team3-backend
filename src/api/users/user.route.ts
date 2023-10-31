import express from 'express';
const router = express.Router();
import {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} from './user.service';

import {
  getUserValidator,
  createUpdateUserValidator,
  deleteUserValidator,
} from './user.validator';
// ======== Routes ====== //
router.route('/').get(getAllUsers).post(createUpdateUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .delete(deleteUserValidator, deleteUser)
  .put(getUserValidator, createUpdateUserValidator, updateUser);

export default router;

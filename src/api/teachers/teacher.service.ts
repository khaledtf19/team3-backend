import {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getAll
} from '../../utils/ServicHandler';

const modelName: string = 'teacher';
const included: string[] = ['user'];

//@desc     Create a new teacher
//@route    POST api/v1/teachers
//@access   Private (user owner)
export const createTeacher = createOne(modelName, included);

//@desc     Get one teacher
//@route    GET api/v1/teachers/:id
//@access   Public
export const getTeacher = getOne(modelName, included);

//@desc     Update one teacher
//@route    POST api/v1/teachers/:id
//@access   Private (user owner)
export const updateTeacher = updateOne(modelName, included);

//@desc     Get all teachers
//@route    GET api/v1/teachers
//@access   Public
export const getAllTeachers = getAll(modelName, included);

//@desc     Delete one teacher
//@route    DELETE api/v1/teachers/:id
//@access   Private (user owner)
export const deleteTeacher = deleteOne(modelName);

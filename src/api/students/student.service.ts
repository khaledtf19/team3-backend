import {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getAll
} from '../../utils/ServicHandler';

const modelName: string = 'student';
const included: string[] = ['user'];

//@desc     Create a new student
//@route    POST api/v1/students
//@access   Private (user owner)
export const createStudent = createOne(modelName, included);

//@desc     Get one Student
//@route    GET api/v1/students/:id
//@access   Public
export const getStudent = getOne(modelName, included);

//@desc     Update one student
//@route    POST api/v1/students/:id
//@access   Private (user owner)
export const updateStudent = updateOne(modelName, included);

//@desc     Get all students
//@route    GET api/v1/students
//@access   Public
export const getAllStudents = getAll(modelName, included);

//@desc     Delete one student
//@route    DELETE api/v1/students/:id
//@access   Private (user owner)
export const deleteStudent = deleteOne(modelName);

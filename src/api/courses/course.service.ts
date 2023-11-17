import {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getAll
} from '../../utils/ServicHandler';

const modelName: string = 'course';
const included: string[] = ['teacher'];

//@desc     Create a new Course
//@route    POST api/v1/courses
//@access   Private (teacher owner)
export const createCourse = createOne(modelName, included);

//@desc     Get one Course
//@route    GET api/v1/courses/:id
//@access   Public
export const getCourse = getOne(modelName, included);

//@desc     Update one Course
//@route    POST api/v1/courses/:id
//@access   Private (teacher owner)
export const updateCourse = updateOne(modelName, included);

//@desc     Get all Courses
//@route    GET api/v1/courses
//@access   Public
export const getAllCourses = getAll(modelName, included);

//@desc     Delete one Course
//@route    DELETE api/v1/courses/:id
//@access   Private (teacher owner)
export const deleteCourse = deleteOne(modelName);

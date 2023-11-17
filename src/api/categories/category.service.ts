import {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getAll
} from '../../utils/ServicHandler';

const modelName: string = 'category';
const included: string[] = [];

//@desc     Create a new category
//@route    POST api/v1/categories
//@access   Private (Administrator)
export const createCategory = createOne(modelName, included);

//@desc     Get one category
//@route    GET api/v1/categories/:id
//@access   Public
export const getCategory = getOne(modelName, included);

//@desc     Update one category
//@route    POST api/v1/categories/:id
//@access   Private (Administrator)
export const updateCategory = updateOne(modelName, included);

//@desc     Get all categories
//@route    GET api/v1/categories
//@access   Public
export const getAllCategories = getAll(modelName, included);

//@desc     Delete one category
//@route    DELETE api/v1/categories/:id
//@access   Private (Administrator)
export const deleteCategory = deleteOne(modelName);

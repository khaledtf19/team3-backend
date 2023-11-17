import {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getAll
} from '../../utils/ServicHandler';

const modelName: string = 'subCategory';
const included: string[] = ['category'];

//@desc     Create a new Subcategory
//@route    POST api/v1/categories
//@access   Private (Administrator)
export const createSubcategory = createOne(modelName, included);

//@desc     Get one Subcategory
//@route    GET api/v1/categories/:id
//@access   Public
export const getSubcategory = getOne(modelName, included);

//@desc     Update one Subcategory
//@route    POST api/v1/categories/:id
//@access   Private (Administrator)
export const updateSubcategory = updateOne(modelName, included);

//@desc     Get all categories
//@route    GET api/v1/categories
//@access   Public
export const getAllSubcategories = getAll(modelName, included);

//@desc     Delete one Subcategory
//@route    DELETE api/v1/categories/:id
//@access   Private (Administrator)
export const deleteSubcategory = deleteOne(modelName);

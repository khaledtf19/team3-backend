import {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getAll
} from '../../utils/ServicHandler';

const modelName: string = 'skills';
const included: string[] = ['teacher'];

//@desc     Create a new Skill
//@route    POST api/v1/skills
//@access   Private (teacher owner)
export const createSkill = createOne(modelName, included);

//@desc     Get one Skill
//@route    GET api/v1/skills/:id
//@access   Public
export const getSkill = getOne(modelName, included);

//@desc     Update one Skill
//@route    POST api/v1/skills/:id
//@access   Private (teacher owner)
export const updateSkill = updateOne(modelName, included);

//@desc     Get all Skills
//@route    GET api/v1/skills
//@access   Public
export const getAllSkills = getAll(modelName, included);

//@desc     Delete one Skill
//@route    DELETE api/v1/skills/:id
//@access   Private (teacher owner)
export const deleteSkill = deleteOne(modelName);

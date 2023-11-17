import { Request, Response } from 'express';
import { prisma } from '../../db';

//@desc     Creates a new users
//@route    POST api/v1/user
//@access   Private
export const createUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({ data: req.body });
  res.json({ msg: 'user created', data: user });
};

//@desc     Get all user
//@route    GET api/v1/users
//@access   Public
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ results: users.length, data: users });
};

//@desc     Get one user
//@route    GET api/v1/users/:id
//@access   Public
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) res.status(404).json({ error: 'User not found!!' });

  res.status(200).json({ message: 'Getting user', data: user });
};

//@desc     Delete one user
//@route    DELETE api/v1/users/:id
//@access   Private
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'User not found!!' });

  await prisma.user.delete({ where: { id } });
  return res.status(204).json({ message: 'User deleted' });
};

//@desc     Update one user
//@route    POST api/v1/users/:id
//@access   Private
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'User not found!!' });

  const data = await prisma.user.update({
    where: { id },
    data: req.body
  });
  return res.status(200).json({ message: 'User updated', data });
};

import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../db';

const CourseStepVideo = z.object({
  duration: z.number(),
  title: z.string(),
  description: z.string(),
  videoLink: z.string()
});

const CourseStep = z.object({
  step: z.number(),
  title: z.string(),
  content: z.string(),
  imgCover: z.string(),
  video: CourseStepVideo
});

const bodyCreationValidator = z.object({
  teacherId: z.string().uuid(),
  title: z.string().min(5).max(60),
  description: z.string().min(10),
  hasCertificate: z.boolean().default(false),
  price: z.number().min(0).max(1000).default(0),
  published: z.boolean().default(false),
  imgCover: z.string().optional(),
  courseSteps: z.array(CourseStep).optional(),
  subCategories: z.array(z.string().uuid()).optional()
});
const bodyUpdatingValidator = z.object({
  teacherId: z.string().uuid().optional(),
  title: z.string().min(5).max(60).optional(),
  description: z.string().min(10).optional(),
  hasCertificate: z.boolean().default(false).optional(),
  price: z.number().min(0).max(1000).default(0).optional(),
  published: z.boolean().default(false).optional(),
  imgCover: z.string().optional(),
  courseSteps: z.array(CourseStep).optional(),
  subCategories: z.array(z.string().uuid()).optional()
});

const paramsValidator = z.object({
  id: z.string().uuid()
});

export const z_CreateCourse = z.object({
  body: bodyCreationValidator
});
export const z_UpdateCourse = z.object({
  body: bodyUpdatingValidator,
  params: paramsValidator
});
export const z_idCourse = z.object({
  params: paramsValidator
});

export const checkForTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { teacherId } = req.body;
  const user = await prisma.teacher.findUnique({ where: { id: teacherId } });
  if (!user) return res.status(404).json({ message: 'Teacher not found !!!' });
  next();
};

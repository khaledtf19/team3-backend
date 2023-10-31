import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line import/no-extraneous-dependencies
import { validationResult } from 'express-validator';

// @desc  Finds the validation errors in this request and

export const validatorMiddleware = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

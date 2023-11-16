import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
    (req as CustomRequest).user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};

import express from "express";
import { validate } from "../../middleware/validator";
import { registerRequestSchema, loginRequestSchema } from "./auth.validate";
import { z } from "zod";
import { hash, compare } from "bcrypt";
import { prisma } from "../../db";
import jwt from "jsonwebtoken";
import { authMiddleware, CustomRequest } from "../../middleware/auth";
const router = express.Router();

router.post<{}, {}, z.infer<typeof registerRequestSchema>>(
  "/register",
  validate(z.object({ body: registerRequestSchema })),
  async (req, res) => {
    const oldUser = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (oldUser?.id) {
      return res.status(400).json({ error: "This email has been used before" });
    }

    const hashedPassword = await hash(req.body.password, 10);

    if (req.body.role === "TEACHER") {
      await prisma.teacher.create({
        data: {
          user: {
            create: {
              fullName: req.body.fullName,
              email: req.body.email,
              password: hashedPassword,
              role: req.body.role,
            },
          },
        },
      });
    } else {
      await prisma.student.create({
        data: {
          user: {
            create: {
              fullName: req.body.fullName,
              email: req.body.email,
              password: hashedPassword,
              role: req.body.role,
            },
          },
        },
      });
    }
    res.status(200).json({ message: "User created successfully" });
  },
);

router.post<{}, {}, z.infer<typeof loginRequestSchema>>(
  "/login",
  validate(z.object({ body: loginRequestSchema })),
  async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
      include: { student: true, teacher: true },
    });
    if (!user?.id) {
      return res
        .status(404)
        .json({ error: `Couldn't find this user '${req.body.email}'` });
    }

    if (!(await compare(req.body.password, user?.password))) {
      return res.status(404).json({ error: `Incorrect password` });
    }
    const oldToken = await prisma.token.findUnique({
      where: { userId: user.id },
    });
    console.log(oldToken);
    if (
      oldToken &&
      jwt.verify(oldToken.token, process.env.JWT_SECRET_KEY || "")
    ) {
      return res.status(200).json({ token: oldToken.token });
    }
    console.log("expired");
    const tokenString = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY || "",
      { expiresIn: "5d" },
    );

    await prisma.token.create({
      data: { token: tokenString, userId: user.id },
    });

    res.status(200).json({ token: tokenString });
  },
);

router.get("/me", authMiddleware, (req, res) => {
  const user = (req as CustomRequest).user;
  res.status(200).json({ user: user });
});

export default router;

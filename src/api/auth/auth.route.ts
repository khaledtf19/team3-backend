import express from "express";
import { validate } from "../../middleware/validator";
import { registerRequestSchema, loginRequestSchema } from "./auth.validate";
import { z } from "zod";
import { hash } from "bcrypt";
import { prisma } from "../../db";

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
            },
          },
        },
      })
    }
    res.status(200).json({ message: "User created successfully" });
  },
);

router.post<{}, {}, z.infer<typeof loginRequestSchema>>(
  "/login",
  validate(z.object({ body: loginRequestSchema })),
  (req, res) => {
    res.status(200).json({});
  },
);

export default router;

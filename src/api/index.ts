import express from "express";
import { prisma } from "../db";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";

const router = express.Router();

router.get<{}>("/", async (req, res) => {
  const newUser = await prisma.user.create({
    data: {
      email: "khaledtf19@gmail.com",
    },
  });
  console.log(newUser);

  res.json({ user: newUser });
});

router.use("/emojis", emojis);

export default router;

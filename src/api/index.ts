import express from "express";
import { prisma } from "../db";
import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import authRoute from "./auth/auth.route"

const router = express.Router();

router.get<{w: string}, {message:string}>("/", async (req, res) => {
  
  res.json({ message: "" });
});

router.use("/emojis", emojis);
router.use("/auth", authRoute)


export default router;

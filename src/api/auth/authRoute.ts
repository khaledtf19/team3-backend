import express from "express";

const router = express.Router();

router.post<{ name: string; email: string; password: string }>(
  "/register",
  (req, res) => {},
);

export default router;

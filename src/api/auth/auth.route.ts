import express from "express";

const router = express.Router();

router.post<{
  fullName: string;
  email: string;
  password: string;
  adress?: string;
  city?: string;
  country?: string
  Role?: string;
}>("/register", (req, res) => {
    
  });

export default router;

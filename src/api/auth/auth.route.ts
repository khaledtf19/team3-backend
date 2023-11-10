import express from "express";
import { validate } from "../../middleware/validator";
import { registerRequestSchema } from "./auth.validate";
import { z } from "zod";

const router = express.Router();

router.post<{}, {}, z.infer<typeof registerRequestSchema>>(
  "/register",
  validate(z.object({ body: registerRequestSchema })),
  (req, res) => {
    
    res.status(200).json(req.body);
  },
);

export default router;

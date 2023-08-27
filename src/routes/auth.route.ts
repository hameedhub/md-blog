import express from "express";
import AuthController from "../controllers/auth.controller";
import validate, { validator } from "../validation/validator";
import { signupSchema } from "../validation/schemas";

const { signup } = AuthController;

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);

export default router;

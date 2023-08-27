import express from "express";
import AuthController from "../controllers/auth.controller";
import validate, { validator } from "../validation/validator";
import { signupSchema, loginSchema } from "../validation/schemas";

const { signup, login } = AuthController;

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;

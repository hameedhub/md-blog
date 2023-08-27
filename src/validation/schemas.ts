import Joi, { ValidationErrorFunction } from "joi";
import User from "../models/user.model";

export const signupSchema = Joi.object<User>({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(4).required(),
});

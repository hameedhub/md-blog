import Joi, { ValidationErrorFunction } from "joi";
import User from "../models/user.model";
import Post from "../models/post.model";

export const signupSchema = Joi.object<User>({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(4).required(),
});

export const loginSchema = Joi.object<User>({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(4).required(),
});

export const createPostSchema = Joi.object<Post>({
  user_id:  Joi.number().required(),
  title: Joi.string().trim().min(5).required(),
  summary: Joi.string().trim().min(10).required(),
  content: Joi.string().trim().min(10).required(),
});

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
  title: Joi.string().trim().min(5).required(),
  summary: Joi.string().trim().min(10).required(),
  content: Joi.string().trim().min(10).required(),
});

export const IdSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
})

export const updatePostSchema = Joi.object<Post>({
  title: Joi.string().trim().min(5),
  summary: Joi.string().trim().min(10),
  content: Joi.string().trim().min(10),
  published: Joi.number().min(0).max(1)
});
import express from "express";
import PostController from "../controllers/post.controller";
import validate, { validator } from "../validation/validator";
import { createPostSchema} from "../validation/schemas";

const { create  } = PostController;

const router = express.Router();

router.post("/", validator(createPostSchema), create);

export default router;
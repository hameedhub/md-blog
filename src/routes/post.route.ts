import express from "express";
import PostController from "../controllers/post.controller";
import validate, { validator } from "../validation/validator";
import { createPostSchema, IdSchema, updatePostSchema } from "../validation/schemas";

const { create, index, show, update } = PostController;

const router = express.Router();

router.post("/", validator(createPostSchema), create);
router.get("/", index);
router.get("/:id", validator(IdSchema, "params"), show);
router.patch('/:id', validator(IdSchema,  "params"), validator(updatePostSchema, 'body'), update )

export default router;

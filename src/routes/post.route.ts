import express from "express";
import PostController from "../controllers/post.controller";
import validate, { validator } from "../validation/validator";
import { createPostSchema, IdSchema } from "../validation/schemas";

const { create, index, show } = PostController;

const router = express.Router();

router.post("/", validator(createPostSchema), create);
router.get("/", index);
router.get("/:id", validator(IdSchema, "params"), show);

export default router;

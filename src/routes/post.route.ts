import express from "express";
import PostController from "../controllers/post.controller";
import { validator } from "../validation/validator";
import {
  createPostSchema,
  IdSchema,
  updatePostSchema,
} from "../validation/schemas";
import middlewares from "../middlewares";

const { auth } = middlewares;

const { create, index, show, update, remove } = PostController;

const router = express.Router();

router.post("/", auth, validator(createPostSchema), create);
router.get("/", index);
router.get("/:id", validator(IdSchema, "params"), show);
router.patch(
  "/:id",
  auth,
  validator(IdSchema, "params"),
  validator(updatePostSchema, "body"),
  update
);
router.delete("/:id", auth, validator(IdSchema, "params"), remove);

export default router;

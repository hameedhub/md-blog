import { Router } from "express";

import authRoute from "./auth.route";
import postRoute from './post.route';

const router = Router();

router.use("/auth", authRoute);
router.use('/posts', postRoute)

export default router;

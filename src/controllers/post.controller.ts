import { Response, Request } from "express";
import Post from "../models/post.model";
import PostService from "../services/post.service";

const { create } = PostService


export default class PostController {

    static async create(req: Request, res: Response) {
        try {
          const postData: Post = req.body;
          const data = await create(postData);
    
          res.status(201).json(data);
        } catch (error: any) {
          res.status(500).json(error.message);
        }
      }

}
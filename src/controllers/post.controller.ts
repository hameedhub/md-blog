import { Response, Request } from "express";
import Post from "../models/post.model";
import PostService from "../services/post.service";

const { create, index, show } = PostService;

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
  static async index(req: Request, res: Response) {
    try {
      const data = await index();
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
  static async show(req: Request, res: Response) {
    try {
      const data = await show(parseInt(req.params.id));
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}

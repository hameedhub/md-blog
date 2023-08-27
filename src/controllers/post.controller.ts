import { Response, Request } from "express";

import PostService from "../services/post.service";

const { create, index, show, update, remove } = PostService;

export default class PostController {
  static async create(req: Request, res: Response) {
    try {
      const data = await create(req.body, req.user.id);

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
  static async update(req: Request, res: Response) {
    try {
      const data = await update(parseInt(req.params.id), req.body, req.user.id);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
  static async remove(req: Request, res: Response) {
    try {
      
      const data = await remove(parseInt(req.params.id), req.user.id);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}

import { Response, Request } from "express";

import PostService from "../services/post.service";

import ResponseUtil from "../utils/response.util";

const { success, badRequest } = ResponseUtil

const { create, index, show, update, remove } = PostService;

export default class PostController {
  static async create(req: Request, res: Response) {
    try {
      const data = await create(req.body, req.user.id);

      success(res, data, 201)
    } catch (error: any) {
      badRequest(res, error.message)
    }
  
  }
  static async index(req: Request, res: Response) {
    try {
      const data = await index();
      success(res, data, 200)
    } catch (error: any) {
      badRequest(res, error.message)
    }
  }
  static async show(req: Request, res: Response) {
    try {
      const data = await show(parseInt(req.params.id));
      success(res, data, 200)
    } catch (error: any) {
      badRequest(res, error.message)
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const data = await update(parseInt(req.params.id), req.body, req.user.id);
      success(res, data, 200)
    } catch (error: any) {
      badRequest(res, error.message)
    }
  }
  static async remove(req: Request, res: Response) {
    try {
      
      const data = await remove(parseInt(req.params.id), req.user.id);
      success(res, data, 200)
    } catch (error: any) {
      badRequest(res, error.message)
    }
  }
}

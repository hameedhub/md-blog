import { Response, Request } from "express";
import Service from "../services/auth.service";
import User from "../models/user.model";
import ResponseUtil from "../utils/response.util";

const { success, badRequest } = ResponseUtil
const { signup, login } = Service;

export default class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      const data = await signup(userData);
      
      success(res, data, 201)
    } catch (error) {
      badRequest(res, error)
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const data = await login(req.body.email, req.body.password);
      success(res, data, 200)
    } catch (error) {
      badRequest(res, error)
    }
  }
}

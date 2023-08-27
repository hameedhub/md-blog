import { Response, Request } from "express";
import Service from "../services/auth.service";
import User from "../models/user.model";
import { Route, Post, Example } from "tsoa";

const { signup } = Service;

export default class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      const data = await signup(userData);

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ResponseUtil from "../utils/response.util";

const { badRequest } = ResponseUtil

const jwtSecret: string = process.env.JWTSECRET ?? "secret";

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("token") || req.header("Authorization");
  if (!token) return badRequest(res, "Access Denied, No token provided", 401);
  try {
    const payload = jwt.verify(token, jwtSecret);

    req.user = payload;
    next();
  } catch (error) {
    return badRequest(res, "Access Denied, Invalid token", 401);
  }
};

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

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
  if (!token) return res.status(401).json("Access Denied, No token provided");
  try {
    const payload = jwt.verify(token, jwtSecret);

    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json("Access Denied, Invalid token");
  }
};

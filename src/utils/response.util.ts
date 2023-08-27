import { Response } from "express";

export default class ResponseUtil {
  static success(res: Response, data: any, statusCode = 200, status = true) {
    return res.status(statusCode).json({ status, data });
  }

  static badRequest(res: Response, error: any, statusCode = 400, status = false) {
    return res.status(statusCode).json({ status, error });
  }
}

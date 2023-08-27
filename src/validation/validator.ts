import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

const validate =
  (schema: Schema, property: string = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property as keyof typeof req]);
    const valid = error == null;

    if (!valid) {
      return res.status(400).json(error.details[0].message);
    }
    next();
  };

export const validator =
  (schema: Schema, property: string = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property as keyof typeof req], {
      abortEarly: false,
    });

    if (error) {
      const errorMessages: string[] = error.details.map((err) => err.message);
      res.status(400).json(errorMessages);
    }

    next();
  };

export default validate;

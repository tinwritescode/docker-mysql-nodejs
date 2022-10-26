import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const validateBody =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: "Validation failed",
        error: error,
      });
    }
  };

export const validateQuery =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.query, { abortEarly: false });
      return next();
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: "Validation failed",
        error: error,
      });
    }
  };

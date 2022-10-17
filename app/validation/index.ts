import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

export const validate = (schema: yup.ObjectSchema<any>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false },
    )

    return next()
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: 'Validation failed',
      error: error,
    })
  }
}

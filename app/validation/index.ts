import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

export const validate = (schema: yup.ObjectSchema<any>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('req.body', req.body)
    //validate body
    await schema.validate(req.body, { abortEarly: false })
    return next()
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: 'Validation failed',
      error: error,
    })
  }
}

import { BaseResponse } from './../base/types/baseResponse'
import { Prisma } from '@prisma/client'
import { Response, Request, NextFunction } from 'express'
import ApiError from '../base/utils/apiError'

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err
  if (!(err instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
        ? 400
        : 500

    const message = error.message || 'Something went wrong'
    error = new ApiError(statusCode, message, false, error.stack)
  }
  next(error)
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: BaseResponse,
  next: NextFunction,
) => {
  let { status, message } = err
  res.locals.errorMessage = err.message

  res
    .status(status)
    .json({ ok: false, data: null, message, stack: err.stack } as any)
}

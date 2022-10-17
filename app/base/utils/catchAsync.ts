import { NextFunction, RequestHandler } from 'express'
import { BaseResponse } from '../types/baseResponse'

export const catchAsync = (fn: any): any => (
  req: Request,
  res: BaseResponse,
  next: NextFunction,
) => {
  // try {
  //   Promise.resolve(fn(req, res, next)).catch(next)
  // } catch (error) {
  //   next(error)
  // }

  Promise.resolve(fn(req, res, next)).catch(next)
}

import {
  createUserWithEmail,
  deleteUserById,
  getUserByEmail,
  getUserById,
  defaultUserFields,
} from './../service/user.service'
import tokenService, {
  generateAuthTokens,
  generateVerifyEmailToken,
} from '../service/token.service'
import { Prisma } from '@prisma/client'
import httpStatus from 'http-status'
import { BaseResponse } from './../base/types/baseResponse'
import { NextFunction, Request } from 'express'
import { excludeFields, prisma } from '../lib/prisma'
import { catchAsync } from '../base/utils/catchAsync'
import ApiError from '../base/utils/apiError'
import { comparePassword } from '../base/utils/passwordHashing'
import moment from 'moment'
import config from '../base/config/config'
import { sendVerificationRequest } from '../lib/nodemailer'

export const postLogin = catchAsync(
  async (req: Request, res: BaseResponse, next: NextFunction) => {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    })

    if (!user || !(await comparePassword(req.body.password, user.password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }

    if (user.isEmailVerified === false) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please verify your email')
    }

    const tokens = tokenService.generateAuthTokens(user)

    res.json({ ok: true, data: { user, tokens } })
  },
)

export const postRegister = catchAsync(
  async (req: Request, res: BaseResponse, next: NextFunction) => {
    const user = await getUserByEmail(req.body.email)

    if (user) {
      const diff = moment().diff(moment(user.createdAt), 'minutes')

      if (
        !user.isEmailVerified &&
        diff > config.jwt.verifyEmailExpirationMinutes
      ) {
        deleteUserById(user.id)
      } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email is already in use')
      }
    }

    const newUser = await createUserWithEmail(req.body.email)
    const token = await generateVerifyEmailToken(newUser)
    await sendVerificationRequest({
      identifier: req.body.email,
      token,
      url: `http://localhost:3000/verify-email?token=${token}`,
    })

    res.status(httpStatus.OK).json({ ok: true, message: 'Check your email' })
  },
)

export const postVerifyEmail = catchAsync(
  async (req: Request, res: BaseResponse, next: NextFunction) => {
    const token = await prisma.token.findFirst({
      where: {
        token: req.body.token,
      },
    })

    if (!token || token.blacklisted) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
    }

    const now = moment()
    const tokenExpiresAt = moment(token.expiresAt)
    const diff = now.diff(tokenExpiresAt, 'minutes')

    if (diff > 0) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token is expired')
    }

    const user = await prisma.user.update({
      where: {
        id: token.userId,
      },
      data: {
        password: req.body.password,
        name: req.body.name,
        isEmailVerified: true,
      },
      select: excludeFields(Prisma.UserScalarFieldEnum, ['password']),
    })

    await prisma.token.update({
      where: {
        id: token.id,
      },
      data: {
        blacklisted: true,
      },
    })

    res.status(httpStatus.OK).json({ ok: true, data: user })
  },
)

export const getLoginFacebook = catchAsync(
  async (req: Request, res: BaseResponse) => {
    //@ts-ignore
    const user = await getUserById(req.user.id, defaultUserFields)

    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')

    const tokens = await generateAuthTokens(user as any)
    res.json({ ok: true, data: { user, tokens } })
  },
)

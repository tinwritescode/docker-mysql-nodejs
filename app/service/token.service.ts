import { User, Token } from '@prisma/client'
import { prisma } from './../lib/prisma'
import jwt from 'jsonwebtoken'
import moment, { Moment } from 'moment'
import httpStatus from 'http-status'
import config from '../base/config/config'
import * as userService from './user.service'
import ApiError from '../base/utils/apiError'
import { TokenType } from 'prisma/prisma-client'

export const generateToken = (
  userId: any,
  expires: Moment,
  type: any,
  secret = config.jwt.secret,
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }
  return jwt.sign(payload, secret as string)
}

const saveToken = async (
  token: string,
  userId: number,
  expires: Moment,
  type: TokenType,
  blacklisted: boolean = false,
): Promise<Token> => {
  const tokenDoc = await prisma.token.create({
    data: {
      token,
      userId,
      expiresAt: expires.toDate(),
      type,
      blacklisted,
    },
  })
  return tokenDoc
}

const verifyToken = async (token: string, type: TokenType) => {
  const payload = jwt.verify(
    token,
    config.jwt.secret || 'PLEASE_UPDATE_SECRET__@@!!**((',
  )

  const tokenDoc = await prisma.token.findFirstOrThrow({
    where: {
      token,
      type,
      userId: payload.sub as any,
      blacklisted: false,
    },
  })
  if (!tokenDoc) {
    throw new Error('Token not found')
  }
  return tokenDoc
}

export const generateAuthTokens = async (user: User) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes',
  )
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    TokenType.ACCESS,
  )
  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days',
  )
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    TokenType.REFRESH,
  )
  await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  }
}

export const generateResetPasswordToken = async (email: string) => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email')
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes',
  )
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    TokenType.RESET_PASSWORD,
  )
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    TokenType.RESET_PASSWORD,
  )
  return resetPasswordToken
}

export const generateVerifyEmailToken = async (user: User) => {
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    'minutes',
  )
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    TokenType.VERIFY_EMAIL,
  )
  await saveToken(verifyEmailToken, user.id, expires, TokenType.VERIFY_EMAIL)
  return verifyEmailToken
}

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
}

import {
  hashPassword,
  getRandomPassword,
} from './../base/utils/passwordHashing'
import { User } from '@prisma/client'
import { prisma } from '../lib/prisma'

export const getUserByEmail = async (email: any): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export const getUserById = async (id: any, select?: any) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select,
  })
}

export const createUserWithEmail = async (email: any): Promise<User> => {
  return prisma.user.create({
    data: {
      email,
      password: await hashPassword(getRandomPassword()),
    },
  })
}

export const getRecentTokenByUser = async (user: User): Promise<any> => {
  return prisma.token.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const deleteUserById = async (id: any): Promise<any> => {
  return prisma.user.delete({
    where: {
      id,
    },
  })
}

export const updateUserById = async (id: any, data: any): Promise<any> => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  })
}

export const defaultUserFields = {
  id: true,
  email: true,
  name: true,
  isEmailVerified: true,
}

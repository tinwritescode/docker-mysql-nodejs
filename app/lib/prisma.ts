import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export function excludeFields<T, K extends keyof T>(fields: T, omit: K[]) {
  const result: Partial<Record<keyof T, boolean>> = {}
  for (const key in fields) {
    if (!omit.includes(key as any)) {
      result[key] = true
    }
  }
  return result
}

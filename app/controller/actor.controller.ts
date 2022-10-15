import { BaseResponse } from './../base/types/baseResponse'
import { Request } from 'express'
import { prisma } from '../lib/prisma'

export const getActor = async (_: Request, res: BaseResponse) => {
  const actors = await prisma.actor.findMany()
  res.json({ ok: true, data: actors })
}

export const postActor = async (req: Request, res: BaseResponse) => {
  const actor = await prisma.actor.create({
    data: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    },
  })
  res.json({ ok: true, data: actor })
}

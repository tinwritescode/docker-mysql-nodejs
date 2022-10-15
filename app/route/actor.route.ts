import { validate } from '../validation/index'
import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { postActorValidation } from '../validation/actor.validation'
import { BaseResponseBody } from '../base/types/baseResponse'

const router = Router()

router.get('/', async (req, res: Response<BaseResponseBody>) => {
  const actors = await prisma.actor.findMany()
  res.json({ ok: true, data: actors })
})

router.post('/', validate(postActorValidation), async (req, res) => {
  const actor = await prisma.actor.create({
    data: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    },
  })
  res.json(actor)
})

export default router

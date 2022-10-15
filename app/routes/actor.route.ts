import { validate } from './../validation/index'
import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { postActorValidation } from '../validation/actor.validation'

const router = Router()

router.get('/', async (req, res) => {
  const actors = await prisma.actor.findMany()
  res.json(actors)
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

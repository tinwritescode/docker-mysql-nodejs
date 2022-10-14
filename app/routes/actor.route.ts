import { Router } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

router.get('/', async (req, res) => {
  const actors = await prisma.actor.findMany()
  res.json(actors)
})

export default router

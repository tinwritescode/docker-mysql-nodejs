import { getActor, postActor } from './../controller/actor.controller'
import { validate } from '../validation/index'
import { Router } from 'express'
import { postActorValidation } from '../validation/actor.validation'

const router = Router()

router.get('/', getActor)
router.post('/', validate(postActorValidation), postActor)

export default router

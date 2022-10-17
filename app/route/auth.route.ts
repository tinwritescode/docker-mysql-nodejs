import {
  postRegisterValidation,
  postVerifyEmailValidation,
} from './../validation/login.validation'
import {
  getLoginFacebook,
  postRegister,
  postVerifyEmail,
} from './../controller/auth.controller'
import { postLoginValidation } from '../validation/login.validation'
import { validate } from '../validation/index'
import { Router } from 'express'
import { postLogin } from '../controller/auth.controller'
import passport from 'passport'

const router = Router()

// login with email
router.post('/login', validate(postLoginValidation), postLogin)
router.post('/register', validate(postRegisterValidation), postRegister)
router.post(
  '/verify-email',
  validate(postVerifyEmailValidation),
  postVerifyEmail,
)
// router.get(
//   '/facebook',
//   passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
// )
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
  getLoginFacebook,
)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: example1@yopmail.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register with email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *           example:
 *             email: example1@yopmail.com
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *             example:
 *               ok: true
 *               message: Success
 */

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               token:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               name:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 */

export default router

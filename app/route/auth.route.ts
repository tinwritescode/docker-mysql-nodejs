import {
  postRegisterValidation,
  postVerifyEmailValidation,
} from './../validation/login.validation'
import {
  getLoginFacebook,
  postForgotPassword,
  postRegister,
  postVerifyEmail,
  postVerifyForgotPassword,
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
router.post('/forgot-password', postForgotPassword)
router.post('/forgot-password/verify', postVerifyForgotPassword)
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
  getLoginFacebook,
)
router.get(
  '/facebook/token/callback',
  passport.authenticate('facebook-token'),
  getLoginFacebook,
)
router.get(
  '/google/token/callback',
  passport.authenticate('google-token'),
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

/**
 * @swagger
 * /auth/facebook/callback:
 *   get:
 *     summary: Login with facebook callback
 *     tags: [Auth]
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
 * /auth/facebook/token/callback:
 *   get:
 *     summary: Login with facebook token callback
 *     tags: [Auth]
 *   parameters:
 *     - in: query
 *       name: access_token
 *       schema:
 *         type: string
 *       required: true
 *       description: The access token
 *   responses:
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
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
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
 */

/**
 * @swagger
 * /auth/forgot-password/verify:
 *   post:
 *     summary: Verify forgot password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *           example:
 *                token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTY2NjA5NjIwNiwiZXhwIjoxNjY2MDk2ODA2LCJ0eXBlIjoiUkVTRVRfUEFTU1dPUkQifQ.Wm9ssGdhsGvVlcFskM5ZXE6oPfbUZmFN9-rU1p_ZZo4
 *                password: 123456
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
 */

/**
 * @swagger
 * /auth/google/token/callback:
 *   get:
 *     summary: Login with google token callback
 *     tags: [Auth]
 *   parameters:
 *     - in: query
 *       name: access_token
 *       schema:
 *         type: string
 *       required: true
 *       description: The access token
 *   responses:
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

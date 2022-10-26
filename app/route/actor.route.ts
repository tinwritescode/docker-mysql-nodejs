import { getActor, postActor } from "./../controller/actor.controller";
import { validateBody } from "../validation/index";
import { Router } from "express";
import { postActorValidation } from "../validation/actor.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Actor
 *   description: Actor management and retrieval
 */

/**
 * @swagger
 * definitions:
 *   Actor:
 *     type: object
 *     required:
 *       - first_name
 *       - last_name
 *     properties:
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       last_update:
 *         type: string
 *     example:
 *        first_name: 'Tin'
 *        last_name: 'Nguyen'
 *        last_update: '2020-12-12 12:12:12'
 */

/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Get all actors
 *     tags: [Actors]
 *     responses:
 *       200:
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
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Actor'
 */
router.get("/", getActor);

/**
 * @swagger
 * /actors:
 *  post:
 *   summary: Create a new actor
 *   tags: [Actors]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/definitions/Actor'
 *   responses:
 *     200:
 *       description: The actor was successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Actor'
 */
router.post("/", validateBody(postActorValidation), postActor);

export default router;

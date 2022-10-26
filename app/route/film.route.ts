import { Router } from "express";
import {
  updateFilm,
  deleteFilm,
  getFilm,
  getFilmById,
  postFilm,
} from "../controller/film.controller";
import { validateBody, validateQuery } from "../validation";
import {
  deleteFilmValidation,
  getFilmByIdValidation,
  postFilmValidation,
  putFilmValidation,
} from "../validation/film.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Film
 *   description: Film management and retrieval
 */

/**
 * @swagger
 * definitions:
 *   Film:
 *     type: object
 *     required:
 *       - title
 *       - description
 *       - release_year
 *       - language_id
 *       - rental_duration
 *       - rental_rate
 *       - replacement_cost
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       release_year:
 *         type: int
 *       language_id:
 *         type: int
 *       original_language_id:
 *         type: int
 *       rental_duration:
 *         type: int
 *       rental_rate:
 *         type: decimal
 *       length:
 *         type: int
 *       replacement_cost:
 *         type: decimal
 *       rating:
 *         type: string
 *       special_features:
 *         type: string
 *       last_update:
 *         type: string
 *     example:
 *        title: 'Tin'
 *        description: 'Nguyen'
 *        release_year: 2020
 *        language_id: 1
 *        original_language_id: 2
 *        rental_duration: 3
 *        rental_rate: 4
 *        length: 5
 *        replacement_cost: 6
 *        rating: 'R'
 *        special_features: 'commentaries'
 *        last_update: '2020-12-12 12:12:12'
 */

/**
 * @swagger
 * /films:
 *   get:
 *     summary: Get all films
 *     tags: [Films]
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
 *                     $ref: '#/definitions/Film'
 */
router.get("/", getFilm);

/**
 * @swagger
 * /films/{id}:
 *   get:
 *     summary: Get film by id
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the film to get
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
 *                   $ref: '#/definitions/Film'
 */
router.get("/:id", validateQuery(getFilmByIdValidation), getFilmById);

/**
 * @swagger
 * /films:
 *   post:
 *     summary: Create a new film
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Film'
 *     responses:
 *       200:
 *         description: The film was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Film'
 *       500:
 *         description: Some server error
 */
router.post("/", validateBody(postFilmValidation), postFilm);

/**
 * @swagger
 * /films:
 *   put:
 *     summary: Update a film by id
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the film to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Film'
 *     responses:
 *       200:
 *         description: The film was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Film'
 *       500:
 *         description: Some server error
 */
router.put("/:id", validateBody(putFilmValidation), updateFilm);

/**
 * @swagger
 * /films/{id}:
 *   delete:
 *     summary: Delete a film by id
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the film to delete
 *     responses:
 *       200:
 *         description: The film was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Film'
 *       500:
 *         description: Some server error
 */
router.delete("/:id", deleteFilm);

export default router;

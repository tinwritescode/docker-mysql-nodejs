import { BaseResponse } from "../base/types/baseResponse";
import { prisma } from "../lib/prisma";
import { Request } from "express";

export const getFilm = async (_: Request, res: BaseResponse) => {
  const films = await prisma.film.findMany();
  res.json({ ok: true, data: films });
};

export const getFilmById = async (req: Request, res: BaseResponse) => {
  const film = await prisma.film.findUnique({
    where: {
      film_id: Number(req.params.id),
    },
  });
  res.json({ ok: true, data: film });
};

export const postFilm = async (req: Request, res: BaseResponse) => {
  const film = await prisma.film.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      release_year: req.body.release_year,
      language_id: req.body.language_id,
      rental_duration: req.body.rental_duration,
      rental_rate: req.body.rental_rate,
      length: req.body.length,
      replacement_cost: req.body.replacement_cost,
      rating: req.body.rating,
      special_features: req.body.special_features,
    },
  });
  res.json({ ok: true, data: film });
};

export const updateFilm = async (req: Request, res: BaseResponse) => {
  const film = await prisma.film.update({
    where: {
      film_id: Number(req.params.id),
    },
    data: {
      title: req.body.title,
      description: req.body.description,
      release_year: req.body.release_year,
      language_id: req.body.language_id,
      rental_duration: req.body.rental_duration,
      rental_rate: req.body.rental_rate,
      length: req.body.length,
      replacement_cost: req.body.replacement_cost,
      rating: req.body.rating,
      special_features: req.body.special_features,
    },
  });
  res.json({ ok: true, data: film });
};

export const deleteFilm = async (req: Request, res: BaseResponse) => {
  console.log("req params", req.params);
  const film = await prisma.film.delete({
    where: {
      film_id: Number(req.params.id),
    },
  });
  res.json({ ok: true, data: film });
};

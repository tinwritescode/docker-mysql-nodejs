import * as yup from "yup";

export const postFilmValidation = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  release_year: yup.number().required(),
  language_id: yup.number().required(),
  original_language_id: yup.number().required(),
  rental_duration: yup.number().required(),
  rental_rate: yup.number().required(),
  length: yup.number().required(),
  replacement_cost: yup.number().required(),
  rating: yup.string().required(),
  special_features: yup.string().required(),
  last_update: yup.string().required(),
});

export const putFilmValidation = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  release_year: yup.number().required(),
  language_id: yup.number().required(),
  original_language_id: yup.number().required(),
  rental_duration: yup.number().required(),
  rental_rate: yup.number().required(),
  length: yup.number().required(),
  replacement_cost: yup.number().required(),
  rating: yup.string().required(),
  special_features: yup.string().required(),
  last_update: yup.string().required(),
});

export const deleteFilmValidation = yup.object().shape({
  id: yup.number().required(),
});

export const getFilmByIdValidation = yup.object().shape({
  id: yup.number().required(),
});

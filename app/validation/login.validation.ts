import * as yup from 'yup'

export const postLoginValidation = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
})

export const postRegisterValidation = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email().required(),
  }),
})

export const postVerifyEmailValidation = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email().required(),
    token: yup.string().required(),
    password: yup.string().required(),
    name: yup.string(),
  }),
})

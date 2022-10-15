import * as yup from 'yup'

export const postActorValidation = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
})

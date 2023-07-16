import * as Yup from 'yup'

export interface Inputs {
  username: string
  email: string,
  password: string
}

export const registerSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string()
    .min(2, 'Too Short! Must be at least 2 characters')
    .max(50, 'Too Long! Must be at most 50 characters')
    .required('Required')
})

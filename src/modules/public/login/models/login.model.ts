import * as Yup from 'yup'

export interface Inputs {
  email: string
  password: string
}

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
})

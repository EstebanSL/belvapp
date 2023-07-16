import * as Yup from 'yup'

export interface Inputs {
  username: string
  password: string
}

export const loginInstitutionSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
})

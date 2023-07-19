import { Field, Form, Formik } from 'formik'
import { type Inputs, loginInstitutionSchema } from './models/loginInstitution.model'
import useFetchAndLoad from '../../../hooks/useFetch'
import { RegisterLink } from './services/links.service'
import { useParams, useNavigate } from 'react-router-dom'
import './LoginInstitution.styles.scss'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { LinkContext } from '../../../context/linkContext'
import { Link } from './models/link.model'
import { showErrorToast } from '../../../utilities/toast-notifications.utility'

export const LoginInstitution = (): JSX.Element => {
  const { loading, callEndpoint } = useFetchAndLoad()
  const { setNewLink } = useContext(LinkContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const handleSubmit = (values: Inputs): void => {
    const body = {
      institution: id,
      ...values
    }

    callEndpoint(RegisterLink(body))
      .then((data: Link) => {
        setNewLink(data)
        navigate(`/institution/details/${id!}`)
        localStorage.setItem('link', JSON.stringify(data))
      })
      .catch(err => {
        showErrorToast(err.response.data[0].message)
        console.log(err)
      })
  }


  const backToInstitutions = (): void => {
    navigate('/institutions')
  }

  return (
    <div className='login-institution'>
      <div className="login-institution__formCont">
        <h2 className='login-institution__title'>Login Institution</h2>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={loginInstitutionSchema}
          onSubmit={(values: Inputs) => {
            handleSubmit(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className='formCont__inputs'>
              <div className='form__field'>
                <Field
                  name="username"
                  type="username"
                  autoComplete="off"
                  placeholder="username"
                />
                {(errors.username != null) && (touched.username ?? false) && (
                  <p className='error'>{errors.username}</p>
                )}
              </div>
              <div className='form__field'>
                <Field
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="password"
                />
                {(errors.password != null) && (touched.password ?? false) && (
                  <p className='error'>{errors.password}</p>
                )}
              </div>
              <div className="buttons">
                <Button disabled={loading} variant='contained' color='primary' type='submit'>
                  {loading ? 'Entering...' : 'Enter'}
                </Button>
              </div>
              <p className='back-link' onClick={() => { backToInstitutions() }}>
                back to institutions
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

import { useContext } from 'react'

// Custom components
import { AuthContext } from '../../../context/AuthContext'
import useFetchAndLoad from '../../../hooks/useFetch'

// Third party libraries
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

// Services and Models
import { registerSchema, type Inputs } from './models/register.model'

// Assets
import LoginMobileImage from '../../../assets/img-login.svg'
import LoginDesktopImage from '../../../assets/login-desktop.svg'

import './Register.styles.scss'
import { showErrorToast } from '../../../utilities/toast-notifications.utility'
import { RegisterUser } from '../services/register.service'

export const Register = (): JSX.Element => {

  // Variables declarations
  const navigate = useNavigate()
  const { callEndpoint, loading } = useFetchAndLoad()
  const { login } = useContext(AuthContext)

  // Functions
  const gotToLogin = (): void => {
    navigate('/login')
  }

  const onRegister = async (data: Inputs): Promise<void> => {
    try {
      const result = await callEndpoint(RegisterUser(data))
      login(result)
    } catch (error: any) {
      showErrorToast(error.response.data.message)
    }
  }

  // Template
  return (
    <div className='register-container'>
      <img src={LoginMobileImage} alt="login mobile" className='login-mobile-image' />

      <div className='login__form-container'>

        <h2>REGISTER</h2>
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: ''
          }}
          validationSchema={registerSchema}
          onSubmit={(values: Inputs) => {
            onRegister(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className='form'>
              <div>
                <span>Username</span>
                <Field
                  name="username"
                  type="username"
                  autoComplete="off"
                  placeholder="username"
                  className={(errors.username) && (touched.username) ? 'institutions-input error-input' : 'institutions-input'}
                />
                {(errors.username) && (touched.username) && (
                  <p className='error'>{errors.email}</p>
                )}
              </div>
              <div>
                <span>Email</span>
                <Field
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="email"
                  className={(errors.email) && (touched.email) ? 'institutions-input error-input' : 'institutions-input'}
                />
                {(errors.email) && (touched.email) && (
                  <p className='error'>{errors.email}</p>
                )}
              </div>
              <div>
                <span>Password</span>
                <Field
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="password"
                  className={(errors.password) && (touched.password) ? 'institutions-input error-input' : 'institutions-input'}
                />
                {(errors.password) && (touched.password) && (
                  <p className='error'>{errors.password}</p>
                )}
              </div>
              <Button color='primary' variant='contained' type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>

        <p className='link' onClick={() => { gotToLogin() }}>Already have an account? Login here</p>
      </div>
      <div className="login-desktop-cont">
        <div className='login-text'>
          <h2>Welcome to <span>BelvApp</span></h2>
          <p>Register to control all you bank <br /> accounts in one place </p>
        </div>
        <img src={LoginDesktopImage} alt="login desktop" className='login-desktop-image' />
      </div>

    </div >
  )
}

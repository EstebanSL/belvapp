import { useContext } from 'react';

//Custom components imports
import useFetchAndLoad from '../../../hooks/useFetch';
import { AuthContext } from '../../../context/AuthContext';
import { showErrorToast, showSuccessToast } from '../../../utilities/toast-notifications.utility';

//Services and Models
import { LoginUser } from '../services/login.service';
import { loginSchema, type Inputs } from './models/login.model';

//Third party library
import { Formik, Form, Field } from 'formik'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

//assets
import LoginMobileImage from '../../../assets/img-login.svg'
import LoginDesktopImage from '../../../assets/login-desktop.svg'

//styles
import './Login.styles.scss'

export const Login = (): JSX.Element => {

  //Variables declaration
  const navigate = useNavigate();
  const { callEndpoint, loading } = useFetchAndLoad();
  const { login } = useContext(AuthContext);

  //Functions
  const gotToRegister = () => {
    navigate('/register')
  }
  const onLogin = async (data: any) => {
    try {
      const result = await callEndpoint(LoginUser(data));
      login(result);
      showSuccessToast('Hello ' + result.user.username)
    } catch (error: any) {
      showErrorToast(error.response.data.message)
      console.log(error);
    }
  };

  //Template
  return (
    <div className='login-container'>
      <img src={LoginMobileImage} alt="login mobile" className='login-mobile-image' />
      <div className='login__form-container'>
        <h2>LOGIN</h2>

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={loginSchema}
          onSubmit={(values: Inputs) => {
            onLogin(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className='form'>
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
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>

        <p className='link' onClick={() => gotToRegister()}>Don´t have an account? Register here</p>
      </div>

      <div className="login-desktop-cont">
        <div className='login-text'>
          <h2>Welcome to <span>BelvApp</span></h2>
          <p>Log in to access your account</p>
        </div>
        <img src={LoginDesktopImage} alt="login desktop" className='login-desktop-image' />
      </div>

    </div >
  )
}

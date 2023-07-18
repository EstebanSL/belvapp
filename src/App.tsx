import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './modules/public/login/Login'
import { Institutions } from './modules/private/Institutions/Institutions'
import { LoginInstitution } from './modules/private/loginInstitution/LoginInstitution'
import { InstitutionDetails } from './modules/private/institutionDetails/InstitutionDetails'
import { AccountDetails } from './modules/private/accountDetails/AccountDetails'
import { LinkGuard } from './guards/link.guard'
import { Register } from './modules/public/register/Register'
import AuthContextProvider from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import { PublicGuard } from './guards/public.guard'
import { AuthGuard } from './guards/auth.guard'

function App (): JSX.Element {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicGuard />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>

          <Route element={<AuthGuard />}>
            <Route path='/institutions' element={<Institutions />} />
            <Route path='/institution/login/:id' element={<LoginInstitution />} />
            <Route element={<LinkGuard />}>
              <Route path='/institution/details/:id' element={<InstitutionDetails />} >
                <Route path='account/:accountId' element={<AccountDetails />} />
                <Route path="*" element={<Navigate to="/institutions" />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/institutions" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthContextProvider>
  )
}

export default App

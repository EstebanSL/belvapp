import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard, PublicGuard } from './guards';
import { Login } from './modules/public/login/Login';
import { Register } from './modules/public/register/Register';
import { Institutions } from './modules/private/Institutions/Institutions';
import { LoginInstitution } from './modules/private/loginInstitution/LoginInstitution';
import { InstitutionDetails } from './modules/private/institutionDetails/InstitutionDetails';
import { AccountDetails } from './modules/private/accountDetails/AccountDetails';

function App() {
  return (
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
          <Route path='/institution/details/:id' element={<InstitutionDetails />} >
            <Route path='account/:accountId' element={<AccountDetails />} />
            <Route path="*" element={<Navigate to="/institutions" />} />
          </Route>
          <Route path="*" element={<Navigate to="/institutions" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

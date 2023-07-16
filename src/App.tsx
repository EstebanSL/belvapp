import React from 'react';
import logo from './logo.svg';
import './App.css';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

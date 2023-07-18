import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export const PublicGuard = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  return user
    ? (<Navigate replace to="/institutions" />)
    : (<Outlet />)
}

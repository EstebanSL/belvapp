import { Outlet, Navigate } from 'react-router-dom'
import { Navbar } from '../components/navbar/Navbar'

export const AuthGuard = (): JSX.Element => {
  const user = true

  return user
    ? (
      <>
        <Navbar />
        <Outlet />
      </>)
    : (<Navigate replace to="/login" />)
}

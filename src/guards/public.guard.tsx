import { Outlet, Navigate } from 'react-router-dom'

export const PublicGuard = (): JSX.Element => {
  const user = true

  return user
    ? (<Navigate replace to="/institutions" />)
    : (<Outlet />)
}

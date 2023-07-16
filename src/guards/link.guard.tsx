import { Outlet, Navigate } from 'react-router-dom'

export const LinkGuard = (): JSX.Element => {
  const link = true

  return link
    ? (
      <>
        <Outlet />
      </>)
    : (<Navigate replace to="/institutions" />)
}

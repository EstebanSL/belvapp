import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { LinkContext } from '../context/linkContext'

export const LinkGuard = (): JSX.Element => {

  const { link } = useContext(LinkContext)

  return link
    ? (
      <>
        <Outlet />
      </>)
    : (<Navigate replace to="/institutions" />)
}

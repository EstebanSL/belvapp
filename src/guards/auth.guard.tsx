import { Outlet, Navigate } from 'react-router-dom'
import { Navbar } from '../components/navbar/Navbar'

import { useContext, useState } from 'react'
import { LinkContext } from '../context/linkContext'
import { AuthContext } from '../context/AuthContext'



export const AuthGuard = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [link, setLink] = useState<string | null>(JSON.parse(localStorage.getItem('link') as string))

  const setNewLink = (link: string): void => {
    setLink(link)
  }

  const removeLink = (): void => {
    setLink(null)
    localStorage.removeItem('link')
  }

  return user
    ? (
      <LinkContext.Provider value={{ link, setNewLink, removeLink }}>
        <Navbar />
        <Outlet />
      </LinkContext.Provider>)
    : (<Navigate replace to="/login" />)
}

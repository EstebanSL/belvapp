import { createContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext<any>(null);

const AuthContextProvider = ({ children }: any) => {

  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || 'null'))
  const { setItem, removeItem } = useLocalStorage()

  const login = (userInfo: any) => {
    setUser(userInfo.user)
    setItem('user', userInfo.user)
    setItem('token', userInfo.token)
  }

  const logout = () => {
    setUser(null)
    removeItem('user')
    removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const persistUser = (userData) => {
  localStorage.setItem('qurbani-user', JSON.stringify(userData))
  window.dispatchEvent(new Event('qurbani-user-updated'))
  return userData
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('qurbani-user')
    if (saved) {
      setUser(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(persistUser(userData))
  }

  const register = (userData) => {
    setUser(persistUser(userData))
  }

  const logout = () => {
    localStorage.removeItem('qurbani-user')
    window.dispatchEvent(new Event('qurbani-user-updated'))
    setUser(null)
  }

  const updateUser = (updates) => {
    const nextUser = persistUser({ ...(user || {}), ...updates })
    setUser(nextUser)
  }

  const value = useMemo(() => ({ user, loading, login, register, logout, updateUser }), [user, loading])

  return createElement(AuthContext.Provider, { value }, children)
}

export const useAuth = () => useContext(AuthContext)

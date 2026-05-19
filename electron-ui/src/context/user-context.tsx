import React, { createContext, useContext } from 'react'

type UserContextType = { userId: number }

const UserContext = createContext<UserContextType>({ userId: 1 })

export function UserProvider({ children }: { children: React.ReactNode }) {
  // userId is hardcoded until login/auth is implemented
  return <UserContext.Provider value={{ userId: 1 }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)

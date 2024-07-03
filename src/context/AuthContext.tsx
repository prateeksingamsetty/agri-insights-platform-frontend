// AuthProvider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

interface AuthContextProps {
  loggedIn: boolean
  username: string | null
  // signIn: () => void
  signIn: (username: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [username, setUsername] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    // Check cookie and update state on client mount
    const token = Cookies.get('accessToken')
    const storedUsername = localStorage.getItem('username')
    setLoggedIn(!!token)
    setUsername(storedUsername)
  }, [])

  const signIn = (username: string) => {
    setLoggedIn(true)
    setUsername(username)
    localStorage.setItem('username', username) // Ensure this is set in localStorage
  }

  const signOut = () => {
    // Remove user data from localStorage
    localStorage.removeItem('username')

    Cookies.remove('accessToken')
    setLoggedIn(false)
    setUsername(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ loggedIn, username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

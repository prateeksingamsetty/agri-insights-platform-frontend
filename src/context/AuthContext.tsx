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
  email: string | null
  // signIn: () => void
  signIn: (username: string, email: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [username, setUsername] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    // Check cookie and update state on client mount
    const token = Cookies.get('accessToken')
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')

    setLoggedIn(!!token)
    setUsername(username)
    setEmail(email)
  }, [])

  const signIn = (username: string, email: string) => {
    setLoggedIn(true)
    setUsername(username)
    setEmail(email)
    localStorage.setItem('username', username)
    localStorage.setItem('email', email)
  }

  const signOut = () => {
    // Remove user data from localStorage
    localStorage.removeItem('username')
    localStorage.removeItem('email')

    Cookies.remove('accessToken')
    setLoggedIn(false)
    setUsername(null)
    setEmail(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{ loggedIn, username, email, signIn, signOut }}
    >
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

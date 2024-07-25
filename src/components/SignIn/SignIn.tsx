'use client'
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link
} from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from 'src/context/AuthContext'
import { signInAction } from './SignInAction'
import Cookies from 'js-cookie'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('') // Reset error message
    setLoading(true)

    const formData = { email, password }

    try {
      const data = await signInAction(formData)
      console.log('data ', data)

      // Store the access token securely in an HttpOnly cookie
      Cookies.set('accessToken', data.accessToken, {
        secure: true,
        sameSite: 'strict',
        expires: 1 / 48
      }) // Expires in 30 mins

      // Store user information in localStorage
      localStorage.setItem('username', data.user.username)
      localStorage.setItem('email', data.user.email)

      const username = localStorage.getItem('username')
      const email = localStorage.getItem('email')
      console.log('username ', username)
      console.log('email ', email)

      setLoading(false)
      // Navigate to the landing page after successful sign-in
      signIn(data.user.username, data.user.email)
      router.push('/')
    } catch (error) {
      console.error('Error while submitting form:', error)
      setLoading(false)
      setError(
        'Failed to sign in. Please check your credentials and try again.'
      )
    }
  }

  return (
    <Container
      maxWidth='sm'
      className='mb-10 mt-10'
      // className='flex min-h-screen flex-col items-center justify-center'
    >
      <div className='w-full rounded-lg bg-white p-8 shadow-xl'>
        <Typography
          variant='h4'
          gutterBottom
          className='mb-6 text-center font-bold text-red-600'
        >
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {error && <Alert severity='error'>{error}</Alert>}
          <TextField
            label='Email'
            type='email'
            variant='outlined'
            fullWidth
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
            className='w-full'
            inputProps={{
              style: { borderRadius: '8px' }
            }}
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            inputProps={{ minLength: 6, style: { borderRadius: '8px' } }}
            className='w-full'
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
            className='rounded-full bg-red-600 py-3 text-white shadow-md transition duration-300 hover:bg-red-700'
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={24}
                style={{
                  color: 'white'
                }}
              />
            ) : (
              'Sign In'
            )}
          </Button>
          <div className='text-right'>
            <Link
              href='/forgotPassword'
              underline='none'
              className='font-medium text-red-600 transition duration-300 hover:text-red-700'
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </Container>
  )
}

export default SignIn

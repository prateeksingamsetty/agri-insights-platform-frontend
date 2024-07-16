'use client'

import {
  Alert,
  Button,
  Container,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUpAction } from './SignUpAction'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const formData = { username, email, password }
    try {
      await signUpAction(formData)

      setSuccess('Sign up successful! Redirecting to sign in page...')

      setTimeout(() => {
        setLoading(false)
        router.push('/signin')
      }, 3000) // Redirect after 3 seconds
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message) // Display specific error message
      } else {
        setError('An unexpected error occurred. Please try again.') // Fallback for unexpected errors
      }
      setLoading(false)
    }
  }

  return (
    <Container
      maxWidth='sm'
      className='mb-10 mt-10'
      // className='flex h-screen items-center justify-center'
    >
      <div className='w-full rounded-lg bg-white p-8 shadow-xl'>
        <Typography
          variant='h4'
          gutterBottom
          className='mb-6 text-center font-bold text-red-600'
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {error && <Alert severity='error'>{error}</Alert>}
          {success && <Alert severity='success'>{success}</Alert>}
          <TextField
            label='Username'
            type='text'
            variant='outlined'
            fullWidth
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
            className='w-full'
            inputProps={{
              style: { borderRadius: '8px' }
            }}
          />
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
              'Sign Up'
            )}
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default SignUp

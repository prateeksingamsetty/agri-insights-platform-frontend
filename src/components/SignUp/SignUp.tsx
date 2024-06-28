'use client'

import { Alert, Button, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUpAction } from './SignUpAction'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const formData = { username, email, password }
    try {
      await signUpAction(formData)
      // Navigate to the landing page after successful signup
      router.push('/landing')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message) // Display specific error message
      } else {
        setError('An unexpected error occurred. Please try again.') // Fallback for unexpected errors
      }
    }
  }

  return (
    <Container
      maxWidth='sm'
      className='flex h-screen items-center justify-center'
    >
      <div className='rounded-lg bg-white p-8 shadow-lg'>
        <Typography variant='h4' gutterBottom className='mb-4 text-center'>
          SignUp
        </Typography>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && <Alert severity='error'>{error}</Alert>}
          <TextField
            label='Username'
            type='text'
            variant='outlined'
            fullWidth
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
            className='w-full'
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
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            inputProps={{ minLength: 6 }}
            className='w-full'
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
            className='py-2 transition duration-300'
          >
            SignUp
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default SignUp

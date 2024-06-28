'use client'
import { Container, TextField, Button, Typography, Alert } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInAction } from './SignInAction'
import Cookies from 'js-cookie'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('') // Reset error message

    const formData = { email, password }

    try {
      const data = await signInAction(formData)

      // Store the access token securely in an HttpOnly cookie
      Cookies.set('accessToken', data.accessToken, {
        secure: true,
        sameSite: 'strict',
        expires: 1
      }) // Expires in 1 day

      // Navigate to the landing page after successful signin
      router.push('./landing')
    } catch (error) {
      console.error('Error while submitting form:', error)
      setError(
        'Failed to sign in. Please check your credentials and try again.'
      )
    }
  }

  return (
    <Container
      maxWidth='sm'
      className='flex h-screen items-center justify-center'
    >
      <div className='rounded-lg bg-white p-8 shadow-lg'>
        <Typography variant='h4' gutterBottom className='mb-4 text-center'>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} className='space-y-4'>
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
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            className='w-full'
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
            className='py-2 transition duration-300'
          >
            SignIn
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default SignIn

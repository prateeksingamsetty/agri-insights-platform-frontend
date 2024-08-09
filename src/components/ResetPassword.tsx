'use client'

import { useState } from 'react'
import '@styles/globals.css'
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setLoading(true)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      // Extract token from query parameters
      const queryParams = new URLSearchParams(window.location.search)
      const token = queryParams.get('token')

      if (!token) {
        setError('Invalid token')
        setLoading(false)
        return
      }
      console.log('Token ', token)

      await axios.post(`${process.env.BACKEND_URL}/auth/reset-password`, {
        token,
        password
      })
      setLoading(false)
      setSuccess('Password reset successfully')
      setRedirecting(true) // Trigger redirect
      setTimeout(() => {
        router.push('/signin')
      }, 3000) // Delay of 3 seconds
    } catch (error) {
      setLoading(false)
      setError('Failed to reset password. Please try again later')
    }
  }

  return (
    <Container maxWidth='sm' className='mb-10 mt-10'>
      <div className='w-full rounded-lg bg-white p-8 shadow-xl'>
        <Typography
          variant='h4'
          gutterBottom
          className='mb-4 text-center font-bold text-red-600'
        >
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && <Alert severity='error'>{error}</Alert>}
          {success && (
            <>
              <Alert severity='success'>{success}</Alert>
              {redirecting && (
                <Typography
                  variant='body2'
                  color='textSecondary'
                  align='center'
                >
                  Redirecting to Sign-in page in 3 seconds...
                </Typography>
              )}
            </>
          )}
          <TextField
            label='New Password'
            type='password'
            variant='outlined'
            fullWidth
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            className='w-full'
            inputProps={{
              style: { borderRadius: '8px' }
            }}
          />
          <TextField
            label='Confirm Password'
            type='password'
            variant='outlined'
            fullWidth
            required
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            className='w-full'
            inputProps={{
              style: { borderRadius: '8px' }
            }}
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
              'Reset Password'
            )}
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ResetPassword

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

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await axios.post('http://localhost:3001/auth/forgot-password', { email })
      setLoading(false)
      setSuccess('Password reset link has been sent to your email')
    } catch (error) {
      setLoading(false)
      setError('Failed to send reset link. Please try again later')
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
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && <Alert severity='error'>{error}</Alert>}
          {success && <Alert severity='success'>{success}</Alert>}
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
              'Send Reset Link'
            )}
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ForgotPassword

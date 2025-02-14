import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button
} from '@mui/material'
import axios from 'axios'
import { useAuth } from 'src/context/AuthContext'

interface UserInputs {
  fatPercentage: number
  proteinPercentage: number
}

interface InputDialogProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (inputs: UserInputs) => void
}

const InputDialog: React.FC<InputDialogProps> = ({
  open,
  handleClose,
  handleSubmit
}) => {
  const { email, loggedIn } = useAuth()

  const defaultInputs: UserInputs = {
    fatPercentage: 3.5,
    proteinPercentage: 3.2
  }

  const [userInputs, setUserInputs] = useState<UserInputs>(defaultInputs)

  useEffect(() => {
    if (!open) return

    if (loggedIn) {
      fetchUserInputRecord()
    } else {
      loadFromSessionStorage()
    }
  }, [email, open, loggedIn])

  const fetchUserInputRecord = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ghg-emissions/inputDetails/${email}`
      )
      if (response && response.data) {
        setUserInputs({
          fatPercentage: response.data.fatPercentage || 0,
          proteinPercentage: response.data.proteinPercentage || 0
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn('No user input record found for the given email')
      } else {
        console.error('Error fetching user input record:', error)
      }
      setUserInputs(defaultInputs)
    }
  }

  const loadFromSessionStorage = () => {
    const storedInputs = localStorage.getItem('fatProteinInputs')
    if (storedInputs) {
      setUserInputs(JSON.parse(storedInputs))
    } else {
      setUserInputs(defaultInputs)
    }
  }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setUserInputs(prev => {
  //     const newInputs = {
  //       ...prev,
  //       [name]: value
  //     }
  //     if (!loggedIn) {
  //       localStorage.setItem('fatProteinInputs', JSON.stringify(newInputs))
  //     }
  //     return newInputs
  //   })
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInputs(prev => {
      // Make sure to convert the string to a number
      const newValue = parseFloat(value)
      const newInputs = {
        ...prev,
        [name]: newValue
      }
  
      // If logged out, also store numeric values in localStorage
      if (!loggedIn) {
        localStorage.setItem('fatProteinInputs', JSON.stringify(newInputs))
      }
  
      return newInputs
    })
  }  

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(userInputs)
    handleClose()
  }

  const textFields = [
    { name: 'fatPercentage', label: 'Fat (%)' },
    { name: 'proteinPercentage', label: 'Protein (%)' }
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle
        id='form-dialog-title'
        sx={{ bgcolor: '#c8102e', color: 'white' }}
      >
        Enter Fat and Protein Details
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Please enter your Fat and Protein percentage values.
        </DialogContentText>
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {textFields.map(field => (
            <TextField
              key={field.name}
              margin='dense'
              name={field.name}
              label={field.label}
              type='number'
              fullWidth
              required
              value={userInputs[field.name as keyof UserInputs]}
              onChange={handleChange}
            />
          ))}
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#c8102e' }}>
              Cancel
            </Button>
            <Button type='submit' sx={{ color: '#c8102e' }}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InputDialog
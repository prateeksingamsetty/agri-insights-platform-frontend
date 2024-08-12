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

interface InputDialogProps {
  previoudDetailsFound: boolean
  open: boolean
  handleClose: () => void
  handleSubmit: (inputs: any) => void
}

interface UserInputs {
  milkPrice: number
  cullCowsPrice: number
  heifersPrice: number
  bullCalvesPrice: number
  beefCrossPrice: number
  otherIncome1: number
  otherIncome2: number
}

const InputDialog: React.FC<InputDialogProps> = ({
  previoudDetailsFound,
  open,
  handleClose,
  handleSubmit
}) => {
  const { email, loggedIn } = useAuth()

  const defaultInputs: UserInputs = {
    milkPrice: 0,
    cullCowsPrice: 0,
    heifersPrice: 0,
    bullCalvesPrice: 0,
    beefCrossPrice: 0,
    otherIncome1: 0,
    otherIncome2: 0
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/receipts/inputDetails/${email}`
      )
      if (response && response.data) {
        setUserInputs({
          milkPrice: response.data.milkPrice || 0,
          cullCowsPrice: response.data.cullCowsPrice || 0,
          heifersPrice: response.data.heifersPrice || 0,
          bullCalvesPrice: response.data.bullCalvesPrice || 0,
          beefCrossPrice: response.data.beefCrossPrice || 0,
          otherIncome1: response.data.otherIncome1 || 0,
          otherIncome2: response.data.otherIncome2 || 0
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn('No user input record found for the given email')
      } else {
        console.error('Error fetching user input record:', error)
      }
    }
  }

  const loadFromSessionStorage = () => {
    const storedInputs = localStorage.getItem('ReciptsInputs')
    if (storedInputs) {
      setUserInputs(JSON.parse(storedInputs))
    } else {
      setUserInputs(defaultInputs)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInputs(prev => {
      const newInputs = {
        ...prev,
        [name]: value
      }
      if (!loggedIn) {
        localStorage.setItem('ReciptsInputs', JSON.stringify(newInputs))
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
    { name: 'milkPrice', label: 'Milk Price($/CWT)' },
    { name: 'cullCowsPrice', label: 'Cull Cows Price($/Head)' },
    { name: 'heifersPrice', label: 'Heifers Price($/Head)' },
    { name: 'bullCalvesPrice', label: 'Bull Calves Price($/Head)' },
    { name: 'beefCrossPrice', label: 'Beef Cross Price($/Head)' },
    {
      name: 'otherIncome1',
      label: 'Other Income 1 (gov, payments, insurance, etc) ($)'
    },
    {
      name: 'otherIncome2',
      label: 'Other Income 2 (misc, crop, livestock, etc) ($)'
    }
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
        Enter Your Inputs
      </DialogTitle>
      <DialogContent>
        {previoudDetailsFound ? (
          <>
            <DialogContentText sx={{ mb: 2 }}>
              Please enter your financial inputs for the Dairy Enterprise Budget
              Model.
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
          </>
        ) : (
          <DialogContentText sx={{ mb: 2, color: 'red' }}>
            Please fill in the previous details to proceed.
          </DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default InputDialog

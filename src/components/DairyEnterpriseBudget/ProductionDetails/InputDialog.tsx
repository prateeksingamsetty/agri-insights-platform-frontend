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
  expectedMilkProduction: number
  calvingInterval: number
  totalNumberOfCows: number
  cullingRate: number
  cowDeathLossRate: number
  heiferRaisingDeathLossRate: number
  numberOfHeifersRaised: number
  bullCalfDeath: number
  expectedPercentMaleWithSexedSemen: number
  expectedPercentMaleWithConventional: number
  beefCrossPercent: number
  beefCrossDeathRate: number
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
    expectedMilkProduction: 0,
    calvingInterval: 0,
    totalNumberOfCows: 0,
    cullingRate: 0,
    cowDeathLossRate: 0,
    heiferRaisingDeathLossRate: 0,
    numberOfHeifersRaised: 0,
    bullCalfDeath: 0,
    expectedPercentMaleWithSexedSemen: 0,
    expectedPercentMaleWithConventional: 0,
    beefCrossPercent: 0,
    beefCrossDeathRate: 0
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/production-details/inputDetails/${email}`
      )
      if (response && response.data) {
        setUserInputs({
          expectedMilkProduction:
            response.data.milkProduction.expectedMilkProduction || 0,
          calvingInterval: response.data.milkProduction.calvingInterval || 0,
          totalNumberOfCows:
            response.data.milkProduction.totalNumberOfCows || 0,
          cullingRate: response.data.heiferProduction.cullingRate || 0,
          cowDeathLossRate:
            response.data.heiferProduction.cowDeathLossRate || 0,
          heiferRaisingDeathLossRate:
            response.data.heiferProduction.heiferRaisingDeathLossRate || 0,
          numberOfHeifersRaised:
            response.data.heiferProduction.numberOfHeifersRaised || 0,
          bullCalfDeath: response.data.heiferProduction.bullCalfDeath || 0,
          expectedPercentMaleWithSexedSemen:
            response.data.heiferProduction.expectedPercentMaleWithSexedSemen ||
            0,
          expectedPercentMaleWithConventional:
            response.data.heiferProduction
              .expectedPercentMaleWithConventional || 0,
          beefCrossPercent:
            response.data.beefCrossDetails.beefCrossPercent || 0,
          beefCrossDeathRate:
            response.data.beefCrossDetails.beefCrossDeathRate || 0
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
    const storedInputs = localStorage.getItem('productionInputs')
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
        localStorage.setItem('productionInputs', JSON.stringify(newInputs))
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
    { name: 'totalNumberOfCows', label: 'Total Number of Cows' },
    { name: 'calvingInterval', label: 'Calving Interval(Months)' },
    {
      name: 'expectedMilkProduction',
      label: 'Expected Milk Production(LBS/Head)'
    },
    { name: 'cullingRate', label: 'Culling Rate(%)' },
    { name: 'cowDeathLossRate', label: 'Cow Death Loss Rate(%)' },
    {
      name: 'heiferRaisingDeathLossRate',
      label: 'Heifer Raising Death Loss Rate(up to 24 months - %)'
    },
    { name: 'numberOfHeifersRaised', label: 'Number Of Heifers Raised(#)' },
    { name: 'bullCalfDeath', label: 'Bull Calf Death(%)' },
    {
      name: 'expectedPercentMaleWithSexedSemen',
      label: 'Expected Percent Male With Sexed Semen(%)'
    },
    {
      name: 'expectedPercentMaleWithConventional',
      label: 'Expected Percent Male With Conventional(%)'
    },
    { name: 'beefCrossPercent', label: 'Beef Cross Percent(%)' },
    { name: 'beefCrossDeathRate', label: 'Beef Cross Death Rate(%)' }
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
        <DialogContentText sx={{ mb: 2 }}>
          Please enter your inputs for the Dairy Enterprise Budget Model.
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

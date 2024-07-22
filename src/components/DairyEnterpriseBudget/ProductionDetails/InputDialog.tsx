import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button
} from '@mui/material'

interface InputDialogProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (inputs: any) => void
}

const InputDialog: React.FC<InputDialogProps> = ({
  open,
  handleClose,
  handleSubmit
}) => {
  const [userInputs, setUserInputs] = useState({
    expectedMilkProduction: '',
    calvingInterval: '',
    cullingRate: '',
    totalNumberOfCows: '',
    cowDeathLossRate: '',
    heiferRaisingDeathLossRate: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInputs({
      ...userInputs,
      [name]: value
    })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(userInputs)
    handleClose()
  }

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
          <TextField
            margin='dense'
            name='totalNumberOfCows'
            label='Total Number of Cows'
            type='number'
            fullWidth
            required
            value={userInputs.totalNumberOfCows}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='calvingInterval'
            label='Calving Interval'
            type='number'
            fullWidth
            required
            value={userInputs.calvingInterval}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            name='expectedMilkProduction'
            label='Expected Milk Production'
            type='number'
            fullWidth
            required
            value={userInputs.expectedMilkProduction}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='cullingRate'
            label='Culling Rate'
            type='number'
            fullWidth
            required
            value={userInputs.cullingRate}
            onChange={handleChange}
          />

          <TextField
            margin='dense'
            name='cowDeathLossRate'
            label='Cow Death Loss Rate'
            type='number'
            fullWidth
            required
            value={userInputs.cowDeathLossRate}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='heiferRaisingDeathLossRate'
            label='Heifer Raising Death Loss Rate'
            type='number'
            fullWidth
            required
            value={userInputs.heiferRaisingDeathLossRate}
            onChange={handleChange}
          />
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

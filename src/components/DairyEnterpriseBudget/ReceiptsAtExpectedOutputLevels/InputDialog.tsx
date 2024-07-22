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
    milk: '',
    cullCows: '',
    heifers: '',
    bullCalves: '',
    beefCross: '',
    otherIncome1: '',
    otherIncome2: '',
    totalReceipts: ''
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
          Please enter your financial inputs for the Dairy Enterprise Budget
          Model.
        </DialogContentText>
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <TextField
            margin='dense'
            name='milk'
            label='Milk ($)'
            type='number'
            fullWidth
            required
            value={userInputs.milk}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='cullCows'
            label='Cull Cows ($)'
            type='number'
            fullWidth
            required
            value={userInputs.cullCows}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='heifers'
            label='Heifers ($)'
            type='number'
            fullWidth
            required
            value={userInputs.heifers}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='bullCalves'
            label='Bull Calves ($)'
            type='number'
            fullWidth
            required
            value={userInputs.bullCalves}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='beefCross'
            label='Beef Cross ($)'
            type='number'
            fullWidth
            required
            value={userInputs.beefCross}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='otherIncome1'
            label='Other Income 1 (gov, payments, insurance, etc) ($)'
            type='number'
            fullWidth
            required
            value={userInputs.otherIncome1}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='otherIncome2'
            label='Other Income 2 (misc, crop, livestock, etc) ($)'
            type='number'
            fullWidth
            required
            value={userInputs.otherIncome2}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='totalReceipts'
            label='Total Receipts ($)'
            type='number'
            fullWidth
            required
            value={userInputs.totalReceipts}
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

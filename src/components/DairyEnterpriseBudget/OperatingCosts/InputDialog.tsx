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

interface UserInputs {
  haulingFees: number
  organizationalFees: number
  dhiaFees: number
  vetExpenses: number
  insurance: number
  utilities: number
  inseminationSexedFees: number
  inseminationConventionalFees: number
  inseminationConventionalBeefFees: number
  wasteManagement: number
  bedding: number
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
  const [userInputs, setUserInputs] = useState<UserInputs>({
    haulingFees: 0,
    organizationalFees: 0,
    dhiaFees: 0,
    vetExpenses: 0,
    insurance: 0,
    utilities: 0,
    inseminationSexedFees: 0,
    inseminationConventionalFees: 0,
    inseminationConventionalBeefFees: 0,
    wasteManagement: 0,
    bedding: 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(userInputs)
    handleClose()
  }

  const textFields = [
    { name: 'haulingFees', label: 'Hauling Fees' },
    { name: 'organizationalFees', label: 'Organizational Fees' },
    { name: 'dhiaFees', label: 'DHIA Fees' },
    { name: 'vetExpenses', label: 'Vet Expenses' },
    { name: 'insurance', label: 'Insurance' },
    { name: 'utilities', label: 'Utilities' },
    { name: 'inseminationSexedFees', label: 'Insemination Sexed Fees' },
    {
      name: 'inseminationConventionalFees',
      label: 'Insemination Conventional Fees'
    },
    {
      name: 'inseminationConventionalBeefFees',
      label: 'Insemination Conventional Beef Fees'
    },
    { name: 'wasteManagement', label: 'Waste Management' },
    { name: 'bedding', label: 'Bedding' }
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

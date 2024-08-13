import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Checkbox,
  FormControlLabel,
  Collapse
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

import axios from 'axios'
import { useAuth } from 'src/context/AuthContext'
import InputLabourDialog from '../LabourCosts/InputLabourDialog'

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
  raisedForageCost: number
  purchasedFeedCost: number
  additionalManagementCostsPercentage: number
  estimatedLabourCost: number
}

interface InputDialogProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (inputs: UserInputs, useDetailedLaborCost: boolean) => void
  previoudDetailsFound: boolean
}

const InputDialog: React.FC<InputDialogProps> = ({
  open,
  handleClose,
  handleSubmit,
  previoudDetailsFound
}) => {
  const { email, loggedIn } = useAuth()

  const defaultInputs: UserInputs = {
    haulingFees: 1,
    organizationalFees: 0.1,
    dhiaFees: 16.25,
    vetExpenses: 30,
    insurance: 15000,
    utilities: 65,
    inseminationSexedFees: 40,
    inseminationConventionalFees: 15,
    inseminationConventionalBeefFees: 5,
    wasteManagement: 15,
    bedding: 50,
    raisedForageCost: 0,
    purchasedFeedCost: 0,
    additionalManagementCostsPercentage: 0,
    estimatedLabourCost: 0
  }

  const [userInputs, setUserInputs] = useState<UserInputs>(defaultInputs)
  const [calculateLaborCost, setCalculateLaborCost] = useState(false)
  const [openLaborDialog, setOpenLaborDialog] = useState(false)
  const [isLaborInputValid, setIsLaborInputValid] = useState(false)

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/operating-costs/OperatingCostinputDetails/${email}`
      )
      if (response && response.data) {
        setUserInputs(response.data)
        validateLaborInput(response.data)
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
    const storedInputs = localStorage.getItem('OperatingCostInputs')
    if (storedInputs) {
      const parsedInputs = JSON.parse(storedInputs)
      setUserInputs(parsedInputs)
      validateLaborInput(parsedInputs)
    } else {
      setUserInputs(defaultInputs)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInputs(prev => {
      const newInputs = {
        ...prev,
        [name]: parseFloat(value)
      }
      if (!loggedIn) {
        localStorage.setItem('OperatingCostInputs', JSON.stringify(newInputs))
      }
      validateLaborInput(newInputs)
      return newInputs
    })
  }

  const handleLaborCostCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCalculateLaborCost(event.target.checked)
    if (event.target.checked) {
      setOpenLaborDialog(true)
      setUserInputs(prev => ({ ...prev, estimatedLabourCost: 0 }))
    }
    validateLaborInput({ ...userInputs, estimatedLabourCost: 0 })
  }

  const handleLaborDialogClose = () => {
    setOpenLaborDialog(false)
    validateLaborInput(userInputs)
  }

  const handleLaborInputsSubmit = () => {
    setOpenLaborDialog(false)
    setIsLaborInputValid(true)
    validateLaborInput(userInputs)
  }

  const validateLaborInput = (inputs: UserInputs) => {
    if (calculateLaborCost) {
      setIsLaborInputValid(true)
    } else if (!calculateLaborCost && inputs.estimatedLabourCost > 0) {
      setIsLaborInputValid(true)
    } else {
      setIsLaborInputValid(false)
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isLaborInputValid) {
      alert(
        'Please either provide an estimated labor cost or complete the labor cost form.'
      )
      return
    }
    handleSubmit(userInputs, calculateLaborCost)
    handleClose()
  }

  const inputFields = [
    { name: 'haulingFees', label: 'Hauling Fees', unit: '$/CWT' },
    { name: 'organizationalFees', label: 'Organizational Fees', unit: '$/CWT' },
    { name: 'dhiaFees', label: 'DHIA Fees', unit: '$/Head' },
    { name: 'vetExpenses', label: 'Vet Expenses', unit: '$/Head' },
    {
      name: 'insurance',
      label: 'Insurance (Liability, Dairy Margin, etc.)',
      unit: '$/Farm'
    },
    { name: 'utilities', label: 'Utilities', unit: '$/Head' },
    {
      name: 'inseminationSexedFees',
      label: 'Insemination Fees (Sexed Semen)',
      unit: '$/Straw'
    },
    {
      name: 'inseminationConventionalFees',
      label: 'Insemination Fees (Conventional Semen)',
      unit: '$/Straw'
    },
    {
      name: 'inseminationConventionalBeefFees',
      label: 'Insemination Fees (Beef Conventional Semen)',
      unit: '$/Straw'
    },
    { name: 'wasteManagement', label: 'Waste Management', unit: '$/Head' },
    { name: 'bedding', label: 'Bedding', unit: '$/Head' },
    { name: 'raisedForageCost', label: 'Raised Forage Cost', unit: '$/Head' },
    { name: 'purchasedFeedCost', label: 'Purchased Feed Cost', unit: '$/Head' },
    {
      name: 'additionalManagementCostsPercentage',
      label: 'Additional Management Costs',
      unit: '% of Production Value'
    }
  ]

  // Function to open the labor input dialog
  const openLaborDialogHandler = () => {
    setOpenLaborDialog(true)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      maxWidth='md'
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
              Please enter your expense inputs for the Dairy Enterprise Budget
              Model.
            </DialogContentText>
            <form
              onSubmit={onSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <Typography variant='h6' sx={{ mt: 2, mb: 1 }}>
                Expense Inputs
              </Typography>
              <Grid container spacing={2}>
                {inputFields.map(field => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <TextField
                          margin='dense'
                          name={field.name}
                          label={`${field.label} (${field.unit})`}
                          type='number'
                          fullWidth
                          required
                          value={userInputs[field.name as keyof UserInputs]}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          margin='dense'
                          label='Default'
                          type='number'
                          fullWidth
                          value={defaultInputs[field.name as keyof UserInputs]}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={calculateLaborCost}
                        onChange={handleLaborCostCheckbox}
                        name='calculateLaborCost'
                      />
                    }
                    label='Calculate Detailed Labor Cost'
                  />
                  <Button
                    onClick={openLaborDialogHandler}
                    variant='contained'
                    sx={{ ml: 2 }}
                  >
                    Open Labor Input Dialog
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Collapse in={!calculateLaborCost}>
                    <Grid container alignItems='center'>
                      <Grid item xs={11}>
                        <TextField
                          margin='dense'
                          name='estimatedLabourCost'
                          label='Estimated Labour Cost ($/Head)'
                          type='number'
                          fullWidth
                          required={!calculateLaborCost}
                          value={userInputs.estimatedLabourCost}
                          onChange={handleChange}
                          disabled={calculateLaborCost}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Tooltip
                          title='Please provide an Estimated Labour cost Input or calculate detailed Labour cost'
                          arrow
                        >
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} sx={{ color: '#c8102e' }}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  sx={{ color: '#c8102e' }}
                  disabled={!isLaborInputValid}
                >
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
      <InputLabourDialog
        open={openLaborDialog}
        handleClose={handleLaborDialogClose}
        handleSubmit={handleLaborInputsSubmit}
        initialInputs={null} // Adjust this as needed based on your requirements
      />
    </Dialog>
  )
}

export default InputDialog

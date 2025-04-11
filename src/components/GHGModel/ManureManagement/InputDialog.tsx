import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  MenuItem
} from '@mui/material'
import axios from 'axios'
import { useAuth } from 'src/context/AuthContext'

interface ManureManagementInputs {
  percentLactatingManureRecoverable: number
  percentDryManureRecoverable: number
  percentBredManureRecoverable: number
  percentYoungManureRecoverable: number
  manureManagementSystem1: string
  percentOfManureMMS1: number
  manureManagementSystem2: string
  percentOfManureMMS2: number
  manureManagementSystem3: string
  percentOfManureMMS3: number
  manureManagementSystem4: string
  percentOfManureMMS4: number
}

interface InputDialogProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (inputs: ManureManagementInputs) => void
}

// Define options for the manure management system dropdowns
const mmsOptions = [
  { label: "DailySpread", value: "DailySpread" },
  { label: "SolidStorage", value: "SolidStorage" },
  { label: "DryLot", value: "DryLot" },
  { label: "LiquidSlurryNaturalCrust", value: "LiquidSlurryNaturalCrust" },
  { label: "LiquidSlurryNoCrust", value: "LiquidSlurryNoCrust" },
  { label: "UncoveredAnaerobicLagoon", value: "UncoveredAnaerobicLagoon" },
  { label: "CoveredAnaerobicLagoon", value: "CoveredAnaerobicLagoon" },
  { label: "AnaerobicDigestion", value: "AnaerobicDigestion" },
  { label: "PitStorageBelowAnimal1m", value: "PitStorageBelowAnimal1m" },
  { label: "PitStorageBelowAnimalGreater1m", value: "PitStorageBelowAnimalGreater1m" },
  { label: "DeepBeddingLess1Month", value: "DeepBeddingLess1Month" },
  { label: "DeepBeddingMore1Month", value: "DeepBeddingMore1Month" },
  { label: "CompostingVesselStatic", value: "CompostingVesselStatic" },
  { label: "CompostingIntensiveWindrow", value: "CompostingIntensiveWindrow" },
  { label: "CompostingNaturalAeration", value: "CompostingNaturalAeration" },
  { label: "AerobicTreatmentForcedAeration", value: "AerobicTreatmentForcedAeration" },
  { label: "AerobicTreatmentNaturalAeration", value: "AerobicTreatmentNaturalAeration" },
  { label: "NA", value: "NA" }
]

// Set of field names to render as dropdowns.
const dropdownFields = new Set([
  "manureManagementSystem1",
  "manureManagementSystem2",
  "manureManagementSystem3",
  "manureManagementSystem4"
])

const InputDialog: React.FC<InputDialogProps> = ({
  open,
  handleClose,
  handleSubmit
}) => {
  const { email, loggedIn } = useAuth()

  const defaultInputs: ManureManagementInputs = {
    percentLactatingManureRecoverable: 0,
    percentDryManureRecoverable: 0,
    percentBredManureRecoverable: 0,
    percentYoungManureRecoverable: 0,
    manureManagementSystem1: '',
    percentOfManureMMS1: 0,
    manureManagementSystem2: '',
    percentOfManureMMS2: 0,
    manureManagementSystem3: '',
    percentOfManureMMS3: 0,
    manureManagementSystem4: '',
    percentOfManureMMS4: 0
  }

  const [inputs, setInputs] = useState<ManureManagementInputs>(defaultInputs)

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/manure-management/inputDetails/${email}`
      )
      if (response && response.data) {
        setInputs({
          percentLactatingManureRecoverable: response.data.percentLactatingManureRecoverable,
          percentDryManureRecoverable: response.data.percentDryManureRecoverable,
          percentBredManureRecoverable: response.data.percentBredManureRecoverable,
          percentYoungManureRecoverable: response.data.percentYoungManureRecoverable,
          manureManagementSystem1: response.data.manureManagementSystem1,
          percentOfManureMMS1: response.data.percentOfManureMMS1,
          manureManagementSystem2: response.data.manureManagementSystem2,
          percentOfManureMMS2: response.data.percentOfManureMMS2,
          manureManagementSystem3: response.data.manureManagementSystem3,
          percentOfManureMMS3: response.data.percentOfManureMMS3,
          manureManagementSystem4: response.data.manureManagementSystem4,
          percentOfManureMMS4: response.data.percentOfManureMMS4
        })
      }
    } catch (error) {
      console.error('Error fetching manure management input record:', error)
      setInputs(defaultInputs)
    }
  }

  const loadFromSessionStorage = () => {
    const storedInputs = localStorage.getItem('manureManagementInputs')
    if (storedInputs) {
      setInputs(JSON.parse(storedInputs))
    } else {
      setInputs(defaultInputs)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setInputs(prev => {
      const updated = {
        ...prev,
        [name]:
          // For dropdowns, type stays as text (string); for numeric fields, convert to number.
          dropdownFields.has(name) ? value : type === 'number' ? Number(value) : value
      }
      if (!loggedIn) {
        localStorage.setItem('manureManagementInputs', JSON.stringify(updated))
      }
      return updated
    })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(inputs)
    handleClose()
  }

  // Define text fields; the ones in dropdownFields will be rendered as selects.
  const textFields = [
    { name: 'percentLactatingManureRecoverable', label: 'Percent Lactating Manure Recoverable' },
    { name: 'percentDryManureRecoverable', label: 'Percent Dry Manure Recoverable' },
    { name: 'percentBredManureRecoverable', label: 'Percent Bred Manure Recoverable' },
    { name: 'percentYoungManureRecoverable', label: 'Percent Young Manure Recoverable' },
    { name: 'manureManagementSystem1', label: 'Manure Management System 1' },
    { name: 'percentOfManureMMS1', label: 'Percent Of Manure for MMS1' },
    { name: 'manureManagementSystem2', label: 'Manure Management System 2' },
    { name: 'percentOfManureMMS2', label: 'Percent Of Manure for MMS2' },
    { name: 'manureManagementSystem3', label: 'Manure Management System 3' },
    { name: 'percentOfManureMMS3', label: 'Percent Of Manure for MMS3' },
    { name: 'manureManagementSystem4', label: 'Manure Management System 4' },
    { name: 'percentOfManureMMS4', label: 'Percent Of Manure for MMS4' }
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="manure-management-input-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        id="manure-management-input-dialog-title"
        sx={{ bgcolor: '#c8102e', color: 'white' }}
      >
        Enter Your Manure Management Inputs
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Please enter the inputs for the Manure Management Model.
        </DialogContentText>
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {textFields.map(field =>
            dropdownFields.has(field.name) ? (
              <TextField
                key={field.name}
                select
                margin="dense"
                name={field.name}
                label={field.label}
                fullWidth
                required
                value={inputs[field.name as keyof ManureManagementInputs]}
                onChange={handleChange}
              >
                {mmsOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                key={field.name}
                margin="dense"
                name={field.name}
                label={field.label}
                type="number"
                fullWidth
                required
                value={inputs[field.name as keyof ManureManagementInputs]}
                onChange={handleChange}
              />
            )
          )}
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#c8102e' }}>
              Cancel
            </Button>
            <Button type="submit" sx={{ color: '#c8102e' }}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InputDialog
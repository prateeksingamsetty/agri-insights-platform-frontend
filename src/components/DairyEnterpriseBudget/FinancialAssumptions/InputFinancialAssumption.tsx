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
  Grid
} from '@mui/material'
import axios from 'axios'
import { useAuth } from 'src/context/AuthContext'

interface FinancialAssumptionInputs {
  shortTermInterestRate: number
  longTermInterestRate: number
  propertyTaxRate: number
  livestockInsuranceRate: number
  propertyInsuranceRate: number
  machineryEquipmentInsuranceRate: number
  buildingStructuresInsuranceCoverage: number
}

interface FinancialAssumptionInputDialogProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (inputs: FinancialAssumptionInputs) => void;
    initialInputs: FinancialAssumptionInputs | null;
  }

const InputFinancialAssumption: React.FC<FinancialAssumptionInputDialogProps> = ({
  open,
  handleClose,
  handleSubmit,
  initialInputs
}) => {
  const { email, loggedIn } = useAuth()

  const defaultInputs: FinancialAssumptionInputs = {
    shortTermInterestRate: 5.5,
    longTermInterestRate: 4.5,
    propertyTaxRate: 0.7,
    livestockInsuranceRate: 0.35,
    propertyInsuranceRate: 0.25,
    machineryEquipmentInsuranceRate: 0.29,
    buildingStructuresInsuranceCoverage: 2000000
  }

  const [financialAssumptionInputs, setFinancialAssumptionInputs] = useState<FinancialAssumptionInputs>(defaultInputs)

  useEffect(() => {
    if (!open) return

    if (initialInputs) {
      setFinancialAssumptionInputs(initialInputs)
    } else if (loggedIn) {
      fetchFinancialAssumptionInputRecord()
    } else {
      loadFromSessionStorage()
    }
  }, [email, open, loggedIn, initialInputs])

  const fetchFinancialAssumptionInputRecord = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/financial-assumption/inputDetails/${email}`
      )
      if (response && response.data) {
        setFinancialAssumptionInputs(response.data)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn('No financial assumption input record found for the given email')
      } else {
        console.error('Error fetching financial assumption input record:', error)
      }
      setFinancialAssumptionInputs(defaultInputs)
    }
  }

  const loadFromSessionStorage = () => {
    const storedInputs = localStorage.getItem('financialAssumptionInputs')
    if (storedInputs) {
      setFinancialAssumptionInputs(JSON.parse(storedInputs))
    } else {
      setFinancialAssumptionInputs(defaultInputs)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFinancialAssumptionInputs(prev => {
      const newInputs = {
        ...prev,
        [name]: parseFloat(value)
      }
      if (!loggedIn) {
        localStorage.setItem('financialAssumptionInputs', JSON.stringify(newInputs))
      }
      return newInputs
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loggedIn && email) {
      try {
        await axios.patch(
          `http://localhost:3001/financial-assumption/updateInput/${email}`,
          financialAssumptionInputs
        )
      } catch (error) {
        console.error('Error saving financial assumption inputs:', error)
      }
    } else {
      localStorage.setItem('financialAssumptionInputs', JSON.stringify(financialAssumptionInputs))
    }
    handleSubmit(financialAssumptionInputs)
  }

  const inputFields = [
    { name: 'shortTermInterestRate', label: 'Short Term Interest Rate', unit: '%', min: 0, max: 100 },
    { name: 'longTermInterestRate', label: 'Long Term Interest Rate', unit: '%', min: 0, max: 100 },
    { name: 'propertyTaxRate', label: 'Property Tax Rate', unit: '%', min: 0, max: 100 },
    { name: 'livestockInsuranceRate', label: 'Livestock Insurance Rate', unit: '%', min: 0, max: 100 },
    { name: 'propertyInsuranceRate', label: 'Property Insurance Rate', unit: '%', min: 0, max: 100 },
    { name: 'machineryEquipmentInsuranceRate', label: 'Machinery and Equipment Insurance Rate', unit: '%', min: 0, max: 100 },
    { name: 'buildingStructuresInsuranceCoverage', label: 'Building and Structures Insurance Coverage', unit: '$', min: 0 },
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        id="form-dialog-title"
        sx={{ bgcolor: '#c8102e', color: 'white' }}
      >
        Enter Financial Assumption Inputs
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Please enter your financial assumption inputs for the Dairy Enterprise Budget Model.
        </DialogContentText>
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <Grid container spacing={2}>
            {inputFields.map(field => (
              <Grid item xs={12} sm={6} key={field.name}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <TextField
                      margin="dense"
                      name={field.name}
                      label={`${field.label} (${field.unit})`}
                      type="number"
                      fullWidth
                      required
                      value={financialAssumptionInputs[field.name as keyof FinancialAssumptionInputs]}
                      onChange={handleChange}
                      inputProps={{
                        min: field.min,
                        max: field.max,
                        step: "0.01"
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin="dense"
                      label="Default"
                      type="number"
                      fullWidth
                      value={defaultInputs[field.name as keyof FinancialAssumptionInputs]}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
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

export default InputFinancialAssumption
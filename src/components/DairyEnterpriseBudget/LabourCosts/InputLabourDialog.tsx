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

interface LaborCostInputs {
  numberOfOwners: number
  ownerSalary: number
  ownerBenefits: number
  numberOfManagers: number
  managerSalary: number
  managerBenefits: number
  numberOfHerdHealthEmployees: number
  herdHealthEmployeeTime: number
  herdHealthEmployeeWage: number
  herdHealthEmployeeBenefits: number
  numberOfFeederEmployees: number
  feederEmployeeTime: number
  feederEmployeeWage: number
  feederEmployeeBenefits: number
  numberOfCropEmployees: number
  cropEmployeeTime: number
  cropEmployeeWage: number
  cropEmployeeBenefits: number
  numberOfMilkerEmployees: number
  milkerEmployeeTime: number
  milkerEmployeeWage: number
  milkerEmployeeBenefits: number
  replacementEmployees: number
  replacementEmployeeTime: number
  replacementEmployeeWage: number
  replacementEmployeeBenefits: number
  facilitiesEmployees: number
  facilitiesEmployeeTime: number
  facilitiesEmployeeWage: number
  facilitiesEmployeeBenefits: number
  otherEmployees: number
  otherEmployeeTime: number
  otherEmployeeWage: number
  otherEmployeeBenefits: number
}

interface LaborCostInputDialogProps {
  open: boolean
  handleClose: () => void
  handleSubmit: () => void
  initialInputs: LaborCostInputs | null
}

const InputLabourDialog: React.FC<LaborCostInputDialogProps> = ({
  open,
  handleClose,
  handleSubmit,
  initialInputs
}) => {
  const { email, loggedIn } = useAuth()

  const defaultInputs: LaborCostInputs = {
    numberOfOwners: 1,
    ownerSalary: 100000,
    ownerBenefits: 0,
    numberOfManagers: 1,
    managerSalary: 50000,
    managerBenefits: 16500,
    numberOfHerdHealthEmployees: 2,
    herdHealthEmployeeTime: 3120,
    herdHealthEmployeeWage: 13,
    herdHealthEmployeeBenefits: 1.25,
    numberOfFeederEmployees: 2,
    feederEmployeeTime: 3120,
    feederEmployeeWage: 12.75,
    feederEmployeeBenefits: 1.25,
    numberOfCropEmployees: 3,
    cropEmployeeTime: 3120,
    cropEmployeeWage: 11,
    cropEmployeeBenefits: 1.25,
    numberOfMilkerEmployees: 3,
    milkerEmployeeTime: 3120,
    milkerEmployeeWage: 11,
    milkerEmployeeBenefits: 1.25,
    replacementEmployees: 2,
    replacementEmployeeTime: 3120,
    replacementEmployeeWage: 10.75,
    replacementEmployeeBenefits: 1.25,
    facilitiesEmployees: 2,
    facilitiesEmployeeTime: 3120,
    facilitiesEmployeeWage: 14,
    facilitiesEmployeeBenefits: 1.25,
    otherEmployees: 0,
    otherEmployeeTime: 0,
    otherEmployeeWage: 0,
    otherEmployeeBenefits: 0
  }

  const [laborCostInputs, setLaborCostInputs] = useState<LaborCostInputs>(defaultInputs)

  useEffect(() => {
    if (!open) return

    if (initialInputs) {
      setLaborCostInputs(initialInputs)
    } else if (loggedIn) {
      fetchLaborCostInputRecord()
    } else {
      loadFromSessionStorage()
    }
  }, [email, open, loggedIn, initialInputs])

  const fetchLaborCostInputRecord = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/labour-cost/inputDetails/${email}`
      )
      if (response && response.data) {
        setLaborCostInputs(response.data)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn('No labor cost input record found for the given email')
      } else {
        console.error('Error fetching labor cost input record:', error)
      }
      setLaborCostInputs(defaultInputs)
    }
  }

  const loadFromSessionStorage = () => {
    const storedInputs = localStorage.getItem('laborCostInputs')
    if (storedInputs) {
      setLaborCostInputs(JSON.parse(storedInputs))
    } else {
      setLaborCostInputs(defaultInputs)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLaborCostInputs(prev => {
      const newInputs = {
        ...prev,
        [name]: parseFloat(value)
      }
      if (!loggedIn) {
        localStorage.setItem('laborCostInputs', JSON.stringify(newInputs))
      }
      return newInputs
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loggedIn && email) {
      try {
        await axios.patch(
          `http://localhost:3001/labour-cost/updateInput/${email}`,
          laborCostInputs
        )
      } catch (error) {
        console.error('Error saving labor cost inputs:', error)
      }
    } else {
      
      localStorage.setItem('laborCostInputs', JSON.stringify(laborCostInputs))
    }
    handleSubmit()
  }

  const inputFields = [
    [
      { name: 'numberOfOwners', label: 'Number of Owners', unit: '' },
      { name: 'ownerSalary', label: 'Owner Salary', unit: '$/Year' },
      { name: 'ownerBenefits', label: 'Owner Benefits', unit: '$/Year' },
      { name: 'numberOfManagers', label: 'Number of Managers', unit: '' },
      { name: 'managerSalary', label: 'Manager Salary', unit: '$/Year' },
      { name: 'managerBenefits', label: 'Manager Benefits', unit: '$/Year' },
    ],
    [
      { name: 'numberOfHerdHealthEmployees', label: 'Number of Herd Health and Maintenance Employees', unit: '' },
      { name: 'herdHealthEmployeeTime', label: 'Herd Health and Maintenance Employee Time', unit: 'Hours/Year/Person' },
      { name: 'herdHealthEmployeeWage', label: 'Herd Health and Maintenance Employee Wage', unit: '$/Hour' },
      { name: 'herdHealthEmployeeBenefits', label: 'Herd Health and Maintenance Employee Benefits', unit: '$/Hour' },
      { name: 'numberOfFeederEmployees', label: 'Number of Feeder Employees', unit: '' },
      { name: 'feederEmployeeTime', label: 'Feeder Employee Time', unit: 'Hours/Year/Person' },
      { name: 'feederEmployeeWage', label: 'Feeder Employee Wage', unit: '$/Hour' },
      { name: 'feederEmployeeBenefits', label: 'Feeder Employee Benefits', unit: '$/Hour' },
      { name: 'numberOfCropEmployees', label: 'Number of Crop Employees', unit: '' },
      { name: 'cropEmployeeTime', label: 'Crop Employee Time', unit: 'Hours/Year/Person' },
      { name: 'cropEmployeeWage', label: 'Crop Employee Wage', unit: '$/Hour' },
      { name: 'cropEmployeeBenefits', label: 'Crop Employee Benefits', unit: '$/Hour' },
    ],
    [
      { name: 'numberOfMilkerEmployees', label: 'Number of Milker Employees', unit: '' },
      { name: 'milkerEmployeeTime', label: 'Milker Employee Time', unit: 'Hours/Year/Person' },
      { name: 'milkerEmployeeWage', label: 'Milker Employee Wage', unit: '$/Hour' },
      { name: 'milkerEmployeeBenefits', label: 'Milker Employee Benefits', unit: '$/Hour' },
      { name: 'replacementEmployees', label: 'Replacement Employees', unit: '' },
      { name: 'replacementEmployeeTime', label: 'Replacement Employee Time', unit: 'Hours/Year/Person' },
      { name: 'replacementEmployeeWage', label: 'Replacement Employee Wage', unit: '$/Hour' },
      { name: 'replacementEmployeeBenefits', label: 'Replacement Employee Benefits', unit: '$/Hour' },
      { name: 'facilitiesEmployees', label: 'Facilities and Equipment Employees', unit: '' },
      { name: 'facilitiesEmployeeTime', label: 'Facilities and Equipment Employee Time', unit: 'Hours/Year/Person' },
      { name: 'facilitiesEmployeeWage', label: 'Facilities and Equipment Employee Wage', unit: '$/Hour' },
      { name: 'facilitiesEmployeeBenefits', label: 'Facilities and Equipment Employee Benefits', unit: '$/Hour' },
      { name: 'otherEmployees', label: 'Other Employees', unit: '' },
      { name: 'otherEmployeeTime', label: 'Other Employee Time', unit: 'Hours/Year/Person' },
      { name: 'otherEmployeeWage', label: 'Other Employee Wage', unit: '$/Hour' },
      { name: 'otherEmployeeBenefits', label: 'Other Employee Benefits', unit: '$/Hour' },
    ],
  ]

  const sections = [
    'Owner and Manager Labour Cost',
    'Herd Health and Feed Labour Cost',
    'Dairy Labour Costs'
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
        Enter Labor Cost Inputs
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Please enter your labor cost inputs for the Dairy Enterprise Budget Model.
        </DialogContentText>
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {sections.map((section, sectionIndex) => (
            <React.Fragment key={section}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{section}</Typography>
              <Grid container spacing={2}>
                {inputFields[sectionIndex].map(field => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <TextField
                          margin="dense"
                          name={field.name}
                          label={`${field.label} ${field.unit ? `(${field.unit})` : ''}`}
                          type="number"
                          fullWidth
                          required
                          value={laborCostInputs[field.name as keyof LaborCostInputs]}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          margin="dense"
                          label="Default"
                          type="number"
                          fullWidth
                          value={defaultInputs[field.name as keyof LaborCostInputs]}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          ))}
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

export default InputLabourDialog
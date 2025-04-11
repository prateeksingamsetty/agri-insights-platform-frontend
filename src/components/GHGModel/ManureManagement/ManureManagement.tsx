'use client'

import { Container, TextField, Typography, Button, Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputDialog from './InputDialog'
import { useAuth } from 'src/context/AuthContext'

interface ManureManagement {
  methaneEmissions: {
    ch4EmissionsMMS1: number
    ch4EmissionsMMS2: number
    ch4EmissionsMMS3: number
    ch4EmissionsMMS4: number
    ch4EmissionsPastureNonrecoverable: number
    ch4TotalEmissions: number
  }
  nitrousOxideEmissions: {
    n2oDirectEmissionsMMS1: number
    n2oDirectEmissionsMMS2: number
    n2oDirectEmissionsMMS3: number
    n2oDirectEmissionsMMS4: number
    n2oDirectEmissionsPastureNonrecoverable: number
    n2oIndirectVolatileEmissionsMMS1: number
    n2oIndirectVolatileEmissionsMMS2: number
    n2oIndirectVolatileEmissionsMMS3: number
    n2oIndirectVolatileEmissionsMMS4: number
    n2oIndirectVolatileEmissionsPastureNonrecoverable: number
    n2oIndirectLeachEmissionsMMS1: number
    n2oIndirectLeachEmissionsMMS2: number
    n2oIndirectLeachEmissionsMMS3: number
    n2oIndirectLeachEmissionsMMS4: number
    n2oIndirectLeachEmissionsPastureNonrecoverable: number
    n2oTotalEmissions: number
  }
  manureManagementFootprint: {
    totalCO2eFromCH4: number
    totalCO2eFromN2O: number
    totalCO2eFromManureManagement: number
    footprintFromCH4: number
    footprintFromN2O: number
    footprintFromMMS: number
  }
}

const defaultOutput: ManureManagement = {
  methaneEmissions: {
    ch4EmissionsMMS1: 0,
    ch4EmissionsMMS2: 0,
    ch4EmissionsMMS3: 0,
    ch4EmissionsMMS4: 0,
    ch4EmissionsPastureNonrecoverable: 0,
    ch4TotalEmissions: 0
  },
  nitrousOxideEmissions: {
    n2oDirectEmissionsMMS1: 0,
    n2oDirectEmissionsMMS2: 0,
    n2oDirectEmissionsMMS3: 0,
    n2oDirectEmissionsMMS4: 0,
    n2oDirectEmissionsPastureNonrecoverable: 0,
    n2oIndirectVolatileEmissionsMMS1: 0,
    n2oIndirectVolatileEmissionsMMS2: 0,
    n2oIndirectVolatileEmissionsMMS3: 0,
    n2oIndirectVolatileEmissionsMMS4: 0,
    n2oIndirectVolatileEmissionsPastureNonrecoverable: 0,
    n2oIndirectLeachEmissionsMMS1: 0,
    n2oIndirectLeachEmissionsMMS2: 0,
    n2oIndirectLeachEmissionsMMS3: 0,
    n2oIndirectLeachEmissionsMMS4: 0,
    n2oIndirectLeachEmissionsPastureNonrecoverable: 0,
    n2oTotalEmissions: 0
  },
  manureManagementFootprint: {
    totalCO2eFromCH4: 0,
    totalCO2eFromN2O: 0,
    totalCO2eFromManureManagement: 0,
    footprintFromCH4: 0,
    footprintFromN2O: 0,
    footprintFromMMS: 0
  }
}

const ManureManagement = () => {
  const { email, loggedIn } = useAuth()
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

  const [output, setOutput] = useState<ManureManagement>(defaultOutput)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (loggedIn && email) {
      fetchUserOutputRecord()
    } else {
      const stored = localStorage.getItem('manureManagement')
      if (stored) {
        // Simply parse and use local storage data; if some parts are missing, inline fallback will occur later.
        setOutput(JSON.parse(stored))
      }
    }
  }, [loggedIn, email])

  const fetchUserOutputRecord = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/manure-management/outputDetails/${email}`
      )
      if (response?.data) {
        // Use fallback defaults inline via the "||" operator
        setOutput({
          methaneEmissions: response.data.methaneEmissions || defaultOutput.methaneEmissions,
          nitrousOxideEmissions: response.data.nitrousOxideEmissions || defaultOutput.nitrousOxideEmissions,
          manureManagementFootprint: response.data.manureManagementFootprint || defaultOutput.manureManagementFootprint
        })
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn('No manure management output record found for the given email')
      } else {
        console.error('Error fetching manure management output record:', error)
      }
    }
  }

  const handleDialogOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  // Inline transformation of user inputs
  const handleSubmit = async (userInputs: any) => {
    const transformedInputs = {
      percentLactatingManureRecoverable: userInputs.percentLactatingManureRecoverable,
      percentDryManureRecoverable: userInputs.percentDryManureRecoverable,
      percentBredManureRecoverable: userInputs.percentBredManureRecoverable,
      percentYoungManureRecoverable: userInputs.percentYoungManureRecoverable,
      manureManagementSystem1: userInputs.manureManagementSystem1,
      percentOfManureMMS1: userInputs.percentOfManureMMS1,
      manureManagementSystem2: userInputs.manureManagementSystem2,
      percentOfManureMMS2: userInputs.percentOfManureMMS2,
      manureManagementSystem3: userInputs.manureManagementSystem3,
      percentOfManureMMS3: userInputs.percentOfManureMMS3,
      manureManagementSystem4: userInputs.manureManagementSystem4,
      percentOfManureMMS4: userInputs.percentOfManureMMS4
    }

    try {
      let response
      if (loggedIn && email) {
        response = await axios.patch(
          `${BASE_URL}/manure-management/updateInput/${email}`,
          transformedInputs
        )
      } else {
        response = await axios.post(
          `${BASE_URL}/manure-management/calculateManureManagement`,
          transformedInputs
        )
        localStorage.setItem('manureManagement', JSON.stringify(userInputs))
      }
      if (response?.data) {
        // Set state using inline fallback operators in case any section is missing
        setOutput({
          methaneEmissions: response.data.methaneEmissions || defaultOutput.methaneEmissions,
          nitrousOxideEmissions: response.data.nitrousOxideEmissions || defaultOutput.nitrousOxideEmissions,
          manureManagementFootprint: response.data.manureManagementFootprint || defaultOutput.manureManagementFootprint
        })
      }
    } catch (error) {
      console.error('Error updating manure management output:', error)
    }
  }

  // Field definitions using inline defaults via "??"
  const methaneFields = [
    { label: 'CH4 Emissions MMS1', value: output.methaneEmissions?.ch4EmissionsMMS1 ?? 0 },
    { label: 'CH4 Emissions MMS2', value: output.methaneEmissions?.ch4EmissionsMMS2 ?? 0 },
    { label: 'CH4 Emissions MMS3', value: output.methaneEmissions?.ch4EmissionsMMS3 ?? 0 },
    { label: 'CH4 Emissions MMS4', value: output.methaneEmissions?.ch4EmissionsMMS4 ?? 0 },
    {
      label: 'CH4 Emissions Pasture Nonrecoverable',
      value: output.methaneEmissions?.ch4EmissionsPastureNonrecoverable ?? 0
    },
    { label: 'Total CH4 Emissions', value: output.methaneEmissions?.ch4TotalEmissions ?? 0 }
  ]

  const nitrousFields = [
    { label: 'N2O Direct Emissions MMS1', value: output.nitrousOxideEmissions?.n2oDirectEmissionsMMS1 ?? 0 },
    { label: 'N2O Direct Emissions MMS2', value: output.nitrousOxideEmissions?.n2oDirectEmissionsMMS2 ?? 0 },
    { label: 'N2O Direct Emissions MMS3', value: output.nitrousOxideEmissions?.n2oDirectEmissionsMMS3 ?? 0 },
    { label: 'N2O Direct Emissions MMS4', value: output.nitrousOxideEmissions?.n2oDirectEmissionsMMS4 ?? 0 },
    {
      label: 'N2O Direct Emissions Pasture Nonrecoverable',
      value: output.nitrousOxideEmissions?.n2oDirectEmissionsPastureNonrecoverable ?? 0
    },
    { label: 'N2O Indirect Volatile Emissions MMS1', value: output.nitrousOxideEmissions?.n2oIndirectVolatileEmissionsMMS1 ?? 0 },
    { label: 'N2O Indirect Volatile Emissions MMS2', value: output.nitrousOxideEmissions?.n2oIndirectVolatileEmissionsMMS2 ?? 0 },
    { label: 'N2O Indirect Volatile Emissions MMS3', value: output.nitrousOxideEmissions?.n2oIndirectVolatileEmissionsMMS3 ?? 0 },
    { label: 'N2O Indirect Volatile Emissions MMS4', value: output.nitrousOxideEmissions?.n2oIndirectVolatileEmissionsMMS4 ?? 0 },
    {
      label: 'N2O Indirect Volatile Emissions Pasture Nonrecoverable',
      value: output.nitrousOxideEmissions?.n2oIndirectVolatileEmissionsPastureNonrecoverable ?? 0
    },
    { label: 'N2O Indirect Leach Emissions MMS1', value: output.nitrousOxideEmissions?.n2oIndirectLeachEmissionsMMS1 ?? 0 },
    { label: 'N2O Indirect Leach Emissions MMS2', value: output.nitrousOxideEmissions?.n2oIndirectLeachEmissionsMMS2 ?? 0 },
    { label: 'N2O Indirect Leach Emissions MMS3', value: output.nitrousOxideEmissions?.n2oIndirectLeachEmissionsMMS3 ?? 0 },
    { label: 'N2O Indirect Leach Emissions MMS4', value: output.nitrousOxideEmissions?.n2oIndirectLeachEmissionsMMS4 ?? 0 },
    {
      label: 'N2O Indirect Leach Emissions Pasture Nonrecoverable',
      value: output.nitrousOxideEmissions?.n2oIndirectLeachEmissionsPastureNonrecoverable ?? 0
    },
    { label: 'Total N2O Emissions', value: output.nitrousOxideEmissions?.n2oTotalEmissions ?? 0 }
  ]

  const footprintFields = [
    { label: 'Total CO2e from CH4', value: output.manureManagementFootprint?.totalCO2eFromCH4 ?? 0 },
    { label: 'Total CO2e from N2O', value: output.manureManagementFootprint?.totalCO2eFromN2O ?? 0 },
    { label: 'Total CO2e from Manure Management', value: output.manureManagementFootprint?.totalCO2eFromManureManagement ?? 0 },
    { label: 'Footprint from CH4', value: output.manureManagementFootprint?.footprintFromCH4 ?? 0 },
    { label: 'Footprint from N2O', value: output.manureManagementFootprint?.footprintFromN2O ?? 0 },
    { label: 'Footprint from MMS', value: output.manureManagementFootprint?.footprintFromMMS ?? 0 }
  ]

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        sx={{ color: '#c8102e', fontWeight: 'bold', marginTop: '20px' }}
      >
        Manure Management Output
      </Typography>
      <Container maxWidth="sm" sx={{ marginTop: '20px', marginBottom: '40px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Methane Emissions
          </Typography>
          {methaneFields.map(field => (
            <TextField
              key={field.label}
              label={field.label}
              variant="outlined"
              value={field.value}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          ))}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Nitrous Oxide Emissions
          </Typography>
          {nitrousFields.map(field => (
            <TextField
              key={field.label}
              label={field.label}
              variant="outlined"
              value={field.value}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          ))}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Manure Management Footprint
          </Typography>
          {footprintFields.map(field => (
            <TextField
              key={field.label}
              label={field.label}
              variant="outlined"
              value={field.value}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          ))}
          <Button
            variant="contained"
            sx={{
              bgcolor: '#c8102e',
              '&:hover': { bgcolor: '#a50f2e' },
              marginTop: 2,
              paddingY: 1.5
            }}
            onClick={handleDialogOpen}
          >
            Input Manure Management
          </Button>
        </Box>
      </Container>
      <InputDialog open={open} handleClose={handleDialogClose} handleSubmit={handleSubmit} />
    </div>
  )
}

export default ManureManagement
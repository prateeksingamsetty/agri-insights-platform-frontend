'use client'

import { Container, TextField, Typography, Button, Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputDialog from './InputDialog'
import { useAuth } from 'src/context/AuthContext'

interface EnergyFootprintType {
  electric: number
  diesel: number
  gasoline: number
  propane: number
  naturalGas: number
  fuelOil: number
  biodiesel: number
}

const EnergyFootprint = () => {
  const { email, loggedIn } = useAuth()
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

  const [footprint, setFootprint] = useState<EnergyFootprintType>({
    electric: 0,
    diesel: 0,
    gasoline: 0,
    propane: 0,
    naturalGas: 0,
    fuelOil: 0,
    biodiesel: 0
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    // If the user is logged in, fetch their energy footprint record.
    if (loggedIn && email != null) {
      fetchUserEnergyFootprint()
    } else {
      // Otherwise, check local storage and calculate outputs if found.
      const storedInputs = localStorage.getItem('energyFootprintInputs')
      if (storedInputs) {
        const parsedInputs = JSON.parse(storedInputs)
        handleSubmit(parsedInputs)
      }
    }
  }, [loggedIn, email])

  const fetchUserEnergyFootprint = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/energy-footprint/outputDetails/${email}`
      )
      if (response && response.data) {
        setFootprint({
          electric: response.data.electric || 0,
          diesel: response.data.diesel || 0,
          gasoline: response.data.gasoline || 0,
          propane: response.data.propane || 0,
          naturalGas: response.data.naturalGas || 0,
          fuelOil: response.data.fuelOil || 0,
          biodiesel: response.data.biodiesel || 0
        })
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn('No energy footprint record found for the given email')
      } else {
        console.error('Error fetching energy footprint record:', error)
      }
    }
  }

  const handleDialogOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleSubmit = async (userInputs: any) => {
    try {
      // Transform the user inputs to match the DTO structure.
      // In this case, the structure is identical, so we just create a new object.
      const transformedInputs: any = {
        annualEnergyUse: {
          electric: userInputs.annualEnergyUse.electric,
          diesel: userInputs.annualEnergyUse.diesel,
          gasoline: userInputs.annualEnergyUse.gasoline,
          propane: userInputs.annualEnergyUse.propane,
          naturalGas: userInputs.annualEnergyUse.naturalGas,
          fuelOil: userInputs.annualEnergyUse.fuelOil,
          biodiesel: userInputs.annualEnergyUse.biodiesel,
        },
        dairyOperationsEnergyUse: {
          electric: userInputs.dairyOperationsEnergyUse.electric,
          diesel: userInputs.dairyOperationsEnergyUse.diesel,
          gasoline: userInputs.dairyOperationsEnergyUse.gasoline,
          propane: userInputs.dairyOperationsEnergyUse.propane,
          naturalGas: userInputs.dairyOperationsEnergyUse.naturalGas,
          fuelOil: userInputs.dairyOperationsEnergyUse.fuelOil,
          biodiesel: userInputs.dairyOperationsEnergyUse.biodiesel,
        },
      };
  
      let response;
      if (loggedIn && email) {
        response = await axios.patch(
          `${BASE_URL}/energy-footprint/updateInput/${email}`,
          transformedInputs
        );
      }

    } catch (error) {
      console.error('Error updating energy footprint inputs:', error);
    }
  };

  const textFields = [
    { label: 'Electric (lbsCO2e/lbsFPCM)', value: footprint.electric },
    { label: 'Diesel (lbsCO2e/lbsFPCM)', value: footprint.diesel },
    { label: 'Gasoline (lbsCO2e/lbsFPCM)', value: footprint.gasoline },
    { label: 'Propane (lbsCO2e/lbsFPCM)', value: footprint.propane },
    { label: 'Natural Gas (lbsCO2e/lbsFPCM)', value: footprint.naturalGas },
    { label: 'Fuel Oil (lbsCO2e/lbsFPCM)', value: footprint.fuelOil },
    { label: 'Biodiesel (lbsCO2e/lbsFPCM)', value: footprint.biodiesel }
  ]

  return (
    <div>
      <Typography
        className="mt-5 text-center"
        variant="h4"
        sx={{ color: '#c8102e', fontWeight: 'bold' }}
      >
        Energy GHG Footprint
      </Typography>
      <Container maxWidth="sm" className="mb-10 mt-10">
        <Box
          className="space-y-6"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {textFields.map((field) => (
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
              mt: 2,
              py: 1.5
            }}
            onClick={handleDialogOpen}
          >
            Input Energy Footprint Details
          </Button>
        </Box>
      </Container>
      <InputDialog
        open={open}
        handleClose={handleDialogClose}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default EnergyFootprint
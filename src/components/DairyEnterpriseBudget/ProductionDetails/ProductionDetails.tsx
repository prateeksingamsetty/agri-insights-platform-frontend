'use client'

import { Container, TextField, Typography, Button, Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputDialog from './InputDialog'
import { useAuth } from 'src/context/AuthContext'

interface ProductionDetailsType {
  rollingHerdAverage: number
  totalAnnualMilkProduction: number
  expectedAnnualMilkSales: number
  numberOfReplacementHeifersNeeded: number
}

const ProductionDetails = () => {
  const { email, loggedIn } = useAuth()
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

  const [details, setDetails] = useState<ProductionDetailsType>({
    rollingHerdAverage: 0,
    totalAnnualMilkProduction: 0,
    expectedAnnualMilkSales: 0,
    numberOfReplacementHeifersNeeded: 0
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log('BASE_URL ', BASE_URL)
    console.log(
      'process.env.NEXT_PUBLIC_BACKEND_URL ',
      process.env.NEXT_PUBLIC_BACKEND_URL
    )

    // This checks if the user is alredy logged in or if not then it checks stored session storage and calculat ouput and display
    if (loggedIn && email != null) {
      console.log('Called because user logged in ', email)
      fetchUserOutputRecord()
    } else {
      console.log('User not logged in')
      const storedInputs = localStorage.getItem('productionInputs')
      if (storedInputs) {
        console.log('Stored inputs true')
        const parsedInputs = JSON.parse(storedInputs)
        handleSubmit(parsedInputs)
      }
    }
  }, [loggedIn, email])

  const fetchUserOutputRecord = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/production-details/outputDetails/${email}`
        // `http://localhost:3001/production-details/outputDetails/${email}`
      )
      if (response && response.data) {
        setDetails({
          rollingHerdAverage: response.data.rollingHerdAverage || 0,
          totalAnnualMilkProduction:
            response.data.totalAnnualMilkProduction || 0,
          expectedAnnualMilkSales: response.data.expectedAnnualMilkSales || 0,
          numberOfReplacementHeifersNeeded:
            response.data.numberOfReplacementHeifersNeeded || 0
        })
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn('No user output record found for the given email')
      } else {
        console.error('Error fetching user output record:', error)
      }
    }
  }

  const handleDialogOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleSubmit = async (userInputs: any) => {
    console.log('Production details userInputs ', userInputs)
    try {
      const transformedInputs = {
        milkProduction: {
          totalNumberOfCows: userInputs.totalNumberOfCows,
          expectedMilkPrice: userInputs.expectedMilkPrice,
          calvingInterval: userInputs.calvingInterval,
          expectedMilkProduction: userInputs.expectedMilkProduction
        },
        heiferProduction: {
          cullingRate: userInputs.cullingRate,
          cowDeathLossRate: userInputs.cowDeathLossRate,
          heiferRaisingDeathLossRate: userInputs.heiferRaisingDeathLossRate,
          numberOfHeifersRaised: userInputs.numberOfHeifersRaised,
          bullCalfDeath: userInputs.bullCalfDeath,
          expectedPercentMaleWithSexedSemen:
            userInputs.expectedPercentMaleWithSexedSemen,
          expectedPercentMaleWithConventional:
            userInputs.expectedPercentMaleWithConventional,
          heifersBredConventionalPercent:
            userInputs.heifersBredConventionalPercent,
          heifersBredSexedPercent:
            userInputs.heifersBredSexedPercent,
          avgAgeofFirstCalving:
            userInputs.avgAgeofFirstCalving,
          
        },
        beefCrossDetails: {
          heifersBredBeefCrossPercent: userInputs.heifersBredBeefCrossPercent,
          expectedPercentMaleWithBeef: userInputs.expectedPercentMaleWithBeef,
          beefCrossDeathRate: userInputs.beefCrossDeathRate
        }
      }

      let response
      if (loggedIn && email) {
        response = await axios.patch(
          `${BASE_URL}/production-details/updateInput/${email}`,
          transformedInputs
        )
      } else {
        response = await axios.post(
          `${BASE_URL}/production-details/calculateProductionDetails`,
          transformedInputs
        )
        localStorage.setItem('productionInputs', JSON.stringify(userInputs))
      }

      if (response && response.data) {
        setDetails({
          rollingHerdAverage: response.data.rollingHerdAverage || 0,
          totalAnnualMilkProduction:
            response.data.totalAnnualMilkProduction || 0,
          expectedAnnualMilkSales: response.data.expectedAnnualMilkSales || 0,
          numberOfReplacementHeifersNeeded:
            response.data.numberOfReplacementHeifersNeeded || 0
        })
      }
    } catch (error) {
      console.error('Error updating user inputs:', error)
    }
  }

  const textFields = [
    {
      label: 'Rolling Herd Average(LBS/year)',
      value: details.rollingHerdAverage
    },
    {
      label: 'Total Annual Milk Production(CWT/year)',
      value: details.totalAnnualMilkProduction
    },
    {
      label: 'Expected Annual Milk Sales($/year)',
      value: details.expectedAnnualMilkSales
    },
    {
      label: 'Number of Replacement Heifers Needed',
      value: details.numberOfReplacementHeifersNeeded
    }
  ]

  return (
    <div>
      <Typography
        className='mt-5 text-center'
        variant='h4'
        sx={{ color: '#c8102e', fontWeight: 'bold' }}
      >
        Productivity and Sales
      </Typography>
      <Container maxWidth='sm' className='mb-10 mt-10'>
        <Box
          className='space-y-6'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {textFields.map(field => (
            <TextField
              key={field.label}
              label={field.label}
              variant='outlined'
              value={field.value}
              InputProps={{
                readOnly: true
              }}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />
          ))}
          <Button
            variant='contained'
            sx={{
              bgcolor: '#c8102e',
              '&:hover': { bgcolor: '#a50f2e' },
              mt: 2,
              py: 1.5
            }}
            onClick={handleDialogOpen}
          >
            Input Production Details
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

export default ProductionDetails

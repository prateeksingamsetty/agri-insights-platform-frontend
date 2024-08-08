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
  const { email } = useAuth()
  console.log('email ', email)

  const [details, setDetails] = useState<ProductionDetailsType>({
    rollingHerdAverage: 0,
    totalAnnualMilkProduction: 0,
    expectedAnnualMilkSales: 0,
    numberOfReplacementHeifersNeeded: 0
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!email) return

    const fetchUserOutputRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/production-details/outputDetails/${email}`
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

    fetchUserOutputRecord()
  }, [email])

  const handleDialogOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleSubmit = async (userInputs: any) => {
    try {
      const transformedInputs = {
        milkProduction: {
          totalNumberOfCows: userInputs.totalNumberOfCows,
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
            userInputs.expectedPercentMaleWithConventional
        },
        beefCrossDetails: {
          beefCrossPercent: userInputs.beefCrossPercent,
          beefCrossDeathRate: userInputs.beefCrossDeathRate
        }
      }

      const response = await axios.patch(
        `http://localhost:3001/production-details/updateInput/${email}`,
        transformedInputs
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
    } catch (error) {
      console.error('Error updating user inputs:', error)
    }
  }

  const textFields = [
    { label: 'Rolling Herd Average(LBS)', value: details.rollingHerdAverage },
    {
      label: 'Total Annual Milk Production(CWT)',
      value: details.totalAnnualMilkProduction
    },
    {
      label: 'Expected Annual Milk Sales($)',
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

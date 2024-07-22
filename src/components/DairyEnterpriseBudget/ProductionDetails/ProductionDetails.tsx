// 'use client'

import { Container, TextField, Typography, Button, Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputDialog from './InputDialog'

const ProductionDetails = () => {
  const [rollingHerdAverage, setRollingHerdAverage] = useState('')
  const [totalAnnualMilkProduction, setTotalAnnualMilkProduction] = useState('')
  const [expectedAnnualMilkSales, setExpectedAnnualMilkSales] = useState('')
  const [
    numberOfReplacementHeifersNeeded,
    setNumberOfReplacementHeifersNeeded
  ] = useState('')

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchUserOutputRecord = async () => {
      console.log('Function called')
      try {
        const email = 'prateek@gmail.com'
        const response = await axios.get(
          `http://localhost:3001/production-details/outputDetails/${email}`
        )
        if (response && response.data) {
          const {
            rollingHerdAverage,
            totalAnnualMilkProduction,
            expectedAnnualMilkSales,
            numberOfReplacementHeifersNeeded
          } = response.data

          setRollingHerdAverage(rollingHerdAverage || '')
          setTotalAnnualMilkProduction(totalAnnualMilkProduction || '')
          setExpectedAnnualMilkSales(expectedAnnualMilkSales || '')
          setNumberOfReplacementHeifersNeeded(
            numberOfReplacementHeifersNeeded || ''
          )
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.warn('No user output record found for the given email')
        } else {
          console.error('Error fetching user output record:', error)
        }
      }
    }

    fetchUserOutputRecord()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (userInputs: any) => {
    try {
      const email = 'prateek@gmail.com'
      console.log('userInputs ', userInputs)

      //modify the userInputs accordingly before making API call
      const transformedInputs = {
        milkProduction: {
          totalNumberOfCows: userInputs.totalNumberOfCows,
          calvingInterval: userInputs.calvingInterval,
          expectedMilkProduction: userInputs.expectedMilkProduction
        },
        heiferProduction: {
          cullingRate: userInputs.cullingRate,
          cowDeathLossRate: userInputs.cowDeathLossRate,
          heiferRaisingDeathLossRate: userInputs.heiferRaisingDeathLossRate
        },
        beefCrossDetails: {}
      }

      const response = await axios.patch(
        `http://localhost:3001/production-details/updateInput/${email}`,
        transformedInputs
      )
      if (response && response.data) {
        const {
          rollingHerdAverage,
          totalAnnualMilkProduction,
          expectedAnnualMilkSales,
          numberOfReplacementHeifersNeeded
        } = response.data

        setRollingHerdAverage(rollingHerdAverage || '')
        setTotalAnnualMilkProduction(totalAnnualMilkProduction || '')
        setExpectedAnnualMilkSales(expectedAnnualMilkSales || '')
        setNumberOfReplacementHeifersNeeded(
          numberOfReplacementHeifersNeeded || ''
        )
      }
    } catch (error) {
      console.error('Error updating user inputs:', error)
    }
  }

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
          <TextField
            label='Rolling Herd Average'
            variant='outlined'
            value={rollingHerdAverage}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            label='Total Annual Milk Production'
            variant='outlined'
            value={totalAnnualMilkProduction}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            label='Expected Annual Milk Sales'
            variant='outlined'
            value={expectedAnnualMilkSales}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            label='Number of Replacement Heifers Needed'
            variant='outlined'
            value={numberOfReplacementHeifersNeeded}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <Button
            variant='contained'
            sx={{
              bgcolor: '#c8102e',
              '&:hover': { bgcolor: '#a50f2e' },
              mt: 2,
              py: 1.5
            }}
            onClick={handleClickOpen}
          >
            Input Production Details
          </Button>
        </Box>
      </Container>

      <InputDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default ProductionDetails

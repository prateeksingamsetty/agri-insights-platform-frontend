'use client'

import { Container, TextField, Typography, Button, Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputDialog from './InputDialog'
import { useAuth } from 'src/context/AuthContext'

interface ReceiptsDataType {
  milkSales: number
  cullCowsSales: number
  heifersSales: number
  bullCalvesSales: number
  beefCrossSales: number
  otherIncome1: number
  otherIncome2: number
  totalReceipts: number
}

const ReceiptsAtExpectedOutputLevels = () => {
  const { email } = useAuth()

  const [data, setData] = useState<ReceiptsDataType>({
    milkSales: 0,
    cullCowsSales: 0,
    heifersSales: 0,
    bullCalvesSales: 0,
    beefCrossSales: 0,
    otherIncome1: 0,
    otherIncome2: 0,
    totalReceipts: 0
  })

  const [open, setOpen] = useState(false)
  const [previoudDetailsFound, setDetailsFound] = useState(false)

  useEffect(() => {
    const checkProductionDetailsPresent = async (): Promise<void> => {
      try {
        const response = await axios.get(
          `http://localhost:3001/production-details/outputDetails/${email}`
        )
        if (response?.data) {
          setDetailsFound(true)
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.warn('No user output record found for the given email')
        } else {
          console.error('Error fetching user output record:', error)
        }
      }
    }

    const fetchUserOutputRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/receipts/outputDetails/${email}`
        )
        if (response?.data) {
          setData({
            milkSales: response.data.milkSales || 0,
            cullCowsSales: response.data.cullCowsSales || 0,
            heifersSales: response.data.heifersSales || 0,
            bullCalvesSales: response.data.bullCalvesSales || 0,
            beefCrossSales: response.data.beefCrossSales || 0,
            otherIncome1: response.data.otherIncome1 || 0,
            otherIncome2: response.data.otherIncome2 || 0,
            totalReceipts: response.data.totalReceipts || 0
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

    checkProductionDetailsPresent()
    fetchUserOutputRecord()
  }, [])

  const handleDialogOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleSubmit = async (userInputs: any) => {
    try {
      const transformedInputs = {
        milkPrice: Number(userInputs.milkPrice),
        cullCowsPrice: Number(userInputs.cullCowsPrice),
        heifersPrice: Number(userInputs.heifersPrice),
        bullCalvesPrice: Number(userInputs.bullCalvesPrice),
        beefCrossPrice: Number(userInputs.beefCrossPrice),
        otherIncome1: Number(userInputs.otherIncome1),
        otherIncome2: Number(userInputs.otherIncome2)
      }

      const response = await axios.patch(
        `http://localhost:3001/receipts/updateInput/${email}`,
        transformedInputs
      )

      if (response?.data) {
        console.log('response ', response)
        setData({
          milkSales: response.data.milkSales || 0,
          cullCowsSales: response.data.cullCowsSales || 0,
          heifersSales: response.data.heifersSales || 0,
          bullCalvesSales: response.data.bullCalvesSales || 0,
          beefCrossSales: response.data.beefCrossSales || 0,
          otherIncome1: response.data.otherIncome1 || 0,
          otherIncome2: response.data.otherIncome2 || 0,
          totalReceipts: response.data.totalReceipts || 0
        })
      }
    } catch (error) {
      console.error('Error updating user inputs:', error)
    }
  }

  const textFields = [
    { label: 'Milk Sales', value: data.milkSales },
    { label: 'Cull Cows Sales', value: data.cullCowsSales },
    { label: 'Heifers Sales', value: data.heifersSales },
    { label: 'Bull Calves Sales', value: data.bullCalvesSales },
    { label: 'Beef Cross Sales', value: data.beefCrossSales },
    {
      label: 'Other Income - Gov, Payments, Livestock, etc',
      value: data.otherIncome1
    },
    {
      label: 'Other Income - Misc, Crop or Livestock Sales, etc',
      value: data.otherIncome2
    },
    { label: 'Total Receipts', value: data.totalReceipts }
  ]

  return (
    <div>
      <Typography
        className='mt-5 text-center'
        variant='h4'
        sx={{ color: '#c8102e', fontWeight: 'bold' }}
      >
        Receipts at Expected Output Levels
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
              type='number'
              value={field.value}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
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
            Input Receipts at Expected Output Level
          </Button>
        </Box>
      </Container>
      <InputDialog
        previoudDetailsFound={previoudDetailsFound}
        open={open}
        handleClose={handleDialogClose}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default ReceiptsAtExpectedOutputLevels

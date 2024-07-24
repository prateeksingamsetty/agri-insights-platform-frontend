'use client'

import { Container, TextField, Typography, Button, Box } from '@mui/material'
import { useState } from 'react'
import InputDialog from './InputDialog'

interface OperatingCostsType {
  totalFeedCost: number
  raisedFeedCost: number
  purchasedFeedCost: number
  dairyOperatingCost: number
  dairyPayroll: number
  additionalManagementCosts: number
  totalOperatingCosts: number
}

const OperatingCosts = () => {
  const [operatingCosts, setOperatingCosts] = useState<OperatingCostsType>({
    totalFeedCost: 0,
    raisedFeedCost: 0,
    purchasedFeedCost: 0,
    dairyOperatingCost: 0,
    dairyPayroll: 0,
    additionalManagementCosts: 0,
    totalOperatingCosts: 0
  })

  const [open, setOpen] = useState(false)

  const handleDialogOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleSubmit = async (userInputs: any) => {
    // Handle submit logic here
  }

  const textFields = [
    { label: 'Total Feed Cost($)', value: operatingCosts.totalFeedCost },
    { label: 'Raised Feed Cost($)', value: operatingCosts.raisedFeedCost },
    {
      label: 'Purchased Feed Cost($)',
      value: operatingCosts.purchasedFeedCost
    },
    {
      label: 'Dairy Operating Cost($)',
      value: operatingCosts.dairyOperatingCost
    },
    { label: 'Dairy Payroll($)', value: operatingCosts.dairyPayroll },
    {
      label: 'Additional Management Costs($)',
      value: operatingCosts.additionalManagementCosts
    },
    {
      label: 'Total Operating Costs($)',
      value: operatingCosts.totalOperatingCosts
    }
  ]

  return (
    <div>
      <Typography
        className='mt-5 text-center'
        variant='h4'
        sx={{ color: '#c8102e', fontWeight: 'bold' }}
      >
        Operating Costs
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
            Input Operating Costs
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

export default OperatingCosts

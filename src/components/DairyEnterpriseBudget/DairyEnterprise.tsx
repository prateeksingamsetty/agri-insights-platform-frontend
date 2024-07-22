'use client'

import { Typography } from '@mui/material'
import ProductionDetails from './ProductionDetails/ProductionDetails'
import ReceiptsAtExpectedOutputLevels from './ReceiptsAtExpectedOutputLevels/ReceiptsAtExpectedOutputLevels'

const DairyEnterprise = () => {
  return (
    <div>
      <Typography
        className='text-center'
        variant='h3'
        sx={{ color: '#c8102e', fontWeight: 'bold' }}
      >
        Dairy Enterprise Budget Model
      </Typography>
      <ProductionDetails />
      <ReceiptsAtExpectedOutputLevels />
    </div>
  )
}

export default DairyEnterprise

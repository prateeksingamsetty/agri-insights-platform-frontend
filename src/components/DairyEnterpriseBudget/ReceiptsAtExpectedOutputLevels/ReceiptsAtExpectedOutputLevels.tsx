import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import InputDialog from './InputDialog'

const ReceiptsAtExpectedOutputLevels = () => {
  const [milkPrice, setMilkPrice] = useState('')
  const [cullCowsPrice, setCullCowsPrice] = useState('')
  const [heifersPrice, setHeifersPrice] = useState('')
  const [bullCalvesPrice, setBullCalvesPrice] = useState('')
  const [beefCrossPrice, setBeefCrossPrice] = useState('')
  const [otherIncome1, setOtherIncome1] = useState('')
  const [otherIncome2, setOtherIncome2] = useState('')

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {}

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
          <TextField
            label='Milk Price'
            variant='outlined'
            value={milkPrice}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            label='Cull Cows($)'
            variant='outlined'
            value={cullCowsPrice}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            label='Heifers($)'
            variant='outlined'
            value={heifersPrice}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            label='Bull Calves($)'
            variant='outlined'
            value={bullCalvesPrice}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            label='Beef Cross($)'
            variant='outlined'
            value={beefCrossPrice}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            label='Other Income - Gov,Payments,livestock,etc ($)'
            variant='outlined'
            value={otherIncome1}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            label='Other Income - misc, crop or livestock sales, etc($)'
            variant='outlined'
            value={otherIncome2}
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

export default ReceiptsAtExpectedOutputLevels

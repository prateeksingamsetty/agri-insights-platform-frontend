import { Typography } from '@mui/material'
import FeedRequirements from './FeedRequirements/FeedRequirements'


const FeedModel = () => {
  return (
    <div>
      <Typography
        className='text-center'
        variant='h3'
        sx={{ color: '#c8102e', fontWeight: 'bold' }}
      >
        Dairy Feed Model
      </Typography>
      <FeedRequirements />
      
    </div>
  )
}

export default FeedModel

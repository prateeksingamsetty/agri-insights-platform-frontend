import { Typography } from '@mui/material'
import FeedRequirements from './FeedRequirements/FeedRequirements'
import RaisedForage from './RaisedForage/RaisedForage'

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
      <RaisedForage />
    </div>
  )
}

export default FeedModel

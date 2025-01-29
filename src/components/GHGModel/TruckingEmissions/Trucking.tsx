'use client';

import { Container, TextField, Typography, Button, Box } from '@mui/material';
import TruckingEmissionsDialog from './TruckingEmissionsDialog';
import { useState } from 'react';

// Define the expected structure for trucking emissions data
interface TruckingEmissionsData {
  totalTruckingEmissions?: number | null;
  ghgTruckingFootprint?: number | null;
}

interface TruckingEmissionsProps {
  data: TruckingEmissionsData;
}

const TruckingEmissions: React.FC<TruckingEmissionsProps> = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#c8102e' }}>
          Trucking Emissions
        </Typography>

        <TextField
          label="Total Trucking Emissions (lbs CO2)"
          variant="outlined"
          value={data.totalTruckingEmissions ?? 0}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="GHG Trucking Footprint (lbs CO2/lbs FPCM)"
          variant="outlined"
          value={data.ghgTruckingFootprint ?? 0}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        <Button
          variant="contained"
          sx={{ bgcolor: '#c8102e', '&:hover': { bgcolor: '#a50f2e' }, mt: 2 }}
          onClick={() => setOpenDialog(true)}
        >
          View Detailed Trucking Emissions
        </Button>

        <TruckingEmissionsDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
      </Box>
    </Container>
  );
};

export default TruckingEmissions;

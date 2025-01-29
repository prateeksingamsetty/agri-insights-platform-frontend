import { Container, TextField, Typography, Button, Box } from '@mui/material';
import FeedAndEntericEmissionsDialog from './FeedAndEntericEmissionsDialog';
import { useState } from 'react';

// Define the expected structure for the data prop
interface FeedAndEntericData {
  feedFootprintCO2?: number | null;
  feedFootprintPerFPCM?: number | null;
  entericFootprintCO2?: number | null;
  entericFootprintPerFPCM?: number | null;
}

interface FeedAndEntericProps {
  data: FeedAndEntericData;
}

const FeedAndEnteric: React.FC<FeedAndEntericProps> = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#c8102e' }}>
          Feed and Enteric Emissions
        </Typography>

        <TextField
          label="Feed FootPrint lbs of CO2"
          variant="outlined"
          value={data.feedFootprintCO2 ?? 0}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Feed Footprint lbs CO2/lbs FPCM"
          variant="outlined"
          value={data.feedFootprintPerFPCM ?? 0}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Enteric Footprint lbs of CO2"
          variant="outlined"
          value={data.entericFootprintCO2 ?? 0}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Enteric Footprint lbs CO2/lbs FPCM"
          variant="outlined"
          value={data.entericFootprintPerFPCM ?? 0}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        <Button variant="contained" sx={{ bgcolor: '#c8102e', '&:hover': { bgcolor: '#a50f2e' }, mt: 2 }} onClick={() => setOpenDialog(true)}>
          Feed and Enteric Emissions Details
        </Button>

        <FeedAndEntericEmissionsDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
      </Box>
    </Container>
  );
};

export default FeedAndEnteric;

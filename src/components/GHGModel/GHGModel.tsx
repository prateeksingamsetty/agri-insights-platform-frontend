'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InputDialog from './InputDialog';
import FeedAndEnteric from './FeedAndEntericEmissions/FeedAndEnteric';
import Trucking from './TruckingEmissions/Trucking';
import { useAuth } from 'src/context/AuthContext';
import EnergyFootprint from './EnergyFootprint/EnergyFootprint';
import ManureManagement from './ManureManagement/ManureManagement';

const GHG = () => {
  const { email, loggedIn } = useAuth();
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [openInputDialog, setOpenInputDialog] = useState(false);

  // State to hold only the required numeric values
  const [emissionData, setEmissionData] = useState({
    ghgFeedTotal: 0,
    ghgFeedTotalPerFPCM: 0,
    totalEntericEmissions: 0,
    totalEntericEmissionsPerFPCM: 0,
    ghgTruckingFootprint: 0,
    totalTruckingEmissions: 0
  });

  useEffect(() => {
    if (loggedIn && email) {
      fetchEmissionData();
    }
  }, [loggedIn, email]);

  const fetchEmissionData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ghg-emissions/outputDetails/${email}`);
      if (response.data) {
        setEmissionData({
          ghgFeedTotal: response.data.ghgFeedTotal || 0,
          ghgFeedTotalPerFPCM: response.data.ghgFeedTotalPerFPCM || 0,
          totalEntericEmissions: response.data.totalEntericEmissions || 0,
          totalEntericEmissionsPerFPCM: response.data.totalEntericEmissionsPerFPCM || 0,
          ghgTruckingFootprint: response.data.ghgTruckingFootprint || 0,
          totalTruckingEmissions: response.data.totalTruckingEmissions || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching emissions data:", error);
    }
  };

  const handleSubmitInputs = async (userInputs: any) => {
    try {
      const transformedInputs = {
        proteinPercentage: userInputs.proteinPercentage,
        fatPercentage: userInputs.fatPercentage,
        averageUSTruckingEmissions: 0.3567
      };

      let response;
      if (loggedIn && email) {
        console.log("Entered this");
        response = await axios.patch(`${BASE_URL}/ghg-emissions/updateInput/${email}`, transformedInputs);
      } else {
        response = await axios.post(`${BASE_URL}/ghg-emissions/calculateEmissions`, transformedInputs);
        localStorage.setItem('ghgInputs', JSON.stringify(userInputs));
      }
      console.log("response after i/p sub ", response.data);

      if (response.data) {
        setEmissionData({
          ghgFeedTotal: response.data.ghgFeedTotal || 0,
          ghgFeedTotalPerFPCM: response.data.ghgFeedTotalPerFPCM || 0,
          totalEntericEmissions: response.data.totalEntericEmissions || 0,
          totalEntericEmissionsPerFPCM: response.data.totalEntericEmissionsPerFPCM || 0,
          ghgTruckingFootprint: response.data.ghgTruckingFootprint || 0,
          totalTruckingEmissions: response.data.totalTruckingEmissions || 0,
        });
      }
    } catch (error) {
      console.error("Error updating emissions:", error);
    }
  };

  return (
    <div>
      <Typography className="mt-5 text-center" variant="h4" sx={{ color: '#c8102e', fontWeight: 'bold' }}>
        Dairy GHG Model
      </Typography>
      <Container maxWidth="md" className="mb-10 mt-10">
        <Box className="space-y-6" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <Button
            variant="contained"
            sx={{ bgcolor: '#c8102e', '&:hover': { bgcolor: '#a50f2e' }, mt: 2, py: 1.5 }}
            onClick={() => setOpenInputDialog(true)}
          >
            Input Fat and Protein Percentage
          </Button>

          {/* Emission Components - Passing only numeric data */}
          <FeedAndEnteric data={{
            ghgFeedTotal: emissionData.ghgFeedTotal,
            ghgFeedTotalPerFPCM: emissionData.ghgFeedTotalPerFPCM,
            totalEntericEmissions: emissionData.totalEntericEmissions,
            totalEntericEmissionsPerFPCM: emissionData.totalEntericEmissionsPerFPCM
          }} />

          <EnergyFootprint/>

          <Trucking data={{
            ghgTruckingFootprint: emissionData.ghgTruckingFootprint,
            totalTruckingEmissions: emissionData.totalTruckingEmissions
          }} />

          <ManureManagement/>

        </Box>
      </Container>

      {/* Input Dialog */}
      <InputDialog open={openInputDialog} handleClose={() => setOpenInputDialog(false)} handleSubmit={handleSubmitInputs} />
    </div>
  );
};

export default GHG;
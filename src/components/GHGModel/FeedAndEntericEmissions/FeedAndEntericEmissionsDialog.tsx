import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useAuth } from "src/context/AuthContext";

interface FeedAndEntericEmissionsProps {
  open: boolean;
  handleClose: () => void;
}

interface EmissionDetails {
  herdTotal: Record<string, number | null>;
  feedGHGEmissions: Record<string, number | null>;
  entericEmissions: Record<string, number | null>;
}

const FeedAndEntericEmissionsDialog: React.FC<FeedAndEntericEmissionsProps> = ({ open, handleClose }) => {
  const { email, loggedIn } = useAuth();
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [details, setDetails] = useState<EmissionDetails>({
    herdTotal: {},
    feedGHGEmissions: {},
    entericEmissions: {},
  });

  useEffect(() => {
    if (open && loggedIn && email) {
      fetchEmissionDetails();
    }
  }, [open, loggedIn, email]);

  const fetchEmissionDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ghg-emissions/outputDetails/${email}`);
      if (response.data) {
        setDetails({
          herdTotal: filterValidData(response.data.herdTotalDMI),
          feedGHGEmissions: filterValidData(response.data.feedGHGEmissions),
          entericEmissions: filterValidData(response.data.entericEmissions),
        });
      }
    } catch (error) {
      console.error("Error fetching emissions data:", error);
    }
  };

  // Filter out unnecessary fields (e.g., `_id`) and ensure valid numeric values
  const filterValidData = (data: Record<string, any>) => {
    return Object.fromEntries(
      Object.entries(data || {}).filter(([key]) => key !== "_id")
    );
  };

  const renderCategory = (title: string, data: Record<string, number | null>) => {
    return (
      <>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#c8102e", mt: 2 }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(data).map(([key, value]) => (
            <Grid item xs={6} key={key}>
              <TextField
                label={key.replace(/DMI/g, " DMI")}
                value={value !== null ? value.toLocaleString() + " lbs" : "Not Available"}
                fullWidth
                InputProps={{ readOnly: true }}
                variant="filled"
                sx={{ bgcolor: "#f5f5f5", borderRadius: "5px" }} // Gray background for read-only fields
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: "#c8102e", color: "white" }}>Feed and Enteric Emissions Details</DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        {renderCategory("Herd Total", details.herdTotal)}
        {renderCategory("Feed GHG Emissions", details.feedGHGEmissions)}
        {renderCategory("Enteric Emissions", details.entericEmissions)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#c8102e", fontWeight: "bold" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedAndEntericEmissionsDialog;
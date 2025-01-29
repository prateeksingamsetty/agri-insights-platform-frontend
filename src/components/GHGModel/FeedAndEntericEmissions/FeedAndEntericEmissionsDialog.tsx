import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from "@mui/material";
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
      const response = await axios.get(`${BASE_URL}/feed-enteric-emissions/outputDetails/${email}`);
      if (response.data) {
        setDetails({
          herdTotal: response.data.herdTotal || {},
          feedGHGEmissions: response.data.feedGHGEmissions || {},
          entericEmissions: response.data.entericEmissions || {},
        });
      }
    } catch (error) {
      console.error("Error fetching emissions data:", error);
    }
  };

  const renderCategory = (title: string, data: Record<string, number | null>) => {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#c8102e", mb: 1 }}>
          {title}
        </Typography>
        {Object.keys(data).length > 0 ? (
          Object.entries(data).map(([key, value]) => (
            <Typography key={key} variant="body1" sx={{ mb: 0.5 }}>
              <strong>{key}:</strong> {value !== null ? value.toLocaleString() + " lbs" : "Not Available"}
            </Typography>
          ))
        ) : (
          <Typography variant="body1" sx={{ fontStyle: "italic", color: "gray", mb: 1 }}>
            {title} data is not yet available.
          </Typography>
        )}
      </Box>
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
        <Button onClick={handleClose} sx={{ color: "#c8102e" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedAndEntericEmissionsDialog;

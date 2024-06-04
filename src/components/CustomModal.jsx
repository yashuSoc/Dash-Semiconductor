import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

const CustomModal = ({ open, handleClose, customer }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: 16, // Set the border radius for curved edges
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div">
          Customer Information
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Name:</strong> {customer.user_name}
          </Typography>
          <Typography variant="body1">
            <strong>Location:</strong> {customer.location}
          </Typography>
          <Typography variant="body1">
            <strong>Customer Clients:</strong> {customer.project_client}
          </Typography>
          <Typography variant="body1">
            <strong>Customer Projects:</strong> {customer.project_name}
          </Typography>
          {/* Add more fields as needed */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;

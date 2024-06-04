import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";

const CustomAlert = ({ open, onClose, severity = 'info', message }) => {
  const theme = useTheme();

  // Validate severity
  const validSeverities = ['success', 'info', 'warning', 'error'];
  const isValidSeverity = validSeverities.includes(severity);
  const severityColor = isValidSeverity ? theme.palette[severity].main : theme.palette.info.main;
  const contrastTextColor = isValidSeverity ? theme.palette.getContrastText(theme.palette[severity].main) : theme.palette.getContrastText(theme.palette.info.main);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={(props) => (
        <Slide {...props} direction="down" />
      )}
    >
      <MuiAlert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          backgroundColor: severityColor,
          color: contrastTextColor,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
          "& .MuiAlert-icon": {
            fontSize: theme.typography.fontSize * 1.5,
          },
          "& .MuiAlert-message": {
            fontSize: theme.typography.fontSize,
            fontWeight: theme.typography.fontWeightMedium,
          },
        }}
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;

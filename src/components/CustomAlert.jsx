import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";

const CustomAlert = ({ open, onClose, severity, message }) => {
  const theme = useTheme();
  
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
          backgroundColor: theme.palette[severity].main,
          color: theme.palette.getContrastText(theme.palette[severity].main),
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

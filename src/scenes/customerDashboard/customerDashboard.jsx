import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert";

const Customerprofile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [customers, setCustomers] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailedData, setDetailedData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const session_id = sessionStorage.getItem('session_id');
        const userId = sessionStorage.getItem('user_id'); 
        const response = await axios.get("http://localhost:3000/customerProfile",  { 
          headers: {
          'Authorization': session_id // Assuming session_id is your authorization token
          },
          params: { // Use params to send query parameters
            user_id: userId,
          }
        });
       
        const dataWithIds = response.data.map((row, index) => ({
          id: index + 1, // Assuming index starts from 0, you can adjust this if necessary
          ...row
        }));
        setCustomers(dataWithIds);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 401) {
          // If response status is 401 (Unauthorized), redirect to sign-in page
          setNotificationSeverity("error");
          setNotificationMessage("Session Expired, Kindly signin Again");
          navigate("/signin");
        }
        // Handle the error gracefully, e.g., show an error message to the user
      }
      // setNotificationOpen(true);
    };

    fetchData();
  }, [navigate]);  
  const fetchDetailedData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/details/${userId}`);
      setDetailedData(response.data);
    } catch (error) {
      console.error("Error fetching detailed data:", error);
    }
  };
  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };
  const handleRowClick = (params) => {
    fetchDetailedData(params.row.user_id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDetailedData(null);
  };
  const columns = [
    // { field: "customerid", headerName: "Customer ID" }, // Update field name to match data
    { field: "user_name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "location", headerName: "Location", flex: 1, cellClassName: "name-column--cell" },
    { field: "project_client", headerName: "Customer Clients", type: "number", headerAlign: "left", align: "left", flex:1,cellClassName: "name-column--cell"  },
    { field: "project_name", headerName: "Customer Projects", type: "string", headerAlign: "left", align: "left", flex:1, cellClassName: "name-column--cell"  }, // Update field name to match data
  ];
  

  return (
    <Box m="20px">
      <Header title="Customer Profile" subtitle="Customer Details" />
      <Box
        m="40px 0 0 0"
        height="35vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row.id} 
          autoHeight
          onRowClick={handleRowClick}
          components={{ Toolbar: GridToolbar }}
        />
        <CustomAlert
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationSeverity}
        message={notificationMessage}
      />
      </Box>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.primary[600],
            color: colors.grey[100],
            width: "500px",
            padding: "20px",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            borderRadius: "15px",
            fontSize:"20px",
            fontWeight: "Bold"
          }}
        >
          Profile Details
        </DialogTitle>
        <DialogContent>
          {detailedData ? (
            <>
              <Typography variant="h5" component="div" marginTop="12px" >
                <strong>Name:</strong> {detailedData.name}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginTop: "12px" }}
              >
                <strong>Client Name:</strong> {detailedData.location}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginTop: "12px" }}
              >
                <strong>Client Detail</strong> {detailedData.phnno}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginTop: "12px" }}
              >
                <strong>Project Details</strong> {detailedData.email}
              </Typography>
            
            </>
          ) : (
            <div>Loading...</div>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Customerprofile;

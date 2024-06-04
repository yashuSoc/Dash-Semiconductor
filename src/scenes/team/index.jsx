import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";


const CustomerAdminProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailedData, setDetailedData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/adminCustomerProfile");
      // Generate unique IDs for each row
      console.log(response.data)
      const dataWithIds = response.data.map((row) => ({
        id: row.user_id, // Use `user_id` as the `id` property for each row
        ...row
      }));
      console.log("Data with IDs:", dataWithIds);
      setData(dataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error gracefully, e.g., show an error message to the user
    }
  };
  const fetchDetailedData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/details/${userId}`);
      setDetailedData(response.data);
    } catch (error) {
      console.error("Error fetching detailed data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleRowClick = (params) => {
    fetchDetailedData(params.row.user_id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDetailedData(null);
  };
  const columns = [
    { field: "user_id", headerName: "Customer ID" },
    {
      field: "user_name",
      headerName: "Company Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "no_of_employees",
      headerName: "No. of Employee",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "left",
      type: "text",
      flex:1.5,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "project_client",
      headerName: "Customer Clients",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "project_name",
      headerName: "Customer Projects",
      type: "string",
      headerAlign: "left",
      align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <Box m="20px">
      <Header title="Customer" subtitle="Managing the Customers" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={handleRowClick}
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
                <strong>CLient Detail</strong> {detailedData.phnno}
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

export default CustomerAdminProfile;

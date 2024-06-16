import React, { useState, useEffect } from "react";
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
import axios from "axios";
import Header from "../../components/Header";

const Customerrejected = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailedData, setDetailedData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/adminRejected");
      const dataWithIds = response.data.map((row, index) => ({
        id: index + 1, // Assuming index starts from 0, you can adjust this if necessary
        ...row,
      }));
      setData(dataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    { field: "user_id", headerName: "ID" },
    {
      field: "name",
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
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "left",
      align: "left",
      type: "string",
      flex: 1.5,
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
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
                <strong>Location:</strong> {detailedData.location}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginTop: "12px" }}
              >
                <strong>Phone No.:</strong> {detailedData.phnno}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginTop: "12px" }}
              >
                <strong>Email: </strong> {detailedData.email}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginTop: "12px" }}
              >
                <strong>No. Of Employees: </strong> {detailedData.no_of_employees}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginTop: "12px" }}
              >
                <strong>Projects Delivered: </strong> {detailedData.projects_delivered}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginTop: "12px" }}
              >
                <strong>About:</strong> {detailedData.about_user}
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

export default Customerrejected;

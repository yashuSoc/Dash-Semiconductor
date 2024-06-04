import { Box, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";

const IcAdminProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State to keep track of selected row
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const [selectedRowData, setSelectedRowData] = useState(null); // State to store selected row's data
  const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    about: ""
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/adminDesignProfile"
      );
      // Generate unique IDs for each row
      console.log(response.data);
      const dataWithIds = response.data.map((row) => ({
        id: row.user_id, // Use `user_id` as the `id` property for each row
        ...row,
      }));
      console.log("Data with IDs:", dataWithIds);
      setData(dataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error gracefully, e.g., show an error message to the user
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleRowClick = (params) => {
    setSelectedRow(params.row.id); // Set selectedRow state to the clicked row's id
    setSelectedRowData(params.row); // Store clicked row's data
    setIsDialogOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleUpdateProfile = () => {
    // Implement profile update logic here
    // You can use selectedRowData and updatedProfile states to update the profile
    // After updating, close the dialog
    setIsDialogOpen(false);
  };
  const columns = [
    { field: "user_id", headerName: "ID", flex: 0.5 },
    {
      field: "user_name",
      headerName: "Name",
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
      field: "existing_clients",
      headerName: "Clients",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "projects_delivered",
      headerName: "Projects",
      type: "number",  
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "no_of_employees_dv",
      headerName: "No. of DV ",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "no_of_employees_dft",
      headerName: "No. of DFT ",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "no_of_employees_pd",
      headerName: "No. of PD",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "left",
      type: "text",
      flex: 1.5,
    },
  ];

  return (
    <Box m="20px">
      <Header title="IC DESIGN PROVIDER FIRM PROFILE" subtitle="Here Are The Approved Profiles" />
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
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={handleRowClick} // Attach the onClick event handler to the DataGrid
          selectionModel={selectedRow ? [selectedRow] : []} // Highlight the selected row
        />
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={selectedRowData ? selectedRowData.name : ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={selectedRowData ? selectedRowData.location : ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone No."
            type="number"
            fullWidth
            value={selectedRowData ? selectedRowData.phone : ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={selectedRowData ? selectedRowData.email : ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="about"
            label="About"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={selectedRowData ? selectedRowData.about : ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProfile} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IcAdminProfile;

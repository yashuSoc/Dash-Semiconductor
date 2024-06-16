import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomerIc = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  

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
 
  const columns = [
    { field: "user_id", headerName: "ID", flex: 0.3, cellClassName: "name-column--cell", },
    
    {
      field: "no_of_employees",
      headerName: "No. of Employee",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "existing_clients",
      headerName: "Clients",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "projects_delivered",
      headerName: "Projects",
      type: "number",  
      headerAlign: "left",
      align: "left",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "no_of_employees_dv",
      headerName: "No. of DV ",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "no_of_employees_dft",
      headerName: "No. of DFT ",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "no_of_employees_pd",
      headerName: "No. of PD",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "left",
      type: "text",
      flex: 1.5,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <Box m="20px">
      <Header title="IC DESIGN PROVIDER FIRM" subtitle="Here Are The Approved Available Profiles" />
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
        />
      </Box>
    </Box>
  );
};

export default CustomerIc;

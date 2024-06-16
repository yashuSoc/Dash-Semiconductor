import { Box, useTheme } from "@mui/material";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

const Customerapproved = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/adminApproved");
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
  

  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { field: "user_id", headerName: "Customer ID" },
    {
      field: "name",
      headerName: "Company Name",
      type: "string",
      flex: 0.4,
      cellClassName: "name-column--cell",
    },
    {
      field: "no_of_employees",
      headerName: "No. of Employee",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.4,
    },
    {
        field: "projects_delivered",
        headerName: "Projects Delivered",
        type: "number",
        headerAlign: "left",
        align: "left",
        flex: 0.5,
    },
    {
        field: "existing_clients",
        headerName: "Existing Clients",
        type: "number",
        headerAlign: "left",
        align: "left",
        flex: 0.4,
    },
    {
      field: "location",
      headerName:"Location",
      headerAlign: "left",
      align: "left",
      type:"text",
      flex:1.5,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Customer" subtitle="Managing the Customers"/> 
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
        <DataGrid checkboxSelection rows={data} columns={columns} components={{ Toolbar: GridToolbar }}/>
      </Box>
    </Box>
  );
};

export default Customerapproved;

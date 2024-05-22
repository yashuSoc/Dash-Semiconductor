import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

const EngineerRejected = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/EngineerRejectedProfile"
      );
      // Generate unique IDs for each row

      const dataWithIds = response.data.map((row) => ({
        id: row.engineerid, // Use `user_id` as the `id` property for each row
        ...row,
      }));
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
    { field: "engineerid", headerName: "Engineer ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 0.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "specialization",
      headerName: "Specialization",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Preferred Location",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "expin_in_years",
      headerName: "Total Exp.(in years)",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "open_to_work",
      headerName: "Open to Work",
      cellClassName: "name-column--cell",
      flex: 1,
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
        />
      </Box>
    </Box>
  );
};

export default EngineerRejected;

import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const Engprofile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const columns = [
    { field: "engineerid", headerName: "ID" },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "prefferedlocation",
      headerName: "Preferred Location",
      flex: 1,
      cellClassName: "name-column--cell",
    
    },
    {
      field: "expinyears",
      headerName: "Total Exp.(in years)",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "opentowork",
      headerName: "Open to Work",
      cellClassName: "name-column--cell",
      flex: 1,
    },
  ];
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/engineer");
      // Assuming the response data is an array of objects
      // Assign unique IDs to each row for DataGrid
      const formattedData = response.data.map((row, index) => ({ ...row, id: index + 1 }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Engineers" subtitle="List of Engineers" />
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
        <DataGrid checkboxSelection rows={data} columns={columns} getRowId={(row) => row.id} />
      </Box>
    </Box>
  );
};

export default Engprofile;

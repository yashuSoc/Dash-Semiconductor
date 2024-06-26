import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const Domainprofile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const session_id = sessionStorage.getItem('session_id');
      const userId = sessionStorage.getItem('user_id'); 
      const response = await axios.get("http://localhost:3000/domainProfile", { 
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
    { field: "id", headerName: "ID" },
    {
      field: "headin",
      headerName: "Head",
      type: "text",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "no_of_tapeouts_handled",
        headerName: "No. of Tapeouts Handled",
        type: "number",
        headerAlign: "left",
        align: "left",
        flex: 1,
        cellClassName: "name-column--cell",
      },
    
    {
      field: "expin_in_years",
      headerName: "Years of Exp.",
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
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "existing_clients",
      headerName: "Clients Served",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },

  ];

  return (
    <Box m="20px">
      <Header title="DOMAIN LEADER PROFILE" subtitle="Managing The Domain Leaders Profile" />
      {/* <Customerbar/> */}
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
        <DataGrid checkboxSelection rows={data} columns={columns} getRowId={(row) => row.id} autoHeight/>
      </Box>
    </Box>
  );
};

export default Domainprofile;

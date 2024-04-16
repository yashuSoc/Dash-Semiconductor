import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const Customerclients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  // Define columns for the DataGrid
  const columns = [
    { field: "clientid", headerName: "Client ID" , cellClassName: "name-column--cell"  },
    { field: "clientname", headerName: "Client Name", flex: 1 , cellClassName: "name-column--cell" },
    { field: "clientdetails", headerName: "Client Details", flex: 1 , cellClassName: "name-column--cell" },
  ];

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customerClients");
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
      {/* Header component */}
      <Header title="CUSTOMER CLIENTS" subtitle="Data of Customer's Clients" />
      <Box m="40px 0 0 0" height="75vh" sx={{
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
        }}>
        <DataGrid
          rows={data} // Pass data to the DataGrid
          columns={columns} // Pass columns to the DataGrid
          checkboxSelection
          getRowId={(row) => row.id} // Provide a function to get unique row IDs
        />
      </Box>
    </Box>
  );
};

export default Customerclients;

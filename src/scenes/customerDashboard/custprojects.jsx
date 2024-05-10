import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const CustomerReq = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  // Define columns for the DataGrid
  const columns = [
    { field: "no_of_ic", headerName: "IC Designer" ,flex: 1, cellClassName: "name-column--cell" },
    { field: "no_of_dl", headerName: "Domain Leader", flex: 1, cellClassName: "name-column--cell"  },
    { field: "no_of_eng", headerName: "Engineers", flex: 1 , cellClassName: "name-column--cell"  },
    { field: "file", headerName: "File", flex: 1 , cellClassName: "name-column--cell"  },
  ];

  // Fetch data from the API when the component mounts
  

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const user_id = sessionStorage.getItem('user_id');
      const response = await axios.get(`http://localhost:3000/customerReq?user_id=${user_id}`);
      const userRequestData = response.data.userRequestData; // Access userRequestData array from the response
      
      // Assign unique IDs to each row for DataGrid
      const formattedData = userRequestData.map((row, index) => ({ ...row, id: index + 1 }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Box m="20px">
      {/* Header component */}
      <Header title="Requests" subtitle="Your Requests" />
      <Box m="40px 0 0 0" height="35vh" sx={{
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
        {/* DataGrid component */}
        <DataGrid
          rows={data} // Pass data to the DataGrid
          columns={columns} // Pass columns to the DataGrid
          getRowId={(row) => row.id} // Provide a function to get unique row IDs
        />
      </Box>
    </Box>
  );
};

export default CustomerReq;

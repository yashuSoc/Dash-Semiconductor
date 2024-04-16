import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const Customerprofile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [customers, setCustomers] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customer");
      const dataWithIds = response.data.map((row, index) => ({
        id: index + 1, // Assuming index starts from 0, you can adjust this if necessary
        ...row
      }));
      console.log(dataWithIds);
      setCustomers(dataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error gracefully, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "customerid", headerName: "Customer ID" }, // Update field name to match data
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "location", headerName: "Location", flex: 2, cellClassName: "name-column--cell" },
    { field: "noofemployees", headerName: "No. of Employees", type: "number", headerAlign: "left", align: "left", flex:1,cellClassName: "name-column--cell"  },
    { field: "cvid", headerName: "CV ID", type: "number", headerAlign: "left", align: "left", flex:1, cellClassName: "name-column--cell"  }, // Update field name to match data
  ];
  

  return (
    <Box m="20px">
      <Header title="Customers" subtitle="Managing the Customers" />
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
          rows={customers}
          columns={columns}
          getRowId={(row) => row.id} // Specify the unique identifier for each row
        />
      </Box>
    </Box>
  );
};

export default Customerprofile;

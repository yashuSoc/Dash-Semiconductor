import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";

const Customerprofile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      type: "text",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "location",
      headerName:"Location",
      headerAlign: "left",
      type:"text",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Employees",
      headerName: "No. of Employee",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    
    {
      field: "Projects",
      headerName: "Projects Delivered",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "clients",
      headerName: "Existing Clients",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },

  ];

  return (
    <Box m="20px">
      <Header title="Customers" subtitle="Managing the Customers" />
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Customerprofile;

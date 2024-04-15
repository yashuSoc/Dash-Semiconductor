import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";

const Domainprojects = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "pid", headerName: "Project ID" },
    {
      field: "name",
      headerName: "Project Name",
      type: "text",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "projects",
      headerName: "Project Details",
      type: "text",
      headerAlign: "left",
      align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },

  ];

  return (
    <Box m="20px">
      <Header title="DOMAIN LEADER PROJECTS" subtitle="Data of Domain Leader's Projects" />
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

export default Domainprojects;

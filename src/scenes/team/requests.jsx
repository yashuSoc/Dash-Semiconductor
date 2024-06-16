import { Box, Button, useTheme , FormControl , Grid } from "@mui/material";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CustomAlert from "../../components/CustomAlert";
import DownloadIcon from '@mui/icons-material/Download';

const CustomerRequirements = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  

  const handleReject = async (id) => {
    try {
      await axios.post("http://localhost:3000/customerRequestRejected", { id });
      setData(data.map(row => {
        if (row.id === id) {
          return { ...row, accessStatus: "rejected" };
        }
        return row;
      }));
      setOpenAlert(true);
      setAlertSeverity("success");
      setAlertMessage("Customer Rejected Successfully!");
    } catch (error) {
      console.error("Error approving data:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post("http://localhost:3000/customerRequestApproved", { id });
      setData(data.map(row => {
        if (row.id === id) {
          return { ...row, accessStatus: "approved" };
        }
        return row;
      }));
      setOpenAlert(true);
      setAlertSeverity("success");
      setAlertMessage("Customer approved successfully!");
    } catch (error) {
      console.error("Error approving data:", error);
    }
  };

  const downloadFile = (fileId) => {
    const downloadUrl = `http://localhost:3000/download?fileId=${fileId}`;
    window.location.href = downloadUrl;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getCustomerRequirements");
      const userRequestData = response.data.userRequestData;
      const dataWithIds = userRequestData.map((row) => ({
        id: row.user_id,
        ...row
      }));
      console.log("Data with IDs:", dataWithIds);
      setData(dataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "user_id",
      headerName: "User ID",
      type: "number",
      flex: 0.8,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "user_name",
      headerName: "Company Name",
      type: "string",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "no_of_ic",
      headerName: "No. of IC Designer",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.8,
    },
    {
      field: "no_of_dl",
      headerName: "No. of Domain Leader",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.8,
    },
    {
      field: "no_of_eng",
      headerName: "No. of Engineers",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.8,
    },
    
{
  field: "file",
  headerName: "File",
  headerAlign: "left",
  align: "left",
  type: "file",
  flex: 0.8,
  renderCell: (params) => {
    const handleClick = () => {
      downloadFile(params.row.file_id);
    };
    return (
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "#1a73e8", // Change color as needed
        }}
        onClick={handleClick}
      >
        <DownloadIcon style={{ marginRight: 4 }} />  {/* Add margin for spacing */}
        Download File
      </div>
    );
  }
},
    {
      field: "accessStatus",
      headerName: "Access Status",
      headerAlign: "center",
      flex: 1.5,
      renderCell: ({ row }) => (
        <FormControl fullWidth>
          <Grid container spacing={1} justifyContent="center" direction="row">
            <Grid item>
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<CheckIcon />}
                onClick={() => handleApprove(row.id , "approved")}
                sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "#388e3c" } }}
              >
                Approve
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<ClearIcon/>}
                onClick={() => handleReject(row.id, "rejected")}
                sx={{ backgroundColor: "#d50000", "&:hover": { backgroundColor: "#d32f2f" } }}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Approved Customer's Requirement" subtitle="Managing the Customers Request For Their Project Requirerment"/> 
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
        <CustomAlert open={openAlert} onClose={() => setOpenAlert(false)} severity={alertSeverity} message={alertMessage} />
        <DataGrid rows={data} columns={columns} components={{ Toolbar: GridToolbar }} getRowId={(row) => row.id}/>
      </Box>
    </Box>
  );
};

export default CustomerRequirements;

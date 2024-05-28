import { Box, Button, useTheme , FormControl , Grid} from "@mui/material";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CustomAlert from "../../components/CustomAlert";

const CustomerRequirements = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
const [alertSeverity, setAlertSeverity] = useState("success");
const [alertMessage, setAlertMessage] = useState("");
const downloadFile = (fileLocation) => {
    // Construct a URL to download the file
    const downloadUrl = `/download/${fileLocation}`; // Replace `/download` with your backend endpoint for file download
  
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileLocation; // Set the filename for download
    document.body.appendChild(link);
  
    // Trigger the click event on the link to start the download
    link.click();
  
    // Cleanup: remove the link element
    document.body.removeChild(link);
  };
  
  const handleReject = async (id) => {
    try {
        await axios.post("http://localhost:3000/customerRequestRejected", { id });
        // Update the status in the local state
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
      // Update the status in the local state
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
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getCustomerRequirements");
      // Extract user request data from the response
      const userRequestData = response.data.userRequestData;
      // Generate unique IDs for each row
      const dataWithIds = userRequestData.map((row) => ({
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
        type: "file", // Change type to "file" to indicate it's a file field
        flex: 0.8,
        renderCell: (params) => {
          const handleClick = () => {
            // Handle download when clicked
            downloadFile(params.row.location);
          };
      
          return (
            <div style={{ cursor: "pointer" }} onClick={handleClick}>
              {params.row.location}
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
        }}
        
      >
        <CustomAlert open={openAlert} onClose={() => setOpenAlert(false)} severity={alertSeverity} message={alertMessage} />
        <DataGrid  rows={data} columns={columns} components={{ Toolbar: GridToolbar }} getRowId={(row) => row.id}/>

      </Box>
    </Box>
  );
};

export default CustomerRequirements;

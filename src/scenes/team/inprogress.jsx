import { Box, Button, useTheme , FormControl , Grid} from "@mui/material";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CustomAlert from "../../components/CustomAlert";

const Customerprogress = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
const [alertSeverity, setAlertSeverity] = useState("success");
const [alertMessage, setAlertMessage] = useState("");
  const handleReject = async (id) => {
    try {
        await axios.post("http://localhost:3000/admincustomerRejected", { id });
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
      await axios.post("http://localhost:3000/admincustomerApproved", { id });
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
      const response = await axios.get("http://localhost:3000/admincustomerInprogress");
      // Generate unique IDs for each row
      console.log(response.data)
      const dataWithIds = response.data.map((row) => ({
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
      field: "name",
      headerName: "Company Name",
      type: "string",
      flex: 0.4,
      cellClassName: "name-column--cell",
    },
    {
      field: "no_of_employees",
      headerName: "No. of Employee",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.4,
    },
    {
        field: "projects_delivered",
        headerName: "Projects Delivered",
        type: "number",
        headerAlign: "left",
        align: "left",
        flex: 0.5,
    },
    {
        field: "existing_clients",
        headerName: "Existing Clients",
        type: "number",
        headerAlign: "left",
        align: "left",
        flex: 0.4,
    },
    {
      field: "location",
      headerName:"Location",
      headerAlign: "left",
      align: "left",
      type:"text",
      flex:1.5,
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
      <Header title="Customer" subtitle="Managing the Customers"/> 
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
        <DataGrid  rows={data} columns={columns} components={{ Toolbar: GridToolbar }} getRowId={(row) => row.id}/>

      </Box>
    </Box>
  );
};

export default Customerprogress;

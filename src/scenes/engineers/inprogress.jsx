import { Box, Button, useTheme , FormControl , Grid} from "@mui/material";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CustomAlert from "../../components/CustomAlert";

const Engineerprogress = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
const [alertSeverity, setAlertSeverity] = useState("success");
const [alertMessage, setAlertMessage] = useState("");
  const handleReject = async (id) => {
    try {
        await axios.post("http://localhost:3000/adminEngineerRejected", { id });
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
      await axios.post("http://localhost:3000/adminEngineerApproved", { id });
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
      const response = await axios.get("http://localhost:3000/adminEngineerInprogress");
      const dataWithIds = response.data.map((row, index) => ({
        id: row.engineerid || index, // Use a fallback index if user_id doesn't exist
        ...row
      }));
      setData(dataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { field: "engineerid", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "location",
      headerName: "Preferred Location",
      flex: 1,
      cellClassName: "name-column--cell",
    
    },
    {
      field: "expin_in_years",
      headerName: "Total Exp.(in years)",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "open_to_work",
      headerName: "Open to Work",
      cellClassName: "name-column--cell",
      flex: 1,
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
      <Header title="Engineer" subtitle="Managing the Engineers"/> 
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

export default Engineerprogress;

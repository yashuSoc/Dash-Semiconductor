import {
  Box,
  Button,
  Typography,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import React, { useState, useEffect } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import StatBox from "../../components/StatBox";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    email: "",
    createdatetime: "",
    role_id: "",
    user_id: "",
    about_user: "",
    phnno: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const fetchData = async () => {
    try {
      const user_id = sessionStorage.getItem("user_id");
      const response = await axios.get("http://localhost:3000/CustomerUser", {
        params: {
          userId: user_id,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = () => {
    setUpdatedProfile(profile);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/updateProfile`,
        updatedProfile
      );
      setProfile(response.data);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="User's Profile" subtitle="Manage Your Profile" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
            onClick={handleOpenDialog}
          >
            <UpdateIcon sx={{ mr: "5px" }} />
            Edit Profile
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="170px"
        gap="30px"
        pl="100px"
        pr="100px"
        pt="30px"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <img
                alt="profile-avatar"
                src="./AdminAvatar.png"
                width="120px"
                height="120px"
                style={{ borderRadius: "50%", marginRight: "20px" }}
              />
              <Box display="flex" ml="20px" flexDirection="column" p="20px">
                <Typography mb="20px" variant="h1" color={colors.grey[100]}>
                  {profile.name}
                </Typography>
                <Typography variant="h3" color={colors.grey[100]}>
                  {profile.location}
                </Typography>
                <Typography variant="h4" color={colors.grey[300]}>
                  Role: {profile.role_id === 1 ? "Admin" : profile.role_id}
                </Typography>
                <Typography variant="h4" color={colors.grey[300]}>
                  ID: {profile.user_id}
                </Typography>
                <Typography variant="body2" color={colors.grey[300]}>
                  Created At: {profile.createdatetime}
                </Typography>
                <Typography variant="h5" color={colors.grey[100]}>
                  {profile.email}
                </Typography>
                <Typography variant="h5" color={colors.grey[100]}>
                  {profile.phnno}
                </Typography>
                <Typography variant="h5" color={colors.grey[100]} mt="10px">
                  {profile.about_user}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox
            title="Analytics"
            subtitle="Analytics"
            progress="+14"
            increase="+14%"
            icon={
              <UpdateIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox
            title="Performance"
            subtitle="Performance"
            progress="+14"
            increase="+14%"
            icon={
              <UpdateIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
            }
          />
        </Box>
      </Box>

      {/* Profile Update Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={updatedProfile.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={updatedProfile.location}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phnno"
            label="Phone No."
            type="text"
            fullWidth
            value={updatedProfile.phnno}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={updatedProfile.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="about_user"
            label="About"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={updatedProfile.about_user}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProfile} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;

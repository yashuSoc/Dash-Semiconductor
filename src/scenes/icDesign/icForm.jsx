import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import CustomAlert from "../../components/CustomAlert"; 
import React, { useState } from "react";

const Icform = () => {
  const [submitted, setSubmitted] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    icname: "",
    icemployees: "",
    icprojects: "",
    icclients: "",
    iclocation: "",
    detailsofdv:"",
    no_of_dv:"",
    detailsofdft:"",
    no_of_dft:"",
    detailsofpd:"",
    no_of_pd:"",

  };

  const checkoutSchema = yup.object().shape({
    icname: yup.string().required("Required"),
    icemployees: yup.number().required("Required"),
    icprojects: yup.number().required("Required"),
    icclients: yup.number().required("Required"),
    iclocation: yup.string().required("Required"),
  });

    const handleFormSubmit = async (values) => {
    const { icname, iclocation, icemployees, icprojects, icclients,  no_of_dv, no_of_dft, no_of_pd,  detailsofdv,  detailsofpd, detailsofdft, user_id} = values;
    try {
      // Fetch user ID from session
      const user_id = sessionStorage.getItem('user_id');
      console.log(user_id);
      
      // Send request with user ID
      await axios.post(`http://localhost:3000/IcDesignInprogress`, {
        icname, iclocation, icemployees, icprojects, icclients, user_id: user_id// Include user ID in the request
      });

      setNotificationSeverity("success");
      setNotificationMessage("IC Designer Firm Created");
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving form data:', error);
      setNotificationSeverity("error");
      setNotificationMessage("Error saving form data");
    }
    setNotificationOpen(true);
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="Create User" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.icname}
                name="icname"
                error={!!touched.icname && !!errors.icname}
                helperText={touched.icname && errors.icname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Total Number Of Employees"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.icemployees}
                name="icemployees"
                error={!!touched.icemployees && !!errors.icemployees}
                helperText={touched.icemployees && errors.icemployees}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Projects Delivered"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.icprojects}
                name="icprojects"
                error={!!touched.icprojects && !!errors.icprojects}
                helperText={touched.icprojects && errors.icprojects}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Clients"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.icclients}
                name="icclients"
                error={!!touched.icclients && !!errors.icclients}
                helperText={touched.icclients && errors.icclients}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.iclocation}
                name="iclocation"
                error={!!touched.iclocation && !!errors.iclocation}
                helperText={touched.iclocation && errors.iclocation}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Details of DV(Design Verification)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.detailsofdv}
                name="detailsofdv"
                error={!!touched.detailsofdv && !!errors.detailsofdv}
                helperText={touched.detailsofdv && errors.detailsofdv}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Number of DV"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.no_of_dv}
                name="no_of_dv"
                error={!!touched.no_of_dv && !!errors.no_of_dv}
                helperText={touched.no_of_dv && errors.no_of_dv}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Details of DFT(Design For Test)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.detailsofdft}
                name="detailsofdft"
                error={!!touched.detailsofdft && !!errors.detailsofdft}
                helperText={touched.detailsofdft && errors.detailsofdft}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Number of DFT"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.no_of_dft}
                name="no_of_dft"
                error={!!touched.no_of_dft && !!errors.no_of_dft}
                helperText={touched.no_of_dft && errors.no_of_dft}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Details of PD(Physical Design)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.detailsofpd}
                name="detailsofpd"
                error={!!touched.detailsofpd && !!errors.detailsofpd}
                helperText={touched.detailsofpd && errors.detailsofpd}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Number of PD"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.no_of_pd}
                name="no_of_pd"
                error={!!touched.no_of_pd && !!errors.no_of_pd}
                helperText={touched.no_of_pd && errors.no_of_pd}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={submitted}>
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <CustomAlert
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </Box>
  );
};

export default Icform;

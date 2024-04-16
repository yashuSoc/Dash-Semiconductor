import React from "react";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CustomAlert from "../../components/CustomAlert"; 

const CustomerForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    companyName: "",
    cemployees: "",
    cprojects: "",
    cclients: "",
    clocation: "",
  };

  const checkoutSchema = yup.object().shape({
    companyName: yup.string().required("Required"),
    cemployees: yup.number().required("Required"),
    cprojects: yup.number().required("Required"),
    cclients: yup.number().required("Required"),
    clocation: yup.string().required("Required"),
  });

  const handleFormSubmit = async (values) => {
    const { companyName, clocation, cemployees, cprojects, cclients } = values;
    try {
      await axios.post(`http://localhost:3000/customersInprogress`, {
        companyName,
        location: clocation,
        numberOfEmployees: cemployees,
        projectsDelivered: cprojects,
        existingClients: cclients
      });
      setNotificationSeverity("success");
      setNotificationMessage("Customer Created");
      setSubmitted(true);
    } catch (error) {
      console.error('Error accepting request:', error);
      setNotificationSeverity("error");
      setNotificationMessage("Error accepting request");
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
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
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
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
                required
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Total Number Of Employees"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cemployees}
                name="cemployees"
                error={!!touched.cemployees && !!errors.cemployees}
                helperText={touched.cemployees && errors.cemployees}
                sx={{ gridColumn: "span 2" }}
                required
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Projects Delivered"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cprojects}
                name="cprojects"
                error={!!touched.cprojects && !!errors.cprojects}
                helperText={touched.cprojects && errors.cprojects}
                sx={{ gridColumn: "span 2" }}
                required
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Existing Clients"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cclients}
                name="cclients"
                error={!!touched.cclients && !!errors.cclients}
                helperText={touched.cclients && errors.cclients}
                sx={{ gridColumn: "span 2" }}
                required
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clocation}
                name="clocation"
                error={!!touched.clocation && !!errors.clocation}
                helperText={touched.clocation && errors.clocation}
                sx={{ gridColumn: "span 4" }}
                required
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={submitted}>
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* Custom alert component */}
      <CustomAlert
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </Box>
  );
};

export default CustomerForm;
